const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Root is working properly");
});

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the Beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
  });

  await sampleListing.save();
  console.log("Sample was saved Sucessfully");
  res.send("Successful testing");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({})
  res.render("listings/index.ejs",{allListings});
});

//Show route
app.get("/listings/:id",async (req, res)=> {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
})

//New route
app.get("/listings/new",(req,res)=>{
  
})


app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
