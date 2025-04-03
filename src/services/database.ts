import { Sequelize } from "sequelize";
import logger from "../logger";

class Database {
    
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({ dialect: "sqlite", storage: "./sqlite.db" });
    }

    initialize() {
        this.sequelize.authenticate()
            .then(() => {
                logger.info(`Database connection has been established successfully`);
            })
            .catch((error) => {
                logger.error(`Unable to connect to the database:`, error);
            });
    }

}

export const db = new Database();