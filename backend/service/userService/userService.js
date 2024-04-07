const bycrpt = require("bcryptjs");
const db = require("../../config/postgres");
const validatePassword = require("../../utlis/passwordValidator");
const jwt = require("jsonwebtoken");
const { emailClient, mailOptions } = require("../emailService/emailService");
const { welcomeEmail } = require("../../emailTemplate/emailTemplate");
const { query } = require("express");

const createService = async (body, createdUser) => {
  if (
    !body.name ||
    !body.email ||
    !body.password ||
    !body.role ||
    !body.status ||
    !body.address
  ) {
    throw new Error("required fields are missing!");
  }
  const company = await db.query(
    `SELECT ID FROM company WHERE name = '${createdUser.company}'`
  );
  if (!company.rowCount) {
    throw new Error("Company does not exist.");
  }

  const userAvailable = await db.query(
    `SELECT * FROM users where email = '${body.email}' LIMIT 1`
  );
  if (userAvailable.rowCount) {
    throw new Error("Email Already Exist.");
  }

  const passwordNotValid = validatePassword(body.password);
  if (passwordNotValid) {
    throw new Error(passwordNotValid);
  }

  const password = await bycrpt.hash(body.password, 10);

  const newUser =
    await db.query(`INSERT INTO users (profile_image,name, email, company_id,address,currency, timezone, password)
                    VALUES (
                       '${body.photo}',
                       '${body.name}',
                       '${body.email}', 
                        ${company.rows[0].id},
                        '${body.address}', 
                        ${body.currency ? `'${body.currency}'` : null},
                        ${body.timezone ? `'${body.timezone}'` : null},
                        '${password}'
                        )
                    RETURNING ID`);

  const employee =
    await db.query(`INSERT INTO employees (user_id,created_by, role, status)
                                    VALUES (
                                        '${newUser.rows[0].id}', 
                                        '${createdUser.id}',
                                        '${body.role.toLowerCase().trim()}',
                                        '${body.status.toLowerCase().trim()}'
                                        )
                                    RETURNING ID`);

  const user =
    await db.query(`SELECT users.id ,users.name, users.email, users.currency, users.timezone,
                                company.name AS company_name , employees.role as role
                                FROM users 
                                JOIN company ON users.company_id = company.id 
                                JOIN employees on users.id = employees.user_id
                                WHERE users.id = ${newUser.rows[0].id}`);

  mailOptions["to"] = user.rows[0].email;
  mailOptions["subject"] = "Welcome To SalesTree";
  mailOptions["html"] = welcomeEmail({ name: user.rows[0].name });

  emailClient.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Failed to send Welcome email.");
    }
  });

  return {
    user: user.rows[0],
    message: "User successfully created.",
    success: true,
  };
};

const userDetails = async (params, createUser) => {
  const { id } = params;

  if (createUser.role === "owner") {
    const user =
      await db.query(`SELECT  users.profile_image as file , users.name, users.email ,users.address,
                    UPPER(employees.role) as role, UPPER(employees.status) as status 
                    FROM users 
                    JOIN company ON users.company_id = company.id 
                    JOIN employees on users.id = employees.user_id
                    WHERE company.name = '${createUser.company}'
                    AND
                    users.id = ${id}
                    `);

    if (!user.rowCount) {
      throw new Error("No user with id exist.");
    }

    return user.rows[0];
  } else if (createUser.role === "admin") {
    const user =
      await db.query(`SELECT users.profile_image AS file, users.name, users.email, users.address,
                  UPPER(employees.role) AS role, UPPER(employees.status) AS status
                  FROM users
                  JOIN company ON users.company_id = company.id
                  JOIN employees ON users.id = employees.user_id
                  WHERE company.name = '${createUser.company}'
                  AND 
                  employees.created_by = ${createUser.id}
                  AND
                  users.id = ${id}
                  `);

    if (!user.rowCount) {
      throw new Error("No user with id exist.");
    }

    return user.rows[0];
  } else {
    throw new Error("Insufficent Permissions.");
  }
};

