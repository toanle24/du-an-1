import express from 'express';
import { list, create,newsById, remove , photo} from '../controller/news';

const router = express.Router();


router.post('/news', create);
router.get('/news', list);
router.delete('/news/:newsId', remove);
router.get("/news/photo/:newsId", photo);
router.param('newsId', newsById);

module.exports = router;