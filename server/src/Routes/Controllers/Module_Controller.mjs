import db from "../../Database/DB_Connect.mjs";

const allPost = async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM posts");
      return res.json({ success: true, listall: result.rows });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Error fetching posts" });
    }
  };
  

const addArticle = async (req, res) => {
    try {
      const result = await db.query(
        "INSERT INTO posts (title, description, information) VALUES ($1, $2, $3)",
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


const getPostId = async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
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


const editArticle = async (req, res) => {
    try {
      const result = await db.query(
        "UPDATE posts SET title = $1, description = $2, information = $3 WHERE id = $4",
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
  

export { allPost, addArticle, getPostId, editArticle };
