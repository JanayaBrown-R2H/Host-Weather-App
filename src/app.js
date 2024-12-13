// loading in path core module 
const path = require("path");

// loading in the express module
const express = require("express");
const { eventNames } = require("process");

// loading in handlebars
const hbs = require("hbs");

const request = require("postman-request");

// loading in personal modules
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");


// creating abs path to public dir
const publicDir = path.join(__dirname, "../public");

// creating path to renamed views folder 
const viewsPath = path.join(__dirname, "../templates/views");

// creating path to partials
const partPaths = path.join(__dirname, "../templates/partials")

// loading in the single func in express
const app = express();

// setting up handlebars for dynamic templates 
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partPaths);

// linking static files dir
app.use(express.static(publicDir));


// loading dynamic home page from views
app.get("", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Janaya"
    });
})

// creating help page route
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Janaya"
    })
})

// creating about page route
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Janaya"
    });
})

// creating weather page route 
app.get("/weather", (req, res) => {
    if(!req.query.address) {
        res.send({
            error: "Please Input Location"
        })
    } else {
        geoCode(req.query.address, (e, {latitude, longitude, fullAddress} = {}) => {
            if (e) {
                res.send({e});
            } else {
                forecast(latitude, longitude, (foreError, foreRes) => {
                    if(foreError) {
                         return res.send({e});
                    } else {
                        res.send( {
                            location: fullAddress, 
                            forecast: foreRes,
                            address: req.query.address
                        })
                    }
                })

            }
        })
    }

})

//
app.get("/products", (req, res) => {
    if(!req.query.search) {
        res.send({
            error: "you must provide a search term"
        })
    } else {
       
        res.send( {
            product:[req.query.search]
        })
    }

})

// 404 Pages for Help 
app.get("/help/*", (req, res) => {
    res.render("help404", {
        title: "404",
        name: "Janaya",
        error: "Help page not found"
    });
})

// 404 Pages
app.get("/*", (req, res) => {
    res.render("404",{
        title: "404",
        name: "Janaya",
        error: "Page not found"
    });})

// hosting app locally on port 3000 
app.listen(3000, () => {
    console.log("Server is up on port 3000")
});


