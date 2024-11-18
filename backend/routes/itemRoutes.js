const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Items API is working!");
});

module.exports = router;
