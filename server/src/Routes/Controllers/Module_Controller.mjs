import db from "../../Database/DB_Connect.mjs";

const allModule = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM module");
    return res.json({ success: true, listall: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};


const addModule = async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO module (title, description, information) VALUES ($1, $2, $3)",
      [req.body.title, req.body.description, req.body.information]
    );
    if (result.rowCount === 1) {
      return res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Database error" });
  }
};


const getModuleId = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM module WHERE id = $1", [req.body.id]);
    if (result.rows.length > 0) {
      return res.json({ success: true, listId: result.rows });
    } else {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Database error" });
  }
};


const editModule = async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE module SET title = $1, description = $2, information = $3 WHERE id = $4",
      [req.body.title, req.body.description, req.body.information, req.body.ids]
    );

    if (result.rowCount === 1) {
      return res.json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: "Article not found or no changes made" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Database error" });
  }
};


const addQuestion = async (req, res) => {
  const { module_title, questions } = req.body;
  try {

    for (const question of questions) {
      const { question_text, option_a, option_b, option_c, option_d, correct_option } = question;

      await db.query(
        `
            INSERT INTO questions (module_title, question_text, option_a, option_b, option_c, option_d, correct_option)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
          `,
        [module_title, question_text, option_a, option_b, option_c, option_d, correct_option]
      );
    }

    res.status(201).json({ message: 'Questions created successfully' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Error adding question', error });
  }
};

const deleteModule = async(req, res)=>{
  const {id} = req.params
  console.log(id)
  await db.query("DELETE FROM module WHERE id = $1", [id])
  res.status(200)
}

const allQuestion = async (req, res) => {
  const title = req.query.title; // Extract the title from the query string

  try {
    const result = await db.query(`
      SELECT 
        m.title AS module_title, 
        q.id AS question_id, 
        q.question_text, 
        q.option_a, 
        q.option_b, 
        q.option_c, 
        q.option_d, 
        q.correct_option, 
        q.created_at, 
        q.updated_at
      FROM module m
      INNER JOIN questions q ON m.title = q.module_title
      WHERE m.title = $1;
    `, [title]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ message: 'Error retrieving questions', error });
  }
};




export { allModule, addModule, getModuleId, editModule, addQuestion, allQuestion ,deleteModule};
