import { Sequelize } from "sequelize";

const DATA_BASE_HOST: string = <string>process.env.DATA_BASE_HOST;
const DATA_BASE_PORT: number | any = <number | any>process.env.DATA_BASE_PORT;
const DATA_BASE_USERNAME: string = <string>process.env.DATA_BASE_USERNAME;
const DATA_BASE_PASSWORD: string = <string>process.env.DATA_BASE_PASSWORD;
const DATA_BASE_NAME: string = <string>process.env.DATA_BASE_NAME;

class SequelizeConnection {
    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new Sequelize({
                dialect: 'mysql',
                host: DATA_BASE_HOST,
                port: DATA_BASE_PORT,
                username: DATA_BASE_USERNAME,
                password: DATA_BASE_PASSWORD,
                database: DATA_BASE_NAME
            });
        }

        return SequelizeConnection.instance;
    }

    static async connect(): Promise<Sequelize> {
        const sequelize = SequelizeConnection.getInstance();
        try {
            await sequelize.authenticate();
            console.log("Database connection authenticated successfully");
            return sequelize;
        } catch (ex: any) {
            console.log("Error while creation connection to database :: " + ex.message);
            return sequelize;
        }
    }

    static async close(): Promise<Sequelize> {
        const sequelize = SequelizeConnection.getInstance();
        try {
            await sequelize.close();
            console.log("Database connection closed successfully");
            return sequelize;
        } catch (ex: any) {
            console.log("Error while closing database connection :: " + ex.message);
            return sequelize;
        }
    }

}

export default SequelizeConnection;