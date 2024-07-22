
const { handleValidationErrors, createTaskValidation, updateTaskValidation } = require('../validates');
const { HTTP_STATUS } = require('../constants');
const express = require('express');
const { sendResponse } = require('../utilities');
const taskService = require('../services/task');

const tasks = express.Router();

tasks.get('/', async (req, res) => {
    const tasks = await taskService.getAllTasks();
    return sendResponse(res, HTTP_STATUS.OK, { tasks });
});

tasks.put('/', updateTaskValidation, handleValidationErrors, async (req, res) => {
    const task = await taskService.getTaskById(req.body.id);
    if (!task) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, { error: 'Task not found' });
    }

   const newTask = await taskService.updateTask(req.body);

    sendResponse(res, HTTP_STATUS.OK, { newTask });
});

tasks.post('/', createTaskValidation, handleValidationErrors, async (req, res) => {
    const task = await taskService.createTask(req.body);
    return sendResponse(res, HTTP_STATUS.CREATED, { task });
});

tasks.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 0);
    const task = await taskService.getTaskById(id);
    if (!task) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, { error: 'Task not found' });
    }
    await taskService.deleteTask(id);
    return sendResponse(res, HTTP_STATUS.OK, { task });
});

module.exports = tasks;
