const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


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

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({})
  res.render("listings/index.ejs",{allListings});
});


app.get("/listings/")

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
