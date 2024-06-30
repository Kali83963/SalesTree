const bycrpt = require('bcryptjs');
const db = require('../../config/postgres');
const validatePassword = require('../../utlis/passwordValidator');
const jwt = require('jsonwebtoken');
const { emailClient, mailOptions } = require('../emailService/emailService');
const { welcomeEmail, resetPasswordLink } = require('../../emailTemplate/emailTemplate');

const registerUser = async (body,res)=>{
    
    if(!body.name || !body.email || !body.company || !body.password){
        throw new Error("required fields are missing!");
    }
    const oldCompany = await db.query(`SELECT * FROM company WHERE name = '${body.company}'`);
    if(oldCompany.rowCount){
        throw new Error("Company Already Exist.");            
    }



    const userAvailable = await db.query(`SELECT * FROM users where email = '${body.email}' LIMIT 1`);
    if(userAvailable.rowCount){
        throw new Error("Email Already Exist.");
    }


    const passwordNotValid = validatePassword(body.password);
    if(passwordNotValid){
        throw new Error(passwordNotValid);
    }

    const password = await bycrpt.hash(body.password,10);
    // Insert Company 

    const newCompany = await db.query(`INSERT INTO company (name) VALUES ('${body.company}') RETURNING ID`);

    const newUser = await db.query(`INSERT INTO users (name, email, company_id,currency, timezone, password)
                    VALUES (
                       '${body.name}',
                       '${body.email}', 
                        ${newCompany.rows[0].id},
                        ${body.currency ? `'${body.currency}'` : null},
                        ${body.timezone ? `'${body.timezone}'` : null},
                        '${password}'
                        )
                    RETURNING ID`);



    const user = await db.query(`SELECT users.id ,users.name, users.email, users.currency, users.timezone,
                        company.name AS company_name FROM users JOIN company ON users.company_id = company.id 
                        WHERE users.id = ${newUser.rows[0].id}`);


    const accessToken = jwt.sign({
        user: {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            company:user.rows[0].company_name
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    mailOptions['to'] = user.rows[0].email;
    mailOptions['subject'] = "Welcome To SalesTree"
    mailOptions['html'] = welcomeEmail({name:user.rows[0].name})

    emailClient.sendMail(mailOptions,(error, info) => {
        if (error) {
            console.log(error);
            throw new Error('Failed to send Welcome email.');
        }
    });
    
    return {
        jwt: accessToken,
        user: user.rows[0]
    }
}

const loginUser = async (body, res) => {
    const { email, password } = body;
    if (!email || !password) {
        throw new Error("Required fields are missing!");
    }

    // Use parameterized query to prevent SQL injection
    const user = await db.query(`SELECT users.id, users.name, users.email, users.currency, users.timezone, company.name AS company_name, users.password , users.profile_image
                                 FROM users
                                 JOIN company ON users.company_id = company.id
                                 WHERE users.email = $1 AND users.is_delete = false`, [email]);

    if (!user.rows.length) {
        throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bycrpt.compare(password, user.rows[0].password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
    }

    const employee =  await db.query(`SELECT * from employees where user_id = ${user.rows[0].id} and is_delete = false`)

    if(employee.rowCount && employee.rows[0].status === "inactive"){
        throw new Error("Your account is deactivated. Please contact the company admin.");
    }

    const accessToken = jwt.sign({
        user: {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            company:user.rows[0].company_name,
            role: !employee.rowCount ? "owner" : employee.rows[0].role,
            profile_image: user.rows[0].profile_image
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    return {
        jwt: accessToken,
        user: {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            company: user.rows[0].company_name,
            role: !employee.rowCount ? "owner" : employee.rows[0].role,
            timezone: user.rows[0].timezone,
            currency: user.rows[0].currency,
            profile_image: user.rows[0].profile_image
        }
    };


        
   
}

const forgotPassword = async (body, res) => {
    const {email} = body;
    if(!email){
        throw new Error("Email does not exist.")
    }

    const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    if(!user.rowCount){
        throw new Error("Invalid Email.");
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

    mailOptions['to'] = user.rows[0].email;
    mailOptions['subject'] = 'Reset Password';
    mailOptions['html'] = resetPasswordLink(token);

    emailClient.sendMail(mailOptions,(error, info) => {
        if (error) {
            console.log(error);
            throw new Error('Failed to send password reset email.');
        }
    });

    return { message:"Email Send Successfully." ,success:true };
}



const resetPassword = async (body,req) => {
    const { password } = body;
    const token = req.params.token;
    let user;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Invalid or expired token.');
        }
        user = decoded.userId;
    });

    if(!user){
        throw new Error('Invalid or expired token.');
    }
    const hashedPassword = await bycrpt.hash(password,10);

    await db.query(`UPDATE users
                SET password = '${hashedPassword}' 
                WHERE ID = '${user}';`)

    return { message: "Password successfully updated.", success:true };
}



module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}