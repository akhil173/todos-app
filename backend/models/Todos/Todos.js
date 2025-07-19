const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false}
}, {timestamp: true});

const Todos = mongoose.model('Todos', TodosSchema);

module.exports = Todos;