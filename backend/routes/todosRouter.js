const express = require('express');
const Todos = require('../models/Todos/Todos');
const { SUCCESSFUL_RETRIEVAL, GENERIC_ERROR, SUCCESSFUL_UPDATE, SUCCESSFUL_ADDITION, ERROR_DATA_NOT_FOUND, SUCCESSFUL_DELETE } = require('../config/responseCodes');
const zod = require('zod');

const TodosSchema = zod.object({
    title: zod.string(),
    description: zod.string()
});

const TodosCompletedSchema = zod.object({
    completed: zod.boolean()
});

const router = express.Router();

/**
* GET handler to retrieve all todos
*/
router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find();
        return res.json({message: SUCCESSFUL_RETRIEVAL.message, todos: todos});
    }
    catch {
        return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
    }
});

/**
 * POST handler to add new todo
 * body : 
 * {
 *      title: string;
 *      description: string;
 * }
 */
router.post('/', async (req, res) => {
    const data = TodosSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
    }
    try {
        const todosInstance = new Todos({
            title: data.data.title,
            description: data.data.description
        });
        await todosInstance.save();
        return res.json({message: SUCCESSFUL_ADDITION.message, todo: todosInstance})
    }
    catch (e) {
        return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
        console.log(e);
    }
});

/**
 * PUT handler to update todo to completed.
 * params : id of the todo
 * body :
 * {
 *      completed: boolean
 * }
 */
router.put('/:id', async (req, res) => {
    try {
        const data = TodosCompletedSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
        }
        const { id } = req.params;
        const retrievedTodo = await Todos.findByIdAndUpdate(id, data.data, {new: true});
        if (!retrievedTodo) {
            return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
        }
        return res.json({message: SUCCESSFUL_UPDATE.message, todo: retrievedTodo});
    } catch (e) {
        console.log(e);
        return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
    }
})

/**
 * DELETE handler to handle deletion of todo
 * param : id
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Todos.findByIdAndDelete(id);
        if (!deleted) {
            res.status(ERROR_DATA_NOT_FOUND.code).json({message: ERROR_DATA_NOT_FOUND.error});
        }
        return res.json({message: SUCCESSFUL_DELETE.message, todo: deleted});
    }
    catch (e) {
        return res.status(GENERIC_ERROR.code).json({message: GENERIC_ERROR.error});
    }
})

module.exports = router;