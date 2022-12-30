from fastapi import APIRouter, Body
from models.section import Section
from models.product import Product

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

@router.post("/v1/section/", tags=["Section"], description="Tạo danh mục mới", responses=responses_custom, )
def create_section(new_section: Section = Body(
        default={
        "section_name": "Tên Danh Mục",
        "product_id": "Code SP"
        }
    )):
    products =  new_section.product_id.replace(",", " ")
    products_split = products.split()
    product_error = 0
    for i in range(len(products_split)):
        if not Product.find_by_id_products(products_split[i]):
            product_error += 1
    if product_error > 0:
        return {'status': 422, "message": "id sản phẩm không tồn tại!"}
    if new_section.find_section_by_section_name(new_section.section_name):
        return {'status': 422, "message": "tên danh mục đã tồn tại!"}
    else:
        new_section.insert_section(new_section.section_name, products.split())
        return {'status': 200, "message": "tạo thành công"}

@router.get("/v1/section/", tags=["Section"], description="Đọc tất cả các danh mục", responses= responses_custom)
def get_all_sections():
    section = Section()
    result = section.read_all_section()
    products = Product()
    list_products = []
    section_products = {}
    list_section = []
    if result is not None:
        for c in range(len(result)):    
            id_section = result[c]['id_section']
            name_section = result[c]['name_section']
            section_products = {"id_section": id_section, "name_section": name_section, "info_products": []}
            for i in range(len(result[c]['products_id'])):
                id_product = result[c]['products_id'][i]
                list_products.append(products.find_by_id_product(id_product))    
                section_products["info_products"].append(products.find_by_id_product(id_product))
            list_section.append(section_products)
        return list_section
    

@router.get("/v1/section/{id_section}/products", tags=["Section"], description="Đọc tất cả các phần sản phẩm theo id", responses= responses_custom)
def get_all_sections_products(id_section: int):
    section = Section()
    result = section.read_all_section_products(id_section)
    products = Product()
    list_products = []
    if result is not None:
        for i in range(len(result['products_id'])):
            id_product = result['products_id'][i]
            list_products.append(products.find_by_id_product(id_product))
        return list_products
    else:
        return {"status": 422, "message": "lỗi danh mục"}    

@router.get("/v1/section/{section_name}/", tags=["Section"], description="Đọc tên danh mục", responses=responses_custom)
def get_section_by_name(section_name: str):
    section = Section()
    return section.find_section_by_section_name(section_name)

@router.delete("/v1/section/{id_section}/", tags=["Section"], description="Xóa một danh mục", responses=responses_custom)
def delete_section(id_section: str):
    section = Section()
    if id_section is not None:
        section.delete_section(id_section)
        return {"status": 200, "message": "Xóa danh mục thành công"}
    else:
        return {"status": 422, "message": "lỗi xác thực khi xóa"}

@router.patch('/v1/section/products',tags=["Section"], description="sửa sản phẩm", responses= responses_custom)
def patch_section(section: Section = Body(
        default={
        "section_name": "Tên Danh Mục",
        "product_id": "Code SP"
        }
    )): #Adds more products a section array in database
    product_list = []
    if section.find_section_by_section_name(section.section_name):
        product_list.append(section.find_section_by_section_name(section.section_name))
        product_list[0][0]['products_id'].append(section.product_id)
        section.patch_products_id(section.section_name,product_list[0][0]['products_id'])
        return {"status": 200, "message": "Cập nhật phần tên thành công!"}
    else: 
        return {"status": 422, "message": "Tên mục không tồn tại"}


