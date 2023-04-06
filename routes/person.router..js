const router = require('express').Router();
const { getAll, createOne, getOne, updateById } = require('../controllers/person.controller');
const { validate } = require('../middlewares/validate');
const validation = require('../validations/user.validator');

router.get('/', getAll);
router.post('/', validation.create(), validate, createOne);
router.get('/:id', validation.findById(), validate, getOne);
router.put('/:id', validation.updateById(),validate,updateById);

module.exports = router;