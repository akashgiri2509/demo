const categoriesModel = require('../models/categoriesmodel');

async function getAllCategories(req, res) {
    try {
        const categories = await categoriesModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error Fetching Categories:', error);
        res.status(500).send('Error fetching categories');
    }
}

async function getCategoriesById(req, res) {
    const { id } = req.params;
    try {
        const category = await categoriesModel.getCategoriesById(id);
        if (!category) {
            return res.status(404).send('Role not Found');
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching Category:', error);
        res.status(500).send('Error fetching Category');
    }
}

async function createCategories(req, res) {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    try {
        const newCategory = await categoriesModel.createCategories(name, description);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating Categories', error);
        res.status(500).send('Error creating Categories');
    }
}

async function updateCategories(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    try {
        const affectedRows = await categoriesModel.updateCategories(id, { name, description })
        if (affectedRows === 0) {
            return res.status(404).send('Categories not found');
        }
        res.json({ name, description });
    } catch (error) {
        console.error('Error updating categories:', error);
        res.status(500).send('Error updating categories');
    }
}

async function deleteCategories(req, res) {
    const { id } = req.params;
    try {
        const affectedRows = await categoriesModel.deleteCategories(id);
        if (affectedRows === 0) {
            return res.status(404).send('Categories not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Category:', error);
        res.status(500).send('Error deleting Category');
    }
}

module.exports = {
    getAllCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
}
