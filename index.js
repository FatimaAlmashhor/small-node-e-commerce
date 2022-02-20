const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/dist', express.static('dist'));

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', { title: 'home' })

})
app.use('/products', require('./routers/products'))
app.use('*', (req, res) => {
    res.render('notFound', { title: 'Not Found' })

})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    try {
        console.log('seccessfully connected al port  : 5000');
    }
    catch (e) {
        console.error(e)
    }
})