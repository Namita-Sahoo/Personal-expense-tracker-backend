const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expense');
require('dotenv').config();
const pool = require('./db/config');


const app = express();


app.get("/ping-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");
    res.json({ success: true, time: rows[0].time });
  } catch (err) {
    console.error("Ping DB Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
