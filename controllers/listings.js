const Listing = require("../models/listing");
const mapOSM=require('../public/js/geocode');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exists !");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async (req, res) => {
    try {
        // Fetch the coordinates based on the location
        const address = `${req.body.listing.location}`;
        const mapUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;
        const { lat, lon } = await mapOSM(mapUrl);
        // console.log(lat, lon);

        // Set image URL and filename
        let url = req.file.path;
        let filename = req.file.filename;

        // Create a new Listing instance
        const newListing = new Listing({
            title: req.body.listing.title,
            description: req.body.listing.description,
            location: req.body.listing.location,
            country: req.body.listing.country,
            price: req.body.listing.price,
            image: { url, filename },
            owner: req.user._id,
            geometry: {
                type: "Point",
                coordinates: [lon, lat] // GeoJSON format expects [longitude, latitude]
            }
        });

        // Save the new listing to the database
        let savedListing = await newListing.save();
        // console.log(savedListing);

        // Flash success message and redirect
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Failed to create new listing");
        res.redirect("/"); // Redirect to an appropriate error page or handle it differently
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exists !");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof (req.file) !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully !");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    // await Listing.findByIdAndDelete(id);
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing Deleted !");
    res.redirect("/listings");
}