const editService = async (body, createdUser, params) => {
  const { id } = params;

  if (
    !body.name ||
    !body.email ||
    !body.role ||
    !body.status ||
    !body.address
  ) {
    throw new Error("required fields are missing!");
  }

  const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);

  if (!user.rowCount) {
    throw new Error("User dose not exist");
  }

  if (user.rows[0].email !== body.email) {
    
    const emailCheck = await db.query(
      `SELECT * FROM users WHERE email = '${body.email}'`
    );
    if (emailCheck.rowCount) {
      throw new Error("Email allready Exist.");
    }
  }

  const updatedUser = await db.query(`UPDATE users
                                      SET 
                                        profile_image = '${body.photo}',
                                        name = '${body.name}',
                                        email = '${body.email}',
                                        address = '${body.address}'
                                      WHERE
                                        id = ${id}`);


  const updatedEmployee = await db.query(`UPDATE employees
                  SET  
                  role = '${body.role.toLowerCase().trim()}', 
                  status = '${body.status.toLowerCase().trim()}'
                  WHERE
                  user_id = ${id}`);

  return {
    message: "User successfully updated.",
    success: true,
  };
};

const deleteService = async (params,createdBy)=>{
  const { id } = params;

  if(!createdBy.role === "owner" && !createdBy.role === "admin"){
    throw new Error("Insufficent Permissions.")
  }

  if(createdBy.role === "owner"){
    const user = await db.query(`SELECT  users.profile_image as file , users.name, users.email ,users.address,
                          UPPER(employees.role) as role, UPPER(employees.status) as status 
                          FROM users 
                          JOIN company ON users.company_id = company.id 
                          JOIN employees on users.id = employees.user_id
                          WHERE company.name = '${createdBy.company}'
                          AND
                          users.id = ${id}`)

    if(!user.rowCount){
      throw new Error("User does not exist.")
    }

    await db.query(`UPDATE users
                  SET
                  is_delete = true
                  WHERE 
                  id = ${id} `)

    await db.query(`UPDATE employees
                    SET
                    is_delete = true
                    WHERE
                    created_by = ${id}`)

  }else if(createdBy.role === "admin"){

    const user = await db.query(`SELECT users.profile_image AS file, users.name, users.email, users.address,
                                    UPPER(employees.role) AS role, UPPER(employees.status) AS status
                                    FROM users
                                    JOIN company ON users.company_id = company.id
                                    JOIN employees ON users.id = employees.user_id
                                    WHERE company.name = '${createdBy.company}'
                                    AND 
                                    employees.created_by = ${createdBy.id}
                                    AND
                                    users.id = ${id}`)

    if(!user.rowCount){
      throw new Error("User does not exist.")
    }

    await db.query(`UPDATE users
                  SET
                  is_delete = true
                  WHERE 
                  id = ${id} `)

    await db.query(`UPDATE employees
                    SET
                    is_delete = true
                    WHERE
                    created_by = ${id}`)

  }

  return {
    message:"User sucessfully deleted",
    success:true
  }

};

