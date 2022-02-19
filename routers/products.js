const router = require("express").Router();
const fetch = require("node-fetch");

//get the products
router.get('/', async (req, res) => {
    let products, categories = []
    await fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(result => products = result)
        .catch(err => {
            console.error({ err });
        });
    await fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(result => categories = result)
        .catch(err => {
            console.error({ err });
        });

    res.render('products', {
        products: products?.products,
        categories,
        title: 'Products'
    })
})
router.get('/:product_id', async (req, res) => {
    let product = {}
    await fetch(`https://dummyjson.com/products/${req.params.product_id}`)
        .then(res => res.json())
        .then(result => product = result)
        .catch(err => {
            console.error({ err });
        });

    res.render('productDetail', {
        product: product,
        title: 'Product'
    })
})

module.exports = router;