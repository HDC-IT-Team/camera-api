import { Request, Response } from "express";

export class AuthGuard {

    public static authenticated(request: Request, response: Response, next: Function) {
        if (request.body.userId) {
            return next();
        }

        response.status(401).json({ error: 'User not authenticated' });
    }
}