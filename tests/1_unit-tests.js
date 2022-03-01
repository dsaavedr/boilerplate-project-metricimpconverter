const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

// const galToL = 3.78541;
// const lbsToKg = 0.453592;
// const miToKm = 1.60934;

suite("Unit Tests", function () {
    test("convertHandler should correctly read a whole number input.", () => {
        assert.isOk(convertHandler.handle("2gal"));
    });

    test("convertHandler should correctly read a decimal number input.", () => {
        assert.isOk(convertHandler.handle("4.20gal"));
    });

    test("convertHandler should correctly read a fractional input.", () => {
        assert.isOk(convertHandler.handle("3/2gal"));
    });

    test("convertHandler should correctly read a fractional input with a decimal.", () => {
        assert.isOk(convertHandler.handle("4.8/2gal"));
        assert.isOk(convertHandler.handle("4.4/2.2gal"));
    });

    test("convertHandler should correctly read each valid input unit.", () => {
        assert.equal(convertHandler.handle("gal").initUnit, "gal", "gal");
        assert.equal(convertHandler.handle("L").initUnit, "L", "L");
        assert.equal(convertHandler.handle("lbs").initUnit, "lbs", "lbs");
        assert.equal(convertHandler.handle("kg").initUnit, "kg", "kg");
        assert.equal(convertHandler.handle("mi").initUnit, "mi", "mi");
        assert.equal(convertHandler.handle("km").initUnit, "km", "km");
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        assert.equal(convertHandler.handle("gal").initNum, 1);
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
        assert.throws(() => convertHandler.handle("2/3/3L"), Error);
    });

    test("convertHandler should correctly return an error for an invalid input unit.", () => {
        assert.throws(() => convertHandler.handle("2gl"), Error);
    });

    test("convertHandler should return the correct return unit for each valid input unit.", () => {
        assert.equal(convertHandler.handle("gal").returnUnit, "L", "gal to L");
        assert.equal(convertHandler.handle("L").returnUnit, "gal", "L to gal");
        assert.equal(convertHandler.handle("lbs").returnUnit, "kg", "lbs to kg");
        assert.equal(convertHandler.handle("kg").returnUnit, "lbs", "kg to lbs");
        assert.equal(convertHandler.handle("mi").returnUnit, "km", "mi to km");
        assert.equal(convertHandler.handle("km").returnUnit, "mi", "km to mi");
    });

    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
        assert.equal(
            convertHandler.handle("gal").string,
            "1 gallons converts to 3.78541 liters",
            "gal to liters"
        );
        assert.equal(
            convertHandler.handle("L").string,
            "1 liters converts to 0.26417 gallons",
            "L to gal"
        );
        assert.equal(
            convertHandler.handle("lbs").string,
            "1 pounds converts to 0.45359 kilograms",
            "lbs to kg"
        );
        assert.equal(
            convertHandler.handle("kg").string,
            "1 kilograms converts to 2.20462 pounds",
            "kg to lbs"
        );
        assert.equal(
            convertHandler.handle("mi").string,
            "1 miles converts to 1.60934 kilometers",
            "mi to km"
        );
        assert.equal(
            convertHandler.handle("km").string,
            "1 kilometers converts to 0.62137 miles",
            "km to mi"
        );
    });

    test("convertHandler should correctly convert gal to L.", () => {
        assert.equal(convertHandler.handle("gal").returnNum, 3.78541, "gal to L");
    });

    test("convertHandler should correctly convert L to gal.", () => {
        assert.equal(
            convertHandler.handle("L").returnNum,
            parseFloat(1 / 3.78541).toFixed(5),
            "L to gal"
        );
    });

    test("convertHandler should correctly convert mi to km.", () => {
        assert.equal(convertHandler.handle("mi").returnNum, 1.60934, "mi to km");
    });

    test("convertHandler should correctly convert km to mi.", () => {
        assert.equal(
            convertHandler.handle("km").returnNum,
            parseFloat(1 / 1.60934).toFixed(5),
            "km to mi"
        );
    });

    test("convertHandler should correctly convert lbs to kg.", () => {
        assert.equal(convertHandler.handle("lbs").returnNum, 0.45359, "lbs to kg");
    });

    test("convertHandler should correctly convert kg to lbs.", () => {
        assert.equal(
            convertHandler.handle("kg").returnNum,
            parseFloat(1 / 0.453592).toFixed(5),
            "kg to lbs"
        );
    });
});
