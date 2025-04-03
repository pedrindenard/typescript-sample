import express from "express";
import jobRouter from "../routes/jobRouter";
import logger from '../logger';

class App {

    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    public initialize(port: number, host: string) {
        this.server.listen(port, host, () => {
            logger.info(`Server is running at http://${host}:${port}`);
        });
    }

    private middleware() {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
    }

    private router() {
        this.server.use("/jobs", jobRouter);
    }
    
}

export const app = new App();