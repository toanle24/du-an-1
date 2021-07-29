import express from 'express';
const router = express.Router();

import { userById, read, update } from '../controller/user';
import { requireSignin, isAdmin, isAuth } from "../controller/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});


router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;