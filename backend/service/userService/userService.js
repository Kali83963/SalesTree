const bycrpt = require("bcryptjs");
const db = require("../../config/postgres");
const validatePassword = require("../../utlis/passwordValidator");
const jwt = require("jsonwebtoken");
const { emailClient, mailOptions } = require("../emailService/emailService");
const { welcomeEmail } = require("../../emailTemplate/emailTemplate");

const createUser = async (body, createdUser) => {
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
                                     WHERE company.name = '${createUser.company}'
                                     ORDER BY users.id ASC
                                     LIMIT ${limit} OFFSET ${offset}`);

    const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                        SELECT users.id
                                        FROM users 
                                        JOIN company ON users.company_id = company.id 
                                        JOIN employees ON users.id = employees.user_id
                                        WHERE company.name = '${createUser.company}'
                                        ) AS subquery;`);
    return {
      users: users.rows,
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
      users: users.rows,
      rowCount: rowCount.rows[0].count,
      message: "User successfully retrived",
      success: true,
    };
  } else {
    throw new Error("Invalid User.");
  }
};

module.exports = {
  createUser,
  pagination,
};
