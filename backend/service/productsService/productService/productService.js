const bycrpt = require("bcryptjs");
const db = require("../../../config/postgres");
const validatePassword = require("../../../utlis/passwordValidator");
const jwt = require("jsonwebtoken");

const { query } = require("express");

const createService = async (body, createdBy) => {
  if (!body.name || !body.description || !body.category || !body.sub_category || !body.barcode || !body.manufacture || !body.price || !body.unit || !body.sku || !body.photo) {
    throw new Error("required fields are missing!");
  }
  const { name , description , category , sub_category , barcode , manufacture , price:selling_price , unit , sku , photo } = body;
  
  const lowerCaseCategory = category.toLowerCase().trim();
  const lowerCaseSubCategory = sub_category.toLowerCase().trim();
  const lowerCaseManufacture = manufacture.toLowerCase().trim();
  const lowerCaseName = name.toLowerCase().trim();

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );
  
  const categoryExist = await db.query(
    `SELECT * FROM category WHERE company_id = ${company.rows[0].id} AND name= '${lowerCaseCategory}' AND is_delete = false`
  );
  if (!categoryExist.rowCount) {
    throw new Error("Category does not exist.");
  }
  
  const sub_categoryExist = await db.query(
    `SELECT * FROM sub_category WHERE company_id = ${company.rows[0].id} AND category = ${categoryExist.rows[0].id} AND name= '${lowerCaseSubCategory}' AND is_delete = false`
  );
  if (!sub_categoryExist.rowCount) {
    throw new Error("SubCategory does not exist.");
  }
  const manufactureExist = await db.query(
      `SELECT * FROM manufacture WHERE company_id = ${company.rows[0].id} AND name='${lowerCaseManufacture}' AND is_delete = false`
    );
    if (!manufactureExist.rowCount) {
        throw new Error("Manufacture does not exist.");
    }
    
  const productExist = await db.query(
    `SELECT * FROM product WHERE company_id = ${company.rows[0].id} AND manufacture_id= ${manufactureExist.rows[0].id} AND sub_category_id = ${sub_categoryExist.rows[0].id} AND category_id =${categoryExist.rows[0].id} AND name='${lowerCaseName}' AND is_delete = false`
  );
  if (productExist.rowCount) {
    throw new Error("Product already exist.");
  }


  const product = await db.query(
    `INSERT INTO product (name,description,company_id,category_id,sub_category_id,manufacture_id,sku,selling_price, unit, barcode, image)
    VALUES (    
        '${lowerCaseName}',
        '${description}',
        '${company.rows[0].id}',
        '${categoryExist.rows[0].id}',
        '${sub_categoryExist.rows[0].id}',
        '${manufactureExist.rows[0].id}',
        '${sku}',
        '${selling_price}',
        '${unit}',
        '${barcode}',
        '${photo}'

    )`
  );

  return {
    // user: user.rows[0],
    message: "Category successfully created.",
    success: true,
  };
};

const detailsService = async (params, createdBy) => {
  const { id } = params;

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );

  const product = await db.query(
    `SELECT product.name, product.description , product.barcode , product.selling_price AS price , product.unit, product.sku, product.image AS file,
    UPPER(category.name) AS category,
    UPPER(sub_category.name) AS sub_category,
    UPPER(manufacture.name) AS manufacture
    FROM product
    JOIN category ON category.id = product.category_id
    JOIN sub_category ON sub_category.id = product.sub_category_id
    JOIN manufacture ON manufacture.id = product.manufacture_id 
    WHERE product.company_id = ${company.rows[0].id} 
    AND product.id =${id}`
  );

  if (!product.rowCount) {
    throw new Error("Product does not exist.");
  }

  return product.rows[0];
};

