var mongoose = require("mongoose");
var Firm = require("./models/firm");
var Info   = require("./models/info");

var data = [
    // {
    //     name:"Infosys",
    //     image: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1415386231/utypaslbyxwfuwhfdzxd.png",
    //     contact: " 080 2852 0261",
    //     location: "Infosys Limited, No, 44, Hosur Rd,Open 24 hours"
        // year: "2015",
        // role: "Senior UX Designer",
        // description: "The Team builds products and services that helps sellers offer prices that delight the Amazon Customers.",
        // benefit: "Employer Summary"
    // },
    // {
    //     name:"Jp Morgan",
    //     image: "https://images.barrons.com/im-90156?width=620&size=1.5",
    //     contact: "11111111",
    //     location: "abc"
    //     year: "2015",
    //     role: "Senior UX Designer",
        // description: "The Team builds products and services that helps sellers offer prices that delight the Amazon Customers.",
        // benefit: "Employer Summary"
    // },
    // {
    //     name:"Oracle",
    //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYFoCJ1dsmjGn8mRVVyTNSlo85LKksYzSCWg&usqp=CAU",
    //     contact: "22222222",
    //     location: "pqr"
        // year: "2015",
        // role: "Senior UX Designer",
        // description: "The Team builds products and services that helps sellers offer prices that delight the Amazon Customers.",
        // benefit: "Employer Summary"
    // }
]

function seedDB(){
    //Remove all firms
    // Firm.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed all firms!");
    //     Info.remove({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed infos!");
            //add a few Firms
            data.forEach(function(seed){
                Firm.create(seed, function(err, firm){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a firm");
                        //create a info
                        Info.create(
                            {
                                author: "Arnold",
                                year: "2016",
                                role: "Cloud Engineer",
                                description: "The Team builds products and services that helps sellers offer prices that delight the Amazon Customers.",
                                benefit: "Vacation with Pay off",
                                text: "Nice Company for everyone",
                            }, function(err, info){
                                if(err){
                                    console.log(err);
                                } else {
                                    firm.infos.push(info);
                                    firm.save();
                                    console.log("Created new info");
                                }
                            });
                    }
                });
            });
        // });
    // });
    //add a few infos
}

module.exports = seedDB;