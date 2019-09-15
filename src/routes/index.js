const router = require ('express').Router();

module.exports = router;

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});