const editService = async (body, createdBy, params) => {
  const { id } = params;
  if (!body.name || !body.description || !body.category || !body.sub_category || !body.barcode || !body.manufacture || !body.price || !body.unit || !body.sku ) {
    throw new Error("required fields are missing!");
  }
  const { name , description , category , sub_category , barcode , manufacture , price:selling_price , unit , sku , photo , file } = body;
  
  const lowerCaseCategory = category.toLowerCase().trim();
  const lowerCaseSubCategory = sub_category.toLowerCase().trim();
  const lowerCaseManufacture = manufacture.toLowerCase().trim();
  const lowerCaseName = name.toLowerCase().trim();

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );
  
  const categoryExist = await db.query(
    `SELECT * FROM category WHERE company_id = ${company.rows[0].id} AND name= '${lowerCaseCategory}' AND is_delete = false`
  );
  if (!categoryExist.rowCount) {
    throw new Error("Category does not exist.");
  }
  
  const sub_categoryExist = await db.query(
    `SELECT * FROM sub_category WHERE company_id = ${company.rows[0].id} AND category = ${categoryExist.rows[0].id} AND name= '${lowerCaseSubCategory}' AND is_delete = false`
  );
  if (!sub_categoryExist.rowCount) {
    throw new Error("SubCategory does not exist.");
  }
  const manufactureExist = await db.query(
      `SELECT * FROM manufacture WHERE company_id = ${company.rows[0].id} AND name='${lowerCaseManufacture}' AND is_delete = false`
    );
  if (!manufactureExist.rowCount) {
    throw new Error("Manufacture does not exist.");
   }


   const productExist = await db.query(
    `SELECT * FROM product WHERE company_id = ${company.rows[0].id} AND manufacture_id= ${manufactureExist.rows[0].id} AND sub_category_id = ${sub_categoryExist.rows[0].id} AND category_id =${categoryExist.rows[0].id} AND name='${lowerCaseName}' AND id != ${id} AND is_delete = false`
  );
  if (productExist.rowCount) {
    throw new Error("Product already exist.");
  }

  await db.query(
    `UPDATE product 
     SET name = '${name}', 
        description = '${description}',
        sku= '${sku}',
        selling_price = '${selling_price}',
        unit = '${unit}',
        barcode = '${barcode}',
        image = '${photo || file}',
        category_id = ${categoryExist.rows[0].id},
        sub_category_id = ${sub_categoryExist.rows[0].id},
        manufacture_id = ${manufactureExist.rows[0].id}
        WHERE id = '${id}'`
  );

  return {
    message: "Product successfully updated.",
    success: true,
  };
};

const deleteService = async (params, createdBy) => {
  const { id } = params;

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );
  

  const product = await db.query(
    `SELECT * FROM product  WHERE company_id = ${company.rows[0].id} AND id =${id}`
  );

  if (!product.rowCount) {
    throw new Error("Product does not exist.");
  }

  await db.query(`UPDATE product
                        SET
                        is_delete = true
                        WHERE 
                        id = ${id}`);

  return {
    message: "Product sucessfully deleted",
    success: true,
  };
};

const searchService = async (query, createdBy) => {
  const { limit, offset, query: queryParam } = query;

  if (!limit || !offset || !queryParam) {
    throw new Error("Missing required params");
  }
  const company = await db.query(`SELECT ID FROM company where name= '${createdBy.company}'`);


  const category =
    await db.query(`SELECT                                                                
                product.id,
                product.image,
                product.unit AS unit,
                product.name AS product_name,
                category.name AS category_name,
                sub_category.name AS sub_category_name,
                manufacture.name AS manufacture_name,
                product.barcode,
                product.selling_price,
                product.sku
                FROM product
                JOIN category ON category.id = product.category_id
                JOIN sub_category ON sub_category.id = product.sub_category_id
                JOIN manufacture ON manufacture.id = product.manufacture_id
                WHERE 
                product.company_id = '${company.rows[0].id}'
                AND product.is_delete = false
                AND (
                    product.name ILIKE '%${queryParam}%'
                    OR product.sku ILIKE '%${queryParam}%'
                    OR product.unit ILIKE '%${queryParam}%'
                    OR manufacture.name ILIKE '%${queryParam}%'
                    OR category.name ILIKE '%${queryParam}%'
                    OR sub_category.name ILIKE '%${queryParam}%'
                    OR product.barcode ILIKE '%${queryParam}%'
                    OR product.selling_price::TEXT ILIKE '%${queryParam}%'
                )
                ORDER BY product.id ASC
                LIMIT ${limit} OFFSET ${offset};
  `);

  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT *
                                        FROM product 
                                        JOIN category ON category.id = product.category_id
                                        JOIN sub_category ON sub_category.id = product.sub_category_id
                                        JOIN manufacture ON manufacture.id = product.manufacture_id
                                        WHERE product.company_id = '${company.rows[0].id}' 
                                        AND product.is_delete = false
                                        AND (
                                            product.name ILIKE '%${queryParam}%'
                                            OR product.sku ILIKE '%${queryParam}%'
                                            OR product.unit ILIKE '%${queryParam}%'
                                            OR manufacture.name ILIKE '%${queryParam}%'
                                            OR category.name ILIKE '%${queryParam}%'
                                            OR sub_category.name ILIKE '%${queryParam}%'
                                            OR product.barcode ILIKE '%${queryParam}%'
                                            OR product.selling_price::TEXT ILIKE '%${queryParam}%'
                                        )
                                        ) AS subquery;`);

  return {
    rows: category.rows,
    rowCount: rowCount.rows[0].count,
    message: "Category successfully retrived",
    success: true,
  };
};

const pagination = async (query, createdBy) => {
  const { limit, offset } = query;
  if (!limit || !offset) {
    throw new Error("Missing required params");
  }

  const company = await db.query(`SELECT ID FROM company where name= '${createdBy.company}'`);
  

  const product =
    await db.query(`SELECT 
    product.id,
    product.image,
    product.unit AS unit,
    product.name AS product_name,
    category.name AS category_name,
    sub_category.name AS sub_category_name,
    manufacture.name AS manufacture_name,
    product.barcode,
    product.selling_price,
    product.sku
    FROM product
    JOIN category ON category.id = product.category_id
    JOIN sub_category ON sub_category.id = product.sub_category_id
    JOIN manufacture ON manufacture.id = product.manufacture_id
    WHERE product.company_id = '${company.rows[0].id}'
    AND product.is_delete = false
    ORDER BY product.id ASC
    LIMIT ${limit} OFFSET ${offset};
  `);

//   AND category.is_delete = false
//   AND sub_category.is_delete = false
//   AND manufacture.is_delete = false

  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT *
                                        FROM product  
                                        WHERE 
                                        company_id = '${company.rows[0].id}'
                                        AND 
                                            is_delete = false
                                        ) AS subquery;`);


  return {
    rows: product.rows,
    rowCount: rowCount.rows[0].count,
    message: "Product successfully retrived",
    success: true,
  };
};

