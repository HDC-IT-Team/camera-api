import { Request, Response } from "express";
import njwt from 'njwt';
import UserModel from "../database/models/UserModel";

const APP_SECRET: string = <string>process.env.APP_SECRET;

export class AuthMiddleware {

    public static async handleToken(request: Request, response: Response, next: Function) {
        const token = request.header('Authorization')?.replace("Bearer ", "").replace("BEARER ", "").replace("bearer ", "");
        if (!token) {
            return next();
        }

        try {
            // DECODING THE TOKEN:
            const decoded: any = njwt.verify(token, APP_SECRET);
            ////
            const { userId } = decoded.body;
            const userModel = await UserModel.findOne({ where: { id: userId } });
            if (userModel) {
                request.body.userId = userId;
            }
        } catch (e) {
            return next();
        }
        next();
    };
}