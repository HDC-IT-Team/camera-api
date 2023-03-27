import { Sequelize } from "sequelize";

class SequelizeConnection {
    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new Sequelize({
                dialect: 'sqlite',
                storage: './db/camera_db.sqlite'
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