const express = require('express');
const { getCartItems, addItemToCart, deleteCartItem } = require('../controllers/cartController');

const router = express.Router();

router.get('/', getCartItems)
router.get('/cart', getCartItems);
router.post('/cart', addItemToCart);
router.delete('/cart/:id', deleteCartItem);

module.exports = router;