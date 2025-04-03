import { Sequelize } from "sequelize";

class Database {
    
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({ dialect: "sqlite", storage: "./sqlite.db" });
    }

    initialize() {
        this.sequelize.authenticate()
            .then(() => {
                console.log("Database connection has been established successfully.");
            })
            .catch((error) => {
                console.error("Unable to connect to the database:", error);
            });
    }

}

export const db = new Database();