import express from 'express';
import { list, create,contactById, remove } from '../controller/contact';

const router = express.Router();


// router.get("/products/related/:productId", listRelated);
// router.get("/products/categories", listCategories);
// router.post("/products/search", listBySearch);

router.post('/contact', create);
router.get('/contact', list);
router.delete('/contact/:contactId', remove);
router.param('contactId', contactById);

module.exports = router;