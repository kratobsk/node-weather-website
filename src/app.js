const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { inspect } = require('util')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Suriya K'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Suriya K'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Suriya K',
        desc: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }

    geocode(req.query.address, (error, {lat, long, location}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast({lat, long}, (error, {temperature, feelslike}) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                address: req.query.address,
                forecast: 'It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out',
                location: 'Place: ' + location + '(Lat: ' + lat + ' Long: ' + long +')'
            })
        })
    })
})

// put query string after URL by using key = 'search'
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Suriya K',
        desc: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
