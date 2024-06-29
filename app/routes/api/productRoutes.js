// Description: This file contains the routes for the admin product.
import { Router } from 'express';
import { upload, addNewProductImg , addProduct , removeProductFromDB} from "../../controllers/api/productController.js"

const router = Router();

router.post('/AddNewProductImg', upload.array('image', 5), addNewProductImg);
router.post('/AddProduct', addProduct);
router.post('/RemoveProductFromDB', removeProductFromDB);

export default router;