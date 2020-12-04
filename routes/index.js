const express = require('express')
const router = express.Router()

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index')
});

/* Webhook endpoint */
router.post('/webhook', async function (req, res) {
  try {
    console.log("got webhook" + req + "   type: " + req.body.message_type);
  }
  catch (e) {
    console.log(e.message || e.toString())
  }
})

module.exports = router
