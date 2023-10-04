const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode= require('./utils/geocode');
const forecast= require('./utils/forecast');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shalavya Agarwal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shalavya Agarwal',
        d:'Made as a learning project for backend development as a codealong with Andrew Mead.',
        desc:'Passionate about coding and learning new things. Made this site using Node.js, Express.js, HTML, CSS and Javascript. Also used Handlebars.js for templating. Used Mapbox API for geocoding and Weatherstack API for weather data.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'To get the weather of a place navigate to weather page and enter the name of the place in the search bar and click on the search button.',
        title: 'Help',
        name: 'Shalavya Agarwal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geoCode(req.query.address, (error, data)=>{
        if(error){
            console.log(error);
            return res.send({ error });
        }
        else{
            forecast(data.latitude, data.longitude, (error, weatherData)=>{
                if(error){
                    return res.send({ error });
                }
                else{ 
                    res.send(weatherData);
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shalavya Agarwal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shalavya Agarwal',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})