const searchService = async (query,createdBy) =>{
  const { limit , offset , query:queryParam} = query;

  if (!limit || !offset || !queryParam) {
    throw new Error("Missing required params");
  }

  if (createdBy.role === "owner") {
    // get everybody in the company

    const users =
      await db.query(`SELECT users.id, users.profile_image , users.name, users.email,
                                     employees.role as role, employees.status as status 
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees on users.id = employees.user_id
                                     WHERE 
                                     company.name = '${createdBy.company}'
                                     AND 
                                     users.is_delete = false
                                     AND (
                                      users.email LIKE '%${queryParam}%' 
                                      OR employees.role LIKE '%${queryParam}%' 
                                      OR users.name LIKE '%${queryParam}%'
                                      )
                                     ORDER BY users.id ASC
                                     LIMIT ${limit} OFFSET ${offset}`);

    const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT users.id
                                        FROM users 
                                        JOIN company ON users.company_id = company.id 
                                        JOIN employees ON users.id = employees.user_id
                                        WHERE 
                                        company.name = '${createdBy.company}'
                                        AND 
                                        users.is_delete = false
                                        AND (
                                          users.email LIKE '%${queryParam}%' 
                                          OR employees.role LIKE '%${queryParam}%' 
                                          OR users.name LIKE '%${queryParam}%'
                                        )
                                        ) AS subquery;`);

    return {
      rows: users.rows,
      rowCount: rowCount.rows[0].count,
      message: "User successfully retrived",
      success: true,
    };
  } else if (createdBy.role === "admin") {
    const users =
      await db.query(`SELECT users.id, users.profile_image , users.name, users.email,
                                     company.name AS company_name ,
                                     employees.role as role, employees.status as status 
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees on users.id = employees.user_id
                                     WHERE company.name = '${createdBy.company}'
                                     AND 
                                     employees.created_by = ${createdBy.id}
                                     AND (
                                      users.email LIKE '%${queryParam}%' 
                                      OR employees.role LIKE '%${queryParam}%' 
                                      OR users.name LIKE '%${queryParam}%'
                                    )
                                     ORDER BY users.id ASC
                                     LIMIT ${limit} OFFSET ${offset}`);

    const rowCount = await db.query(`SELECT COUNT(*) 
                                     FROM (
                                     SELECT users.id
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees ON users.id = employees.user_id
                                     WHERE company.name = '${createdBy.company}'
                                     AND 
                                     employees.created_by = ${createdBy.id}
                                     AND (
                                      users.email LIKE '%${queryParam}%' 
                                      OR employees.role LIKE '%${queryParam}%' 
                                      OR users.name LIKE '%${queryParam}%'
                                    )
                                     ) AS subquery;`);
    return {
      rows: users.rows,
      rowCount: rowCount.rows[0].count,
      message: "User successfully retrived",
      success: true,
    };
  } else {
    throw new Error("Invalid User.");
  }
};

const pagination = async (query, createUser) => {
  const { limit, offset } = query;

  if (!limit || !offset) {
    throw new Error("Missing required params");
  }

  if (createUser.role === "owner") {
    // get everybody in the company

    const users =
      await db.query(`SELECT users.id, users.profile_image , users.name, users.email,
                                     employees.role as role, employees.status as status 
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees on users.id = employees.user_id
                                     WHERE 
                                     company.name = '${createUser.company}'
                                     AND 
                                     users.is_delete = false
                                     ORDER BY users.id ASC
                                     LIMIT ${limit} OFFSET ${offset}`);

    const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT users.id
                                        FROM users 
                                        JOIN company ON users.company_id = company.id 
                                        JOIN employees ON users.id = employees.user_id
                                        WHERE 
                                        company.name = '${createUser.company}'
                                        AND 
                                        users.is_delete = false
                                        ) AS subquery;`);

    return {
      rows: users.rows,
      rowCount: rowCount.rows[0].count,
      message: "User successfully retrived",
      success: true,
    };
  } else if (createUser.role === "admin") {
    const users =
      await db.query(`SELECT users.id, users.profile_image , users.name, users.email,
                                     company.name AS company_name ,
                                     employees.role as role, employees.status as status 
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees on users.id = employees.user_id
                                     WHERE company.name = '${createUser.company}'
                                     AND 
                                     employees.created_by = ${createUser.id}
                                     ORDER BY users.id ASC
                                     LIMIT ${limit} OFFSET ${offset}`);

    const rowCount = await db.query(`SELECT COUNT(*) 
                                     FROM (
                                     SELECT users.id
                                     FROM users 
                                     JOIN company ON users.company_id = company.id 
                                     JOIN employees ON users.id = employees.user_id
                                     WHERE company.name = '${createUser.company}'
                                     AND 
                                     employees.created_by = ${createUser.id}
                                     ) AS subquery;`);
    return {
      rows: users.rows,
      rowCount: rowCount.rows[0].count,
      message: "User successfully retrived",
      success: true,
    };
  } else {
    throw new Error("Invalid User.");
  }
};

module.exports = {
  createService,
  editService,
  pagination,
  userDetails,
  deleteService,
  searchService
};
