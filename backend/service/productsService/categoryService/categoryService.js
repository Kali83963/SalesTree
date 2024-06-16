const bycrpt = require("bcryptjs");
const db = require("../../../config/postgres");
const validatePassword = require("../../../utlis/passwordValidator");
const jwt = require("jsonwebtoken");

const { query } = require("express");

const createService = async (body, createdBy) => {
    console.log(body)
  if (!body.name || !body.description) {
    throw new Error("required fields are missing!");
  }
  const categoryName = body.name.toLowerCase().trim();
  const categoryDescription = body.description.toLowerCase().trim();
  const categoryExist = await db.query(
    `SELECT * FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.name = '${categoryName}'`
  );
  if (categoryExist.rowCount) {
    throw new Error("Category allready exist.");
  }

  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}'`
  );

  const category = await db.query(
    `INSERT INTO category (name,description,company_id,created_user)
    VALUES (
        '${categoryName}',
        '${categoryDescription}',
        '${company.rows[0].id}',
        '${createdBy.id}'
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

  const category = await db.query(
    `SELECT category.name, category.description FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.id = '${id}'`
  );

  if (!category.rowCount) {
    throw new Error("Category does not exist.");
  }

  return category.rows[0];
};

const editService = async (body, createdUser, params) => {
  const { id } = params;

  if (!body.name || !body.description) {
    throw new Error("required fields are missing!");
  }
  const category = await db.query(
    `SELECT category.name, category.description FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.id = '${id}'`
  );

  if (!category.rowCount) {
    throw new Error("Category does not exist.");
  }
  const categoryName = body.name.toLowerCase().trim();
  const categoryDescription = body.description.toLowerCase().trim();

  const categoryNameExist = await db.query(
    `SELECT * FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.name = '${categoryName}' AND category.id != ${id}`
  );

  if (categoryNameExist.rowCount) {
    throw new Error("Category name allready exist");
  }

  await db.query(
    `UPDATE category SET name = '${categoryName}' , description = '${categoryDescription}' WHERE id = '${id}'`
  );

  return {
    message: "Category successfully updated.",
    success: true,
  };
};

const deleteService = async (params, createdBy) => {
  const { id } = params;

  const category = await db.query(
    `SELECT category.name, category.description FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.id = '${id}'`
  );

  if (!category.rowCount) {
    throw new Error("Category does not exist.");
  }

  await db.query(`UPDATE category
                        SET
                        is_delete = true
                        WHERE 
                        id = ${id}`);

  return {
    message: "Category sucessfully deleted",
    success: true,
  };
};

const searchService = async (query, createdBy) => {
  const { limit, offset, query: queryParam } = query;

  if (!limit || !offset || !queryParam) {
    throw new Error("Missing required params");
  }

  const category =
    await db.query(`SELECT category.id,category.name,category.description 
                        FROM category 
                        JOIN company 
                        ON company.id = category.company_id
                        WHERE company.name = '${createdBy.company}'
                        AND 
                        category.is_delete = false
                        AND 
                        category.name LIKE '%${queryParam}%' 
                        ORDER BY category.id ASC
                        LIMIT ${limit} OFFSET ${offset}
  `);

  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT category.id
                                        FROM category 
                                        JOIN company ON category.company_id = company.id 
                                        WHERE 
                                        company.name = '${createdBy.company}'
                                        AND 
                                        category.is_delete = false
                                        AND category.name LIKE '%${queryParam}%'
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

  const category =
    await db.query(`SELECT category.id,category.name,category.description 
                        FROM category 
                        JOIN company 
                        ON company.id = category.company_id
                        WHERE company.name = '${createdBy.company}'
                        AND 
                        category.is_delete = false
                        ORDER BY category.id ASC
                        LIMIT ${limit} OFFSET ${offset}
  `);

  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT category.id
                                        FROM category 
                                        JOIN company ON category.company_id = company.id 
                                        WHERE 
                                        company.name = '${createdBy.company}'
                                        AND 
                                        category.is_delete = false
                                        ) AS subquery;`);

  return {
    rows: category.rows,
    rowCount: rowCount.rows[0].count,
    message: "Category successfully retrived",
    success: true,
  };
};

const listService = async (body,createdBy) =>{
  const category = await db.query(
    `SELECT category.name FROM category JOIN company ON category.company_id = company.id WHERE company.name = '${createdBy.company}' AND category.is_delete = false`
  );

  const categoryList = [];

  category.rows.map((val)=>{
    categoryList.push(val.name);
  })

  return {
    rows:categoryList
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
