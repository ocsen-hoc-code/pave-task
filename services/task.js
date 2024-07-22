
const models = require('../models');

const createTask = async (task) => {
    const newTask = await models.Task.create(task);
    return newTask;
};

const updateTask = async (task) => {
    await models.Task.update(task, {
        where: { id: task.id },
        returning: true
    });
    const newTask = await models.Task.findByPk(task.id); 
    return newTask;
}; 

const getAllTasks = async () => {
    const tasks = await models.Task.findAll();
    return tasks;
};

const getTaskById = async (id) => {
    const task = await models.Task.findByPk(id);
    return task;
};

const deleteTask = async (id) => {
    const task = await models.Task.destroy({
        where: { id },
    });
    return task;
};

module.exports = {
    createTask,
    updateTask,
    getAllTasks,
    getTaskById,
    deleteTask,
}