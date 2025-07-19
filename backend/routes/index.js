const express = require('express');

const router = express.Router();

router.use('/todos', require('./todosRouter'));

module.exports = router;