const express = require('express');
const router = express.Router();
const { getAllExpenses, addExpense, getExpenseById, deleteExpense ,getMonthlySummary ,getCategorySummary} = require('../controller/expenseController');

router.get('/monthly-summary', getMonthlySummary);
router.get('/category-summary',getCategorySummary);
router.get('/:id', getExpenseById);
router.get('/', getAllExpenses);
router.post('/', addExpense);

router.delete('/:id', deleteExpense);

module.exports = router;
