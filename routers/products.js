const router = require("express").Router();
const fetch = require("node-fetch");
const ejsLint = require('ejs-lint');
const route = require('url')
//get the products


router.get('/', async (req, res) => {
    let products, categories = []
    try {
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
    }
    catch (e) {
        console.log(e);
    }

    ejsLint('products', { async: true })

})
router.get('/category/:cat', async (req, res) => {
    try {
        let result = route.parse(req.url).query?.q;
        let peoducts = [];
        await fetch(`https://dummyjson.com/products/category/${req.params.cat}`)
            .then(res => res.json())
            .then(result => peoducts = result);
        res.render('products', {
            products: peoducts?.products,
            categories: [],
            title: 'Products'
        })
    } catch (e) {
        console.log(e);
    }

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