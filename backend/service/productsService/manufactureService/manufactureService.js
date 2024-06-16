const bycrpt = require("bcryptjs");
const db = require("../../../config/postgres");

const createService = async (body, createdBy) => {
  if (!body.name || !body.description) {
    throw new Error("required fields are missing!");
  }
  const manufactureName = body.name.toLowerCase().trim();
  const manufactureDescription = body.description.toLowerCase().trim();

  const manufacture = await db.query(
    `SELECT manufacture.id FROM manufacture JOIN company ON manufacture.company_id = company.id WHERE company.name = '${createdBy.company}' AND manufacture.name = '${manufactureName}' AND manufacture.is_delete = false AND company.is_delete = false`
  );
  if (manufacture.rowCount) {
    throw new Error("manufacture already exist.");
  }



  const company = await db.query(
    `SELECT ID FROM company where name = '${createdBy.company}' AND is_delete = false`
  );


   await db.query(
    `INSERT INTO manufacture (name,description,company_id,created_user,image)
    VALUES (
        '${manufactureName}',
        '${manufactureDescription}',
        '${company.rows[0].id}',
        '${createdBy.id}',
        '${body.photo}'
    )`
  );

  return {
    // user: user.rows[0],
    message: "Manufacture successfully created.",
    success: true,
  };
};

const detailsService = async (params, createdBy) => {
  const { id } = params;

  const manufacture = await db.query(
    `SELECT manufacture.name as name , manufacture.description as description , manufacture.image as file
    FROM
    manufacture
    JOIN 
    company ON manufacture.company_id = company.id
    WHERE company.name = '${createdBy.company}' AND manufacture.id = '${id}'`
  );

  if (!manufacture.rowCount) {
    throw new Error("Manufacture does not exist.");
  }

  return manufacture.rows[0];
};

const editService = async (body, createdBy, params) => {
  const { id } = params;

  if (!body.name || !body.description) {
    throw new Error("required fields are missing!");
  }

  const manufactureName = body.name.toLowerCase().trim();
  const manufactureDescription = body.description.toLowerCase().trim();

  
  const manufacture = await db.query(
    `SELECT * FROM manufacture
    JOIN company ON manufacture.company_id = company.id
    WHERE 
    company.name = '${createdBy.company}'`
  );
  

  if (!manufacture.rowCount) {
    throw new Error("SubCategory does not exist.");
  }


  const manufactureExist = await db.query(
    `SELECT manufacture.id FROM manufacture JOIN company ON manufacture.company_id = company.id WHERE company.name = '${createdBy.company}' AND manufacture.name = '${manufactureName}'`
  );
  if (!manufactureExist.rowCount) {
    throw new Error("Category does not exist.");
  }
  

  await db.query(
    `UPDATE manufacture SET name = '${manufactureName}' , description = '${manufactureDescription}' , image = '${body.photo}' WHERE id = '${id}'`
  );

  return {
    message: "Manufacture successfully updated.",
    success: true,
  };
};

const deleteService = async (params, createdBy) => {
  const { id } = params;

  const manufactureExist = await db.query(
    `SELECT * FROM manufacture
     JOIN company ON manufacture.company_id = company.id
     WHERE 
     company.name = '${createdBy.company}' 
     AND
     manufacture.id = '${id}'`
  );

  if(!manufactureExist.rowCount){
    throw new Error("SubCategory does not exist.");
  }

  await db.query(`UPDATE manufacture
                        SET
                        is_delete = true
                        WHERE 
                        id = ${id}`);

  return {
    message: "Manufacture sucessfully deleted",
    success: true,
  };
};

const searchService = async (query, createdBy) => {
  const { limit, offset, query: queryParam } = query;

  if (!limit || !offset || !queryParam) {
    throw new Error("Missing required params");
  }

  const manufacture =
    await db.query(`SELECT manufacture.id ,manufacture.name , description , manufacture.image 
                FROM manufacture 
                JOIN company ON company.id = manufacture.company_id
                WHERE company.name = '${createdBy.company}'
                AND 
                manufacture.is_delete = false
            AND( 
                manufacture.name LIKE '%${queryParam}%' OR manufacture.description LIKE '%${queryParam}%') 
                ORDER BY manufacture.id ASC
                LIMIT ${limit} OFFSET ${offset}
  `);
  
  const rowCount = await db.query(`SELECT COUNT(*) 
                                        FROM (
                                            SELECT manufacture.name ,manufacture.description 
                                            FROM manufacture 
                                            JOIN company ON company.id = manufacture.company_id
                                            WHERE company.name = '${createdBy.company}'
                                            AND 
                                            manufacture.is_delete = false
                                            AND( 
                                            manufacture.name LIKE '%${queryParam}%' OR manufacture.description LIKE '%${queryParam}%') 
                                        ) AS subquery;`);

  return {
    rows: manufacture.rows,
    rowCount: rowCount.rows[0].count,
    message: "Manufacture successfully retrived",
    success: true,
  };
};

const pagination = async (query, createdBy) => {
  const { limit, offset } = query;

  if (!limit || !offset) {
    throw new Error("Missing required params");
  }

  const manufacture =
    await db.query(`SELECT manufacture.id ,manufacture.name , description , manufacture.image 
                    FROM manufacture 
                    JOIN company ON company.id = manufacture.company_id
                    WHERE company.name = '${createdBy.company}'
                    AND 
                    manufacture.is_delete = false
                    ORDER BY manufacture.id ASC
                    LIMIT ${limit} OFFSET ${offset}`
                  );
  const rowCount = await db.query(`SELECT COUNT(*) 
                                    FROM (
                                        SELECT manufacture.id
                                        FROM manufacture 
                                        JOIN company ON company.id = manufacture.company_id
                                        WHERE company.name = '${createdBy.company}'
                                        AND 
                                        manufacture.is_delete = false
                                    ) AS subquery`
                                  );


  return {
    rows: manufacture.rows,
    rowCount: rowCount.rows[0].count,
    message: "Manufacture successfully retrived",
    success: true,
  };
};


const listService = async (body,createdBy) =>{
    const manufacture = await db.query(
      `SELECT manufacture.name FROM manufacture JOIN company ON manufacture.company_id = company.id WHERE company.name = '${createdBy.company}' AND manufacture.is_delete = false`
    );
  
    const manufactureList = [];
  
    manufacture.rows.map((val)=>{
        manufactureList.push(val.name);
    })
  
    return {
      rows:manufactureList
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
 