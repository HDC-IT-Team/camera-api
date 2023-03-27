import { Request, Response } from "express";
import { User } from "../database/dto/User";
import { AuthService } from "../services/AuthService";

export class AuthController {
    constructor() { }

    public static async signin(request: Request, response: Response) {
        const user: User = request.body;
        try {
            const authToken = await AuthService.login(user);
            return response.json({ authToken });
        } catch (err: any) {
            return response.status(400).json({ error: err });
        }
    }

    public static async signup(request: Request, response: Response) {
        const user: User = request.body;
        try {
            const userModel = await AuthService.createUser(user);
            return response.json(userModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }
}