const listService = async (query,createdBy) =>{

  const { query: queryParam } = query;
  console.log(queryParam)

  let product;

  if(query){
     product = await db.query(
      `SELECT product.id, product.name , product.description , product.selling_price , product.unit , product.barcode FROM product JOIN company ON product.company_id = company.id WHERE company.name = '${createdBy.company}' AND product.is_delete = false
       AND (
          product.name ILIKE '%${queryParam}%'
          OR product.barcode ILIKE '%${queryParam}%'
      );`
    );
    //  product = await db.query(
    //   `SELECT product.id, product.name , product.description , product.selling_price , product.unit , product.barcode FROM product JOIN company ON product.company_id = company.id
    //   LEFT JOIN (
    //   SELECT product_id, SUM(quantity) AS total_sales_quantity
    //   FROM sales
    //   GROUP BY product_id
    //   ) AS sales_aggregate ON product.id = sales_aggregate.product_id   
    //   WHERE company.name = '${createdBy.company}' 
    //   AND product.is_delete = false
    //   AND CAST(product.unit AS INTEGER) > COALESCE(sales_aggregate.total_sales_quantity, 0)
    //    AND (
    //       product.name ILIKE '%${queryParam}%'
    //       OR product.barcode ILIKE '%${queryParam}%'
    //   );`
    // );
  }else{

     product = await db.query(
      `SELECT product.id, product.name , product.description , product.selling_price , product.unit , product.barcode FROM product JOIN company ON product.company_id = company.id WHERE company.name = '${createdBy.company}' AND product.is_delete = false;`
    );
  }

  const productList = [];

  product.rows.map((val)=>{
    productList.push(val);
  })

  return {
    rows:productList
  };
}

const quantityCheckService = async (body,params , createdBy)=>{
  const { id } = params;
  const { quantity } = body;

  const quantityCheck = await db.query(
    `SELECT * from product JOIN company ON product.company_id = company.id WHERE company.name = '${createdBy.company}'  AND product.is_delete = false AND  CAST(product.unit AS INTEGER) >= ${quantity} AND product.id = ${id};`
  )

  if (quantityCheck.rows.length === 0) {
    throw new Error('Insufficient quantity or product not found.');
  }

  return quantityCheck.rows;

}
// const listSearchService = async (query,createdBy) =>{

//   const { query: queryParam } = query;

  

//   const productList = [];

//   product.rows.map((val)=>{
//     productList.push(val);
//   })

//   return {
//     rows:productList
//   };
// }

module.exports = {
  createService,
  editService,
  pagination,
  detailsService,
  deleteService,
  searchService,
  listService,
  quantityCheckService
  // listSearchService
};
