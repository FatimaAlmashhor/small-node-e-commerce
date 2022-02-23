const router = require("express").Router();
const fetch = require("node-fetch");
const ejsLint = require('ejs-lint');
const route = require('url')

//get the products

let categories, products = []

router.get(['/', '/home'], async (req, res) => {
    try {
        await fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(result => {
                products = result?.products
            })
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
            products,
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
        let newPeoducts = await products.filter(element => {
            if (element.category == req.params.cat)
                return element
        });
        // await fetch(`https://dummyjson.com/products/category/${req.params.cat}`)
        //     .then(res => res.json())
        //     .then(result => peoducts = result);
        res.render('products', {
            products: newPeoducts,
            categories,
            title: 'Products'
        })
    } catch (e) {
        console.log(e);
    }

})
router.post('/search', async (req, res) => {
    try {
        let newPeoducts = await products.filter(element => {
            if (element.title.toLowerCase().includes(req.body.search.toLowerCase()))
                return element
        });
        // let result = route.parse(req.url).query?.q;
        // await fetch(`https://dummyjson.com/products/search?q=${req.params.cat}`)
        //     .then(res => res.json())
        //     .then(result => peoducts = result);
        res.render('products', {
            products: newPeoducts,
            categories,
            title: 'Products'
        })
    } catch (e) {
        console.log(e);
    }

})
router.get('/:product_id', async (req, res) => {
    try {
        let product = products.filter(element => {
            if (element.id == req.params.product_id)
                return element
        })
        console.log(product);
        // await fetch(`https://dummyjson.com/products/${req.params.product_id}`)
        //     .then(res => res.json())
        //     .then(result => product = result)
        //     .catch(err => {
        //         console.error({ err });
        //     });
        if (product !== undefined && product.length !== 0) {
            res.render('productDetail', {
                product: product[0],
                title: 'Product',
            })
        }
        else {
            res.render('notFound', {
                title: 'Not found'
            })
        }

    }
    catch (error) {
        console.log('error', error);
    }
})

module.exports = router;