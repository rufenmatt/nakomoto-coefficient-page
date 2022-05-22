"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var helpers_1 = require("./helpers");
var chain_1 = require("./chain");
var terra = new chain_1.Chain("terra", "terra-luna", "LUNA", 1 / 3);
terra["compute"] = function () {
    return __awaiter(this, void 0, void 0, function () {
        var price, validators, bonds, _a, totalBond, cummBond, coeff, bribe;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://api.coingecko.com/api/v3/simple/price?ids=terra-luna&vs_currencies=usd")];
                case 1:
                    price = (_b.sent()).data[this.coingeckoId].usd;
                    return [4 /*yield*/, axios_1["default"].get("https://lcd.terra.dev/staking/validators")];
                case 2:
                    validators = (_b.sent()).data.result;
                    bonds = validators.map(function (validator) {
                        return (0, helpers_1.parseBigInt)(validator.tokens, 6); // LUNA has 6 decimal places
                    });
                    _a = (0, helpers_1.findCoeff)(bonds, 1 / 3), totalBond = _a.totalBond, cummBond = _a.cummBond, coeff = _a.coeff;
                    bribe = cummBond * price;
                    console.log(this.name);
                    console.log("totalBond = ".concat((0, helpers_1.formatInteger)(totalBond), " ").concat(this.symbol));
                    console.log("coeff = ".concat(coeff));
                    console.log("bribe = ".concat((0, helpers_1.formatMoney)(bribe, 0)));
                    console.log("price = ".concat((0, helpers_1.formatMoney)(price, 2)));
                    return [2 /*return*/, {
                            name: this.name,
                            symbol: this.symbol,
                            threshold: this.threshold,
                            price: price,
                            totalBond: totalBond,
                            coeff: coeff,
                            bribe: bribe
                        }];
            }
        });
    });
};
exports["default"] = terra;
