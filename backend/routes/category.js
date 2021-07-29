import express from 'express';
import { create, list, categoryById, read, update, remove, photo } from '../controller/category'
const router = express.Router();

router.post('/category', create);
router.get('/category', list);
router.get('/category/:categoryId', read);
router.put('/category/:categoryId', update);
router.delete('/category/:categoryId', remove);
router.param('categoryId', categoryById);
router.get('/category/photo/:categoryId', photo);


module.exports = router;