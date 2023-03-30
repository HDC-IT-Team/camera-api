import njwt from 'njwt';
import { User } from "../database/dto/User";
import UserModel from "../database/models/UserModel";
import * as bcrypt from 'bcrypt';

const APP_SECRET: string = <string>process.env.APP_SECRET;
const SALT_ROUNDS = 10;

export class AuthService {

    constructor() { }

    public static async login(user: User) {
        const userModel = await UserModel.findOne({ where: { username: user.username } });
        const invalidCredentialsErr = "Invalid credentials";
        if (!userModel) {
            throw invalidCredentialsErr;
        }

        const promise = new Promise((resolve, reject) => {
            bcrypt.compare(user.password, userModel.password, (err, result) => {
                if (result) {
                    const accessToken = this.encodeToken({ userId: userModel.id });
                    resolve(accessToken);
                } else {
                    reject(invalidCredentialsErr);
                }
            });
        });

        return promise;
    }

    public static async createUser(user: User) {
        const promise = new Promise((resolve, reject) => {
            bcrypt.hash(user.password, SALT_ROUNDS, async (err, hash) => {
                if (err) {
                    reject("The password is required");
                }
                try {
                    const userModel: any = await UserModel.create({
                        username: user.username,
                        password: hash
                    });

                    resolve(userModel.toJSON());
                } catch (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    private static encodeToken(userData: any) {
        const token = njwt.create(userData, APP_SECRET);
        token.setExpiration(new Date().getTime() + (60 * 60 * 1000 * 24)); // One day from now
        return token.compact();
    }
}