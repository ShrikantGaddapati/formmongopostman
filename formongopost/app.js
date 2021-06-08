var express = require("express");
var app = express();
var port = 3001;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    textarea :String
});
var User = mongoose.model("User", nameSchema);



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("details got saved");
        })
        .catch(err => {
            res.status(400).send("Unable to save to db");
        });
});
router.delete("/delete", function (req, res) {
    var myData = new User(req.body);
  myData.find({ firstName: req.params.firstName }, function (err) {
    if (err) res.json(err);
    else res.redirect("/index.html");
  });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});