"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
    const convertHandler = new ConvertHandler();

    app.get("/api/convert", function (req, res) {
        let query = req.query.input;

        if (!query) return res.sendStatus(400);

        try {
            const result = convertHandler.handle(query);
            // console.log(result);

            res.status(200).json(result);
        } catch (err) {
            // console.error(err.message);
            res.status(200).send(err.message);
        }
    });
};
