
from fastapi import APIRouter, Depends,  HTTPException, Body, status, Response
import fastapi
from pydantic import BaseModel
from models.user import User
from utils.hasher import Hasher
from jose import JWTError, jwt
from fastapi_login import LoginManager
import os
from fastapi.security import OAuth2PasswordBearer
from db import config

SECRET = 'G@LATIKA!MAT' 
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
responses_custom = {
        422: {
            "content": {
                "application/json": {
                    "example": {"status": 422, "message": "Lỗi xác nhận"}
                }
            },
        },
        200: {
            "content": {
                "application/json": {
                    "example": {"status": 200, "message": "phương thức thành công"}
                }
            },
        },
    }
    

class TokenData(BaseModel):
    email: str | None = None

@router.post("/v1/user", tags=["User"], description="Tạo người dùng mới", responses= responses_custom)
def create_user(new_user: User,response: fastapi.Response):
    user_exist = load_user(new_user.email)
    if len(new_user.password) < 8:
        return {'error': 'Mật khẩu không được ít hơn 8 ký tự'}

    if new_user.password.islower():
        return {'error': 'Mật khẩu phải được viết hoa'}

    if new_user.password.isalpha():
        return {'error': 'Mật khẩu cần có số'}
    
    if new_user.password.isalnum():
        return {'error': 'Mật khẩu cần một ký tự đặc biệt'}

    if user_exist:
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'status': 422, 'error': 'Email này đã được sử dụng'}

    elif new_user.email == "":
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'status': 422, 'error': 'Email không hợp lệ'}

    else:
        new_user.insert_user(new_user.username,new_user.password,new_user.email,new_user.admin,new_user.avatar)
        return new_user

@router.get("/v1/users", tags=["User"], description= "Đọc tất cả người dùng",
     responses={
        200: {
            "description": "Người dùng yêu cầu",
            "content": {
                "application/json": {
                    "example": { "user_id": "42e8db92-e792-46fd-8344-b3cc4e49a49d",
                                "username": os.getenv("username"),
                                "password": os.getenv("password", "p@ssword!"),
                                "email": "example@gmail.com",
                                "admin": "true",
                                "avatar": "https://i.upanh.org/2022/12/27/phong.jpg"
                                }
                }
            },
        },
    },)
def get_all_users():
    user = User()
    return user.read_user()

@router.put("/v1/user", tags=["User"], description= "Cập nhật người dùng qua email", responses=responses_custom)
def put_user(new_user: User, response: fastapi.Response):
    user_exist = load_user(new_user.email)
    if user_exist:
        new_user.put_user(new_user.username, new_user.password, new_user.admin, new_user.avatar, new_user.email)
        return {"status": 200, "message": "cập nhật thành công"}
    else:
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"status": 422, "message": "lỗi xác thực"}

@router.delete("/v1/user/{email}", tags=["User"], description= "Xóa người dùng qua email", responses= responses_custom)
def delete_user(email: str, response: fastapi.Response):
    user_exist = load_user(email)
    if user_exist:
        user = User()
        user.delete_user(email)
        return {"status": 200, "message": "xóa người dùng thành công"}
    else:
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"status": 422, "message": "lỗi khi xóa"}

@router.get("/v1/user/{email}", tags=["User"], description="Đọc người dùng qua mail", responses= responses_custom)
def get_user_by_email(email: str, response: fastapi.Response):
    user_exist = load_user(email)
    if user_exist:
        user = User()
        return user.find_by_id_user(email)[0]
    else:
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"status": 422, "message": "lỗi xác thực khi nhận"}

manager = LoginManager(SECRET, token_url='/auth/token')

def load_user(email: str):
    user = User()
    return user.find_by_id_user(email)

@router.post('/v1/login/', tags=["Login"], description = "Mã xác thực", responses=responses_custom)
def login(user: User = Body(
        default={
            "email": "test@test.com",
            "password": os.getenv("password","p@ssword!" )
        }
    )):
    email = user.email
    password = user.password
    set_user = User.find_password(email)
    admin = User.find_admin(email)
    user = load_user(email)
    ERROR = HTTPException(status_code=404, detail= "Tên người dùng hoặc mật khẩu không hợp lệ!")

    if not user:
        raise ERROR

    elif Hasher.verify_password(password,set_user[0][0]) == False:
        raise ERROR

    access_token = manager.create_access_token(
        data=dict(sub=email)
    )

    return {'access_token': access_token, 'token_type': 'bearer', 'admin': admin}

@router.get('/v1/user', tags=["Login"], description="Người dùng hiện tại", responses=responses_custom)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin đăng nhập",
        headers={"Authorization": "Bearer"},
    )
    
    try: 
        payload = jwt.decode(token, SECRET)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError: 
        raise credentials_exception
    user = User.get_current_user(email)
    if user is None:
        raise credentials_exception
    return user #Return username, email, admin and avatar

@router.patch('/v1/avatar/', tags=["User"], description="Đổi hình đại diện mới", responses=responses_custom)
def patch_avatar(response: fastapi.Response, user: User = Body(
    default={
            "email": "test@gmail.com",
            "avatar": "https://i.upanh.org/2022/12/27/phong.jpg",
        }
    )):
    user_exist = load_user(user.email)
    if user_exist:
        user.patch_new_avatar(user.email,user.avatar)
        return {"status": 200, "message": "Cập nhật avatar thành công!"}
    else:
        response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"status": 422, "message": "Lỗi"}