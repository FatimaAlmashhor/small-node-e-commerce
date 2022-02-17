const router = require("express").Router();


//get the products
router.get('/products', (req, res) => {
    res.send('products')
})

module.exports = router;