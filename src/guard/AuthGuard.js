"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    static authenticated(request, response, next) {
        if (request.body.userId) {
            return next();
        }
        response.status(401).json({ error: 'User not authenticated' });
    }
}
exports.AuthGuard = AuthGuard;
