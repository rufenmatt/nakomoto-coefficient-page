"use strict";
exports.__esModule = true;
exports.findCoeff = exports.formatPercentage = exports.formatMoney = exports.formatInteger = exports.parseBigInt = void 0;
var bn_js_1 = require("bn.js");
function parseBigInt(big, decPlaces) {
    var decimals = new bn_js_1.BN("10").pow(new bn_js_1.BN(decPlaces));
    var int = new bn_js_1.BN(big).div(decimals).toNumber();
    var dec = new bn_js_1.BN(big).mod(decimals).toNumber() / decimals.toNumber();
    return int + dec;
}
exports.parseBigInt = parseBigInt;
function formatInteger(int) {
    return Math.floor(int)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.formatInteger = formatInteger;
function formatMoney(amount, decPlaces) {
    if (decPlaces === void 0) { decPlaces = 2; }
    var dec = amount % 1;
    return ("$" + formatInteger(amount) + (decPlaces > 0 ? dec.toFixed(decPlaces).slice(1) : ""));
}
exports.formatMoney = formatMoney;
function formatPercentage(percent, decPlaces) {
    if (decPlaces === void 0) { decPlaces = 0; }
    return (percent * 100).toFixed(decPlaces) + "%";
}
exports.formatPercentage = formatPercentage;
function findCoeff(bonds, threshold) {
    // sort bond amounts descendingly
    bonds.sort(function (a, b) {
        if (a > b) {
            return -1;
        }
        else {
            return 1;
        }
    });
    // find Nakamoto coefficient
    var totalBond = bonds.reduce(function (a, b) { return a + b; }, 0);
    var cummBond = 0;
    var coeff = 0;
    for (var i = 0; i < bonds.length; i++) {
        cummBond += bonds[i];
        // thorchteain can be halted by 33%+1 nodes
        if (cummBond > totalBond * threshold) {
            coeff = i + 1;
            break;
        }
    }
    return { totalBond: totalBond, cummBond: cummBond, coeff: coeff };
}
exports.findCoeff = findCoeff;
// test
if (require.main === module) {
    // should be 123.456789
    console.log("parseBigInt(\"123456789\", 6) = ".concat(parseBigInt("123456789", 6)));
    // should be 1.23456789
    console.log("parseBigInt(\"123456789\", 8) = ".concat(parseBigInt("123456789", 8)));
    // should be 123,456,789
    console.log("formatInteger(123456789) = ".concat(formatInteger(123456789)));
    // should be 1,234,567 (decimal part is rounded down)
    console.log("formatInteger(1234567.89) = ".concat(formatInteger(1234567.89)));
}
