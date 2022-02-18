const router = require("express").Router();

//get the products
router.get('/', async (req, res) => {
    let products = []
    await window.fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(console.log(products));
    console.log('here the products ');
    res.render('products', { products: products })
})

module.exports = router;