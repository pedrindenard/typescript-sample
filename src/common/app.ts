import express from "express";
import { job } from "../controllers/Jobs";

class App {

    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    public initialize(port: number, host: string) {
        this.server.listen(port, host, () => {
            console.log(`Server is running at http://${host}:${port}`);
        });
    }

    private middleware() {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
    }

    private router() {
        this.server.use("/jobs", job.router);
    }
    
}

export const app = new App();