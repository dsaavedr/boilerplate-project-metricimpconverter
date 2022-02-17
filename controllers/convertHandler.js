function ConvertHandler() {
    this.spellings = {
        gal: "gallons",
        L: "liters",
        lbs: "pounds",
        kg: "kilograms",
        mi: "miles",
        km: "kilometers"
    };

    this.dict = [
        ["gal", "L"],
        ["lbs", "kg"],
        ["mi", "km"]
    ];

    this.numDecimals = 6;

    // Taken from https://www.jacklmoore.com/notes/rounding-in-javascript/
    this.round = (value, decimals = 0) =>
        Number(Math.round(value + "e" + decimals) + "e-" + decimals);

    this.getNum = function (input) {
        let result;
        const fraction = input.split("/");

        if (fraction.length > 1) {
            if (fraction.length > 2) throw new Error("Double+ fractions not allowed");

            const leftMatch = input.match(/^(\d+\.?\d*)(?=\/)/);
            const rightMatch = input.match(/(?<=\/)(\d+\.?\d*)/);

            if (leftMatch === null && rightMatch === null)
                throw new Error("Invalid fraction format");

            const left = parseFloat(leftMatch[0]);
            const right = parseFloat(rightMatch[0]);

            if (right === 0) throw new Error("Cannot divide by 0");

            result = left / right;
        } else {
            numMatch = input.match(/^\d+\.?\d*/);

            result = numMatch ? parseFloat(numMatch[0]) : null;
        }

        return result || 1;
    };

    this.getUnit = function (input) {
        let result = input.match(/[A-Za-z]+$/);

        if (!result) throw new Error("Unit required as the last part of the string");

        result = result[0];

        if (result === "l") result = "L";

        if (!Object.keys(this.spellings).includes(result)) throw new Error("Unit not found");

        return result;
    };

    this.getReturnUnit = function (initUnit) {
        for (const pair of this.dict) {
            if (!pair.includes(initUnit)) continue;

            for (const [idx, el] of pair.entries()) {
                if (el == initUnit) return pair[Math.abs(idx - 1)];
            }
        }

        throw new Error("Return unit not found");
    };

    this.spellOutUnit = function (unit) {
        if (!Object.keys(this.spellings).includes(unit)) throw new Error("Unit not found");

        return this.spellings[unit];
    };

    this.convert = function (initNum, initUnit) {
        let result;

        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        if (!Object.keys(this.spellings).includes(initUnit)) throw new Error("Unit not found");

        switch (initUnit) {
            case "gal":
                result = initNum * galToL;
                break;
            case "L":
                result = initNum / galToL;
                break;
            case "lbs":
                result = initNum * lbsToKg;
                break;
            case "kg":
                result = initNum / lbsToKg;
                break;
            case "mi":
                result = initNum * miToKm;
                break;
            case "km":
                result = initNum / miToKm;
                break;

            default:
                break;
        }

        if (!result) throw new Error("Something went wrong");

        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${this.spellOutUnit(
            initUnit
        )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };

    this.handle = function (input) {
        const initNum = this.round(this.getNum(input), 6);
        const initUnit = this.getUnit(input);
        const returnUnit = this.getReturnUnit(initUnit);
        const returnNum = this.round(this.convert(initNum, initUnit), 6);

        const string = this.getString(initNum, initUnit, this.round(returnNum, 5), returnUnit);

        const result = {
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string
        };

        return result;
    };
}

module.exports = ConvertHandler;
