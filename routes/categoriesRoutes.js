const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { randomUUID } = require('crypto');
const router = express.Router();

router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getCategoriesById);
router.post('/categories', categoriesController.createCategories);
router.put('/categories/:id', categoriesController.updateCategories);
router.delete('/categories/:id', categoriesController.deleteCategories);

module.exports = router;