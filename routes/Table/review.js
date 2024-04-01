const { Router } = require('express');
const router = Router();

const {      getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview } = require('../../controllers/Table/review.controller');

router.get('/review', getReviews);
router.get('/review/:id', getReviewById);
router.post('/review', createReview);
router.delete('/review/:id', deleteReview);
//router.put('/review/:id', updateReview);

module.exports = router;
