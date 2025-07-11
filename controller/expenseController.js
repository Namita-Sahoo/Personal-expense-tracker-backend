const db =require('../db/config');

exports.getAllExpenses =(req,res) =>{
    db.query("select * from expenses" ,(err ,result) =>{
        if(err) throw err ;
        res.json(result);
    });
};

exports.addExpense =(req ,res) =>{
    const {title ,amount ,date ,category ,notes} =req.body;
    db.query("Insert into expenses (title ,amount ,date ,category ,notes) values (? , ?, ?, ?, ?)",
        [title, amount ,date ,category ,notes],
        (err, result) =>{
            if(err) throw err;
            res.json({message : 'expense added sucessfully !',id :result.insertId});
        }
    );
};

exports.getExpenseById =(req,res) =>{
    const id =req.params.id ;
    db.query('select * from expenses where id =?',[id] ,(err,result) =>{
         if(err) throw err ;
         res.json(result[0]);
    });
};

exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  db.query('delete from expenses where id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Expense deleted!' });
  });
};

// Get monthly summary
exports.getMonthlySummary = (req, res) => {
  db.query(
    `SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total 
     FROM expenses GROUP BY month ORDER BY month ASC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch monthly summary' });
      // console.log(rows);
      res.json(rows);
    }
  );
};

// Category summary for pie chart
exports.getCategorySummary = (req, res) => {
  db.query(
    `SELECT category, SUM(amount) AS total 
     FROM expenses GROUP BY category ORDER BY total DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch category summary' });
      res.json(rows);
    }
  );
};