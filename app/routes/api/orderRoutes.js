import { Router } from 'express';
import { getOrder , changeStatusOrder , markOrderVerification } from '../../controllers/api/orderController.js'

const router = Router();

router.post('/ChangeStatusOrder', changeStatusOrder);
router.post('/MarkOrderVerification' , markOrderVerification)

router.get('/GetOrder', getOrder);

export default router;