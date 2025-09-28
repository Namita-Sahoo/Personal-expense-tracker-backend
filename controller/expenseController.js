const pool = require('../db/config'); // mysql2/promise pool

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM expenses");
    res.json(rows);
  } catch (err) {
    console.error("DB Error in getAllExpenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Add expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, date, category, notes } = req.body;
    const [result] = await pool.query(
      "INSERT INTO expenses (title, amount, date, category, notes) VALUES (?, ?, ?, ?, ?)",
      [title, amount, date, category, notes]
    );
    res.status(201).json({
      message: "Expense added successfully!",
      id: result.insertId
    });
  } catch (err) {
    console.error("DB Error in addExpense:", err);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM expenses WHERE id = ?", [id]);
    res.json(rows[0] || {});
  } catch (err) {
    console.error("DB Error in getExpenseById:", err);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM expenses WHERE id = ?", [id]);
    res.json({ message: "Expense deleted!" });
  } catch (err) {
    console.error("DB Error in deleteExpense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

// Get monthly summary
exports.getMonthlySummary = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total
      FROM expenses
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("DB Error in getMonthlySummary:", err);
    res.status(500).json({ error: "Failed to fetch monthly summary" });
  }
};

// Category summary for pie chart
exports.getCategorySummary = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT category, SUM(amount) AS total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("DB Error in getCategorySummary:", err);
    res.status(500).json({ error: "Failed to fetch category summary" });
  }
};
