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


const user_score = async (req, res) => {
  const { user_id, module_id,  completed, score, passed, attempt_number, time_spent, feedback, prefect_score } = req.body;

  if (!user_id || !module_id || score === undefined || passed === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingQuiz = await db.query(
      'SELECT * FROM module_scores WHERE user_id = $1 AND module_id = $2',
      [user_id, module_id]
    );

    if (existingQuiz.rows.length > 0) {
      await db.query(
        `UPDATE module_scores 
        SET score = $1, passed = $2, attempt_number = $3, time_spent = $4, feedback = $5 , completed = $6, prefect_score =$7
        WHERE user_id = $8 AND module_id = $9`,
        [score, passed, attempt_number, time_spent, feedback, completed, prefect_score ,user_id, module_id]
      );
    } else {
      await db.query(
        `INSERT INTO module_scores (user_id, module_id, score, passed, attempt_number, time_spent, feedback, completed, prefect_score) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [user_id, module_id, score, passed, attempt_number, time_spent, feedback, completed, prefect_score]
      );
    }
    res.status(200).json({ message: 'Quiz progress saved successfully!' });
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    res.status(500).json({ error: 'Failed to save quiz progress' });
  }
};

const getUser_score = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid id parameter' });
  }

  try {
      const response = await db.query("SELECT * FROM module_scores WHERE user_id = $1", [id]);

      if (response.rows.length === 0) {
          return res.status(404).json({ message: 'No scores found for this user' });
      }

      res.status(200).json(response.rows);
  } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export { allModule, addModule, getModuleId, editModule, addQuestion, allQuestion ,deleteModule, user_score, getUser_score};
