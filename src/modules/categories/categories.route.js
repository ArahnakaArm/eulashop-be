const express = require('express');
const router = express.Router();
const validate = require('../../service/validate');
const getCategoriesCtrl = require('../categories/getCategories.ctrl');
const putCategoriesCtrl = require('../categories/putCategories.ctrl');
const postCategoriesCtrl = require('../categories/postCategories.ctrl');
const deleteCategoriesCtrl = require('../categories/deleteCategorie.ctrl');

router.get('/', validate.auth, getCategoriesCtrl.getCategories);
router.get('/:id', validate.auth, getCategoriesCtrl.getCategoryByid);

router.post('/', validate.auth, postCategoriesCtrl.postCategory);

router.put('/:id', validate.auth, putCategoriesCtrl.putCategory);

router.delete('/:id', validate.auth, deleteCategoriesCtrl.deleteCategory);

module.exports = router;
