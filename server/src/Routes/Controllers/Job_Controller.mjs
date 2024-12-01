
import db from "../../Database/DB_Connect.mjs";

const create_job = async (req, res) => {
  const {
    publisher,
    name,
    phone,
    email,
    title,
    applicants,
    remote,
    experience,
    jobtype,
    salary,
    state,
    city,
    street,
    description,
    date,
  } = req.body;


  if (
    !publisher ||
    !name ||
    !email ||
    !title ||
    !state ||
    !experience||
    !city ||
    !street ||
    !description ||
    !date
  ) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  if (phone && (!/^\d{10,15}$/.test(phone) || phone.length > 15)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }


  if (applicants && isNaN(Number(applicants))) {
    return res.status(400).json({ message: "Salary must be a valid number." });
  }

  try {
    await db.query(
      `INSERT INTO jobs 
       (publisher, name, phone, email, title, applicants, remote, jobtype, salary, state, city, street, description, date, experience) 
       VALUES 
       ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        publisher,
        name,
        phone,
        email,
        title,
        applicants || 0, 
        remote || false, 
        jobtype || false, 
        salary || null,
        state,
        city,
        street,
        description,
        date,
        experience
      ]
    );

    return res.status(201).json({ message: "Job created successfully." });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ message: "An error occurred while creating the job." });
  }
};



const display_job = async (req, res) => {
  const { keyword, location, experience, salary } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];
  let paramIndex = 1; 

  if (keyword) {
    query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    params.push(`%${keyword}%`);
    paramIndex++;
  }
  if (location) {
    query += ` AND city = $${paramIndex}`;
    params.push(location);
    paramIndex++;
  }
  if (experience) {
    query += ` AND experience = $${paramIndex}`;
    params.push(experience);
    paramIndex++;
  }
  if (salary) {
    const numericSalary = parseInt(salary.replace('k+', '000'), 10); // Convert '10k+' to 10000
    query += ` AND salary >= $${paramIndex}`;
    params.push(numericSalary);
    paramIndex++;
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const upload_appointment = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const jobId = req.body.jobId;
  const result = await db.query('SELECT * FROM jobs WHERE id = $1', [jobId]);

  if (result.rows.length === 0) {
    return res.status(404).send('Job not found.');
  }

  const currentApplicants = result.rows[0].applicants;

  await db.query('UPDATE jobs SET applicants = $1 WHERE id = $2', [currentApplicants + 1, jobId]);

  res.status(200).send('File uploaded and applicants count updated.');
};



export { create_job, display_job, upload_appointment };
