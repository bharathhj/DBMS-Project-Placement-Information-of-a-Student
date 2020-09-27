var    express     = require("express");
var    app         = express();
var    bodyParser  = require("body-parser");
var    mongoose    = require("mongoose");
var    flash       = require("connect-flash");
var    passport    = require("passport");
var    LocalStrategy = require("passport-local");
var    methodOverride = require("method-override");
var    Firm        = require("./models/firm");
var    Info        = require("./models/info");
var    User        = require("./models/user");
var    seedDB      = require("./seeds");

var    infoRoutes  = require("./routes/infos");
var    firmRoutes  = require("./routes/firms");
var    indexRoutes  = require("./routes/index");




// mongoose.connect("mongodb://localhost/dsatm_pi");
mongoose.connect("mongodb+srv://Bharath:Bharath@cluster0.kbhfs.mongodb.net/DSATM_P_I?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongodb+srv://Bharath:<password>@cluster0.kbhfs.mongodb.net/<dbname>?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seed the Database

// seedDB();

//-------------------------
// Passport Configuration
//-------------------------
app.use(require("express-session")({
    secret: "Once again Jack wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes

app.use("/", indexRoutes);
app.use("/firms", firmRoutes);
app.use("/firms/:id/infos", infoRoutes);




//-------------------------
// SCHEMA SETUP
//-------------------------

// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     year: String,
//     role: String,
//     description: String,
//     benefit: String
// });

// var Firm =mongoose.model("Firm", campgroundSchema);

//-------------------------
// Manual Data Creation in Data Base
//-------------------------

// Firm.create(
// {
//     name: "Amazon",
//     image: "https://store-images.s-microsoft.com/image/apps.32851.9007199266244431.b4d3435e-46b8-4529-bf79-626971898f79.8dd824f2-3db6-4a3c-8d00-332134f1a44b",
//     year: "2015",
//     role: "Senior UX Designer",
//     description: "The Team builds products and services that helps sellers offer prices that delight the Amazon Customers.",
//     benefit: "Employer Summary"
// }, function (err, firm){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED FIRM:");
//         console.log(firm);
//     }
// });


// The example Firms for Data Appending
// var firms = [
//     {name: "Infosys", image: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1415386231/utypaslbyxwfuwhfdzxd.png"},
//     {name: "Oracle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYFoCJ1dsmjGn8mRVVyTNSlo85LKksYzSCWg&usqp=CAU"},
//     {name: "Jp Morgan", image: "https://images.barrons.com/im-90156?width=620&size=1.5"},
//     {name: "Vodafone", image: "https://static.toiimg.com/photo/59900038.cms"},
//     {name: "IBM", image: "https://content.fortune.com/wp-content/uploads/2018/10/ibm-stock-price.jpg"}
// ];



// //-------------------------
// //INDEX - show all campgrounds
// //-------------------------
//
// app.get("/firms", function(req, res){
//
//     //Get all firms from DB
//     Firm.find({}, function (err, allFirms){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("firms/index",{firms:allFirms});
//         }
//     });
// });
//
// //-------------------------
// // Firm Form for Submitting the Data into Data Base
// //-------------------------
//
// app.post("/firms", function(req, res){
//     var name = req.body.name;
//     var image = req.body.image;
//     var contact = req.body.contact;
//     var location = req.body.location;
//     // var year = req.body.year;
//     // var role = req.body.role;
//     // var description= req.body.description;
//     // var benefit= req.body.benefit;
//     // , year: year, role: role, description: description, benefit: benefit
//     var newFirms = {name: name, image: image, contact: contact, location: location}
//     // Create a new Firm and save to DB
//     Firm.create(newFirms, function (err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             res.redirect("/firms");
//         }
//     });
// });
//
// //-------------------------
// //NEW - show form to create new campground
// //-------------------------
//
// app.get("/firms/new", function(req, res){
//     res.render("firms/new");
// });
//
// //-------------------------
// // SHOW - shows more about one FIRM
// //-------------------------
//
// app.get("/firms/:id", function (req, res){
//     // find the firm with provided ID
//     Firm.findById(req.params.id).populate("infos").exec(function (err, foundFirm){
//        if(err){
//            console.log(err);
//        } else {
//            // render show tamplate with that firm
//            res.render("firms/show", {firm: foundFirm});
//        }
//     });
//     req.params.id
//
// });

//=========================================================================================
//=========================================================================================
//=========================================================================================

// //-----------------------
// //Info Routes
// //-----------------------
//
// app.get("/firms/:id/infos/new", isLoggedIn, function(req, res){
//     // find firm by id
//     Firm.findById(req.params.id, function (err, firm){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("infos/new", {firm: firm});
//         }
//     })
// });
//
// app.post("/firms/:id/infos",isLoggedIn,  function(req, res){
//     // lookup firm using ID
//     Firm.findById(req.params.id, function (err, firm){
//         if(err){
//             console.log(err);
//             res.redirect("/firms");
//         } else {
//             Info.create(req.body.info, function (err, info){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     firm.infos.push(info);
//                     firm.save()
//                     res.redirect('/firms/' + firm._id);
//                 }
//             });//   Info.create({})
//         }
//     });
//     // create new comment to firm
//     // connect new Info to campground
//     // redirect to firm show page
// });

//=========================================================================================
//=========================================================================================
//=========================================================================================

//
// app.get("/", function(req, res){
//     res.render("landing");
// });


// //-------------------------
// // Auth Routes
// //-------------------------
//
//
// //show register form
// app.get("/register", function (req, res){
//     res.render("register");
// })
// //handle signup logic
// app.post("/register", function (req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function (err, user){
//         if(err){
//             console.log(err);
//             return res.render("register")
//         }
//         passport.authenticate("local")(req, res, function (){
//             res.redirect("firms");
//         });
//     });
// });
//
// // show login form
// app.get("/login", function(req, res){
//     res.render("login");
// });
// // handling login logic
// app.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/firms",
//         failureRedirect: "/login"
//     }), function(req, res){
// });
//
// // logic route
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/firms");
// });
//
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

app.listen(1200, function(){
    console.log("The DSATM Placement Inn Server Has Started!");
//    console.log(process.env.PORT, process.env.IP);
});