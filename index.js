const bodyParser = require('body-parser')
const express = require('express')
const request = require('request');
const app = express()

const apiKey = 'a2765c7818ea96786af7bc35ced45975'

app.use(bodyParser.urlencoded({extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/',(req, res) => {
  //res.send('Hello World!')
  res.render('index')
})

app.post('/',(req, res) => {

  let city = req.body.city;
 let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

 request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });;

})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})



// const request = require('request');
//
// let apiKey = 'a2765c7818ea96786af7bc35ced45975';
// let city = 'kampala';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
//
// //console.log(message);
// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body);
//     let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//     console.log('body:', message);
//   }
// });
