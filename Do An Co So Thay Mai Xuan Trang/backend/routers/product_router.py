from fastapi import APIRouter

from models.product import Product
from models.section import Section

router = APIRouter()
responses_custom = {
        422: {
            "content": {
                "application/json": {
                    "example": {"status": 422, "message": "lỗi xác thực"}
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

@router.post("/v1/product", tags=["Product"], description="Tạo sản phẩm mới", responses= responses_custom)
def create_product(new_product: Product):
    new_product.insert_product(new_product.name_product,new_product.description,new_product.price,new_product.image)
    return new_product

@router.get("/v1/product", tags=["Product"], description= "Đọc tất cả sản phẩm", responses = responses_custom)
def get_all_products():
    product = Product()
    return product.read_product()


@router.put("/v1/product", tags=["Product"], description= "Cập nhật sản phẩm", responses = responses_custom)
def put_product(new_product: Product):
    new_product.put_product(new_product.cod_product, new_product.productname, new_product.description, new_product.price, new_product.image)
    return new_product

@router.delete("/v1/product/{cod_product}", tags=["Product"], description= "Xóa sản phẩm", responses = responses_custom)
def delete_product(cod_product: str):
    product = Product()
    product.delete_product(cod_product)
    product_info = Product.find_by_id_products(cod_product)
    section = Section.read_all_section(0)
    for i in range(len(section)):
        print(section[i]['products_id'])
        print(product_info)
        if cod_product in section[i]['products_id']:
            Section.delete_a_product_in_section(cod_product)
    return {"message": "xóa sản phẩm thành công"}

@router.get("/v1/product/{cod_product}", tags=["Product"], description="Đọc sản phẩm", responses = responses_custom)
def get_product_by_cod(cod_product: str):
    product = Product()
    return product.find_by_id_product(cod_product)