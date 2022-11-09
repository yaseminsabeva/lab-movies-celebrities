const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

// all your routes here

router.get('/celebrities',async(req, res) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {allCelebrities})

    } catch (error) {
        console.log(error)
    }
})

router.get('/celebrities/create', (req, res) => {
    try {
        res.render('celebrities/new-celebrity')
    } catch (error) {
        console.log(error)
    }
})

router.post('/celebrities/create', async(req,res) => {
    const { name, occupation, catchPhrase } = req.body
    try {
        await Celebrity.create({name,occupation,catchPhrase})
        res.redirect('/celebrities')
    } catch (error) {
        res.render('/celebrities/new-celebrity')
    }
})


// router.get('/celebrities/:id')


module.exports = router;