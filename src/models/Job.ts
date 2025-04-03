import Sequelize from "sequelize";
import { db } from "../common/database";

export const Job = db.sequelize.define("job", {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT
    },
    company: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    newJob: {
        type: Sequelize.BOOLEAN
    }
});

export interface JobRequestBody {
    title: string;
    description: string;
    company: string;
    salary: number;
    email: string;
    newJob: boolean;
}