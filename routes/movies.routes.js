const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// all your routes here

router.get('/movies', async(req,res) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', { allMovies })
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/create', async(req,res) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('movies/new-movie', { allCelebrities })
    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/create', async (req, res) => {
    const { title, genre, plot, cast } = req.body
    try {
        await Movie.create({title,genre,plot,cast})
        res.redirect('/movies')
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const foundMovie = await Movie.findById(id).populate('cast')
        console.log(foundMovie)
        res.render('movies/movie-details', { foundMovie })
    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/:id/delete', async (req, res) => {
    try {
        const { id } = req.params
        await Movie.findByIdAndDelete(id)
        res.redirect('/movies')
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/:id/edit', async (req, res) => {
    try {
        const { id } = req.params
        const editMovie = await Movie.findById(id)
        const allCelebs = await Celebrity.find()
        res.render('movies/edit-movie', { editMovie, allCelebs })
    } catch (error) {
        console.log(error)
    }
})

// router.post('/movies/:id/edit', async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.log(error)
//     }
// })

router.post('/movies/:id', async (req, res) => {
    try {
        const { title, genre, plot, cast } = req.body
        const { id } = req.params
        await Movie.findByIdAndUpdate(id, {  title, genre, plot, cast })
        res.redirect(`/movies/${id}`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;