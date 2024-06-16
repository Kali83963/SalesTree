const bycrpt = require("bcryptjs");
const db = require("../../../config/postgres");

const createService = async (body, createdBy) => {
  if (!body.name || !body.description || !body.category) {
    throw new Error("required fields are missing!");
  }
  const categoryName = body.category.toLowerCase().trim();
  const description = body.description.toLowerCase().trim();
  const subCategory = body.name.toLowerCase().trim();
  const category = await db.query(
    `SELECT category.id FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.name = '${categoryName}' AND category.is_delete = false AND company.is_delete = false`
  );
  if (!category.rowCount) {
    throw new Error("Category does not exist.");
  }


  const subCategoryExist = await db.query(
    `SELECT * FROM sub_category
     JOIN company ON sub_category.company_id = company.id
     JOIN category ON category.id = sub_category.category
     WHERE 
     company.name = '${createdBy.company}' 
     AND 
     category.name = '${categoryName}'
     AND
     sub_category.name = '${subCategory}'
     AND
     sub_category.is_delete = false`
  );

  if(subCategoryExist.rowCount){
    throw new Error("SubCategory already exist.");
  }

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );


   await db.query(
    `INSERT INTO sub_category (name,description,company_id,created_user,category)
    VALUES (
        '${subCategory}',
        '${description}',
        '${company.rows[0].id}',
        '${createdBy.id}',
        '${category.rows[0].id}'
    )`
  );

  return {
    // user: user.rows[0],
    message: "SubCategory successfully created.",
    success: true,
  };
};

const detailsService = async (params, createdBy) => {
  const { id } = params;

  const subCategory = await db.query(
    `SELECT category.name as category , sub_category.name , sub_category.description
    FROM
    sub_category
    JOIN 
    company ON sub_category.company_id = company.id
    JOIN 
    category ON category.id = sub_category.category
    WHERE company.name = '${createdBy.company}' AND sub_category.id = '${id}'`
  );

  if (!subCategory.rowCount) {
    throw new Error("SubCategory does not exist.");
  }

  return subCategory.rows[0];
};

const editService = async (body, createdBy, params) => {
  const { id } = params;
  console.log(body)

  if (!body.name || !body.description || !body.category) {
    throw new Error("required fields are missing!");
  }

  const categoryName = body.category.toLowerCase().trim();
  const description = body.description.toLowerCase().trim();
  const subCategory = body.name.toLowerCase().trim();

  
  const subCategoryExist = await db.query(
    `SELECT * FROM sub_category
    JOIN company ON sub_category.company_id = company.id
    JOIN category ON category.id = sub_category.category
    WHERE 
    company.name = '${createdBy.company}' 
    AND 
    category.name = '${categoryName}'
    AND
    sub_category.id = '${id}'`
  );
  

  if (!subCategoryExist.rowCount) {
    throw new Error("SubCategory does not exist.");
  }


  const subCategoryExceptIDExist = await db.query(
    `SELECT * FROM sub_category
     JOIN company ON sub_category.company_id = company.id
     JOIN category ON category.id = sub_category.category
     WHERE 
     company.name = '${createdBy.company}' 
     AND 
     category.name = '${categoryName}'
     AND
     sub_category.name = '${subCategory}'
     AND
     sub_category.id != '${id}'`
     
  );

  if(subCategoryExceptIDExist.rowCount){
    throw new Error("SubCategory name already exist.");
  }

  const category = await db.query(
    `SELECT category.id FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.name = '${categoryName}'`
  );
  if (!category.rowCount) {
    throw new Error("Category does not exist.");
  }
  

  await db.query(
    `UPDATE sub_category SET name = '${subCategory}' , description = '${description}' , category= '${category.rows[0].id}' WHERE id = '${id}'`
  );

  return {
    message: "Category successfully updated.",
    success: true,
  };
};

