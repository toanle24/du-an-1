import express from "express";
import {  update,  list,  create, listRelated, listCategories, listBySearch, productById, read, remove, photo,productByCategory
} from "../controller/product";

const router = express.Router();

router.get("/products/related/:productId", listRelated);
// router.get("/products/category", listCategories);
// router.post("/products/search", listBySearch);

router.post("/products", create);
router.get("/products", list);
router.get("/products/:productId", read);
router.put("/products/:productId", update);
router.delete("/products/:productId", remove);
router.param("productId", productById);
router.get("/products/photo/:productId", photo);
router.param("productByCategory", productByCategory);

module.exports = router;
