from pydantic import BaseModel, Field
from db.config import insert_db,read_db_section,read_db_section_products

class Section(BaseModel):
    section_name: str = Field(None, alias="section_name")
    product_id: str = Field(None, alias= "product_id")

    def set_section(self, section_name, product_id):
        self.section_name = section_name
        self.product_id = product_id
    
    def insert_section(self, section_name,product_id):
        self.set_section(section_name, product_id)
        all_sections = Section.read_all_section(self)
        sql = f"INSERT INTO product_section (id_section, section_name, products_id)"
        sql += f"VALUES ({len(all_sections) + 1}, '{section_name}', ARRAY {product_id});"
        insert_db(sql)
    
    def read_all_section(self):
        sql = f"SELECT * FROM product_section;"
        result = read_db_section(sql)
        return result
    
    def delete_section(self, id_section):
        sql = f"DELETE FROM product_section"
        sql += f" WHERE id_section = '{id_section}'"
        insert_db(sql)

    def find_section_by_section_name(self, section_name):
        sql = f"SELECT * FROM product_section WHERE section_name = '{section_name}'"
        result = read_db_section(sql)
        return result
    
    def patch_products_id(self,section_name,product_id):
        self.set_section(section_name, product_id)
        sql = f"UPDATE product_section "
        sql += f"SET products_id = ARRAY {product_id} "
        sql += f" WHERE section_name = '{section_name}'; "
        result = insert_db(sql)
        return result

    def read_all_section_products(self, id_section):
        sql = f"SELECT products_id FROM product_section WHERE id_section = '{id_section}';"
        result = read_db_section_products(sql)
        return result
    
    def delete_a_product_in_section(id_product):
        sql = f"DELETE FROM product_section"
        sql += f" WHERE '{id_product}' = ANY(products_id)"
        insert_db(sql)