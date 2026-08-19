const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/status", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      ok: true,
      message: "QuizMaster działa i jest połączony z bazą!"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: "Nie udało się połączyć z bazą danych."
    });
  }
});

app.get("/api/quizzes/:code", async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();

    const quizResult = await pool.query(
      "SELECT * FROM quizzes WHERE code = $1",
      [code]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({
        error: "Nie znaleziono quizu."
      });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await pool.query(
      "SELECT * FROM questions WHERE quiz_id = $1 ORDER BY id",
      [quiz.id]
    );

    res.json({
      quiz,
      questions: questionsResult.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Błąd serwera."
    });
  }
});

app.listen(PORT, () => {
  console.log(`QuizMaster działa na porcie ${PORT}`);
});
