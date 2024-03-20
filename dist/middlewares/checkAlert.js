"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAlert = void 0;
function checkAlert(req, res, next) {
    if (res.locals.message) {
        console.log('message : ', res.locals.message);
        next();
    }
    else {
        res.locals.message = null;
        next();
    }
}
exports.checkAlert = checkAlert;
