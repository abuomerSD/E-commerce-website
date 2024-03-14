"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
function isUser(req, res, next) {
    if (res.locals.user) {
        next();
    }
    else {
        res.locals.user = null;
        next();
    }
}
exports.isUser = isUser;
