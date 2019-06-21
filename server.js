// import library
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");


//Create express object
const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");



//Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get("/",(req,res) => res.render("index",{
    title: "Member App",
    members: members
}));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));


// Memebers Api Routing
app.use("/api/members",require("./routes/api/members"));

//Decide port
const PORT = process.env.PORT || 5000;
// Start server listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