const deleteService = async (params, createdBy) => {
  const { id } = params;

  const subCategoryExist = await db.query(
    `SELECT * FROM sub_category
     JOIN company ON sub_category.company_id = company.id
     JOIN category ON category.id = sub_category.category
     WHERE 
     company.name = '${createdBy.company}' 
     AND
     sub_category.id = '${id}'`
  );

  if(!subCategoryExist.rowCount){
    throw new Error("SubCategory does not exist.");
  }

  await db.query(`UPDATE sub_category
                        SET
                        is_delete = true
                        WHERE 
                        id = ${id}`);

  return {
    message: "SubCategory sucessfully deleted",
    success: true,
  };
};

const searchService = async (query, createdBy) => {
  const { limit, offset, query: queryParam } = query;

  if (!limit || !offset || !queryParam) {
    throw new Error("Missing required params");
  }

  const subCategory =
    await db.query(`SELECT sub_category.id ,category.name as category_name ,sub_category.name ,sub_category.description 
                FROM sub_category 
                JOIN company ON company.id = sub_category.company_id
                JOIN category ON category.id = sub_category.category
                WHERE company.name = '${createdBy.company}'
                AND 
                sub_category.is_delete = false
            AND( 
            category.name LIKE '%${queryParam}%' OR sub_category.name LIKE '%${queryParam}%') 
                ORDER BY sub_category.id ASC
                LIMIT ${limit} OFFSET ${offset}
  `);
  
  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                            SELECT category.name as category_name ,sub_category.name ,sub_category.description 
                                            FROM sub_category 
                                            JOIN company ON company.id = sub_category.company_id
                                            JOIN category ON category.id = sub_category.category
                                            WHERE company.name = '${createdBy.company}'
                                            AND 
                                            sub_category.is_delete = false
                                            AND( 
                                            category.name LIKE '%${queryParam}%' OR sub_category.name LIKE '%${queryParam}%') 
                                        ) AS subquery;`);

  return {
    rows: subCategory.rows,
    rowCount: rowCount.rows[0].count,
    message: "SubCategory successfully retrived",
    success: true,
  };
};

const pagination = async (query, createdBy) => {
  const { limit, offset } = query;

  if (!limit || !offset) {
    throw new Error("Missing required params");
  }

  const subCategory =
    await db.query(`SELECT sub_category.id,category.name as category_name, sub_category.name , sub_category.description 
                    FROM sub_category 
                    JOIN company ON company.id = sub_category.company_id
                    JOIN category ON category.id = sub_category.category
                    WHERE company.name = '${createdBy.company}'
                    AND sub_category.is_delete = false
                    ORDER BY sub_category.id ASC
                    LIMIT ${limit} OFFSET ${offset}`
                  );
  const rowCount = await db.query(`SELECT COUNT(*) 
                                    FROM (
                                        SELECT sub_category.id
                                        FROM sub_category 
                                        JOIN company ON company.id = sub_category.company_id
                                        JOIN category ON category.id = sub_category.category
                                        WHERE company.name = '${createdBy.company}'
                                        AND sub_category.is_delete = false
                                    ) AS subquery`
                                  );

  return {
    rows: subCategory.rows,
    rowCount: rowCount.rows[0].count,
    message: "SubCategory successfully retrived",
    success: true,
  };
};

const listService = async (query,createdBy) =>{

  const { category: categoryName } = query;

  const lowerCaseCategory = categoryName.toLowerCase().trim();

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );
  const category = await db.query(
    `SELECT * FROM category WHERE company_id = ${company.rows[0].id} AND name= '${lowerCaseCategory}' AND is_delete = false`
  );
  if(!category.rowCount){
    console.lo
    return {
      rows:[]
    }
  }
  console.log(categoryName)
  console.log(category.rows)

  const sub_category = await db.query(
    `SELECT name FROM sub_category WHERE company_id = ${company.rows[0].id} AND category = ${category.rows[0].id} AND is_delete = false`
  );

  const subCategoryList = [];

  sub_category.rows.map((val)=>{
    subCategoryList.push(val.name);
  })

  return {
    rows:subCategoryList
  };
}


module.exports = {
  createService,
  editService,
  pagination,
  detailsService,
  deleteService,
  searchService,
  listService
};
 