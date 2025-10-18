const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')
require('dotenv').config()

//  import data
const { learningData, aboutData, faqData } = require('./views/layout/data')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//  serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')))

//  Home Page
app.get('/', (req, res) => {
  res.render("pages/index", {
    title: "Home Page",
    arr: learningData
  })
})

//  About Page
app.get('/about', (req, res) => {
  res.render("pages/about", {
    title: "About Page",
    arr: aboutData
  })
})

//  Topic Detail Page
app.get('/topic/:slug', (req, res) => {
  const topic = learningData.find(t => t.slug === req.params.slug)

  if (!topic) {
    return res.status(404).send("❌ Topic not found")
  }

  res.render("pages/topicDetail", {
    title: topic.title,
    topic
  })
})

//  FAQ Page
app.get('/faq', (req, res) => {
  res.render("pages/faq", {
    title: "FAQ Page",
    faqData   // yaha ab sahi pass hoga
  })
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
