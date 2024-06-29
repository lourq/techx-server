import { Router } from 'express';
import { getProductStatistics , getProductReview , removingReviewById , adminChecked} from '../../controllers/api/activityController.js'

const router = Router();

router.post('/RemovingReviewById', removingReviewById);
router.post('/AdminChecked', adminChecked);

router.get('/GetProductStatistics', getProductStatistics);
router.get('/GetProductReview', getProductReview);

export default router;