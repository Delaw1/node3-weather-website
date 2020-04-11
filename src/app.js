const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Lawrence"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Lawrence",
        msg: "Get help now"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About",
        name: "Lawrence"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Address required"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "Help",
        msg: "Page not found",
        name: "Lawrence"
    })
})
app.get('*', (req, res) => {
    res.render("404", {
        title: "404 Error",
        msg: "Help article not found not found",
        name: "Lawrence"
    })
})

app.listen(3000, () => {
    console.log("Port 3000 started")
})