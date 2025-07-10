const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expense');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
