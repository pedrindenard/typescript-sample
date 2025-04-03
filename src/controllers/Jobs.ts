import { Router, Request, Response } from "express";
import { Job, JobRequestBody } from "../models/Job";
import { Op } from "sequelize";

class JobController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routerGetAll();
        this.routerAdd();
        this.routerFindById();
    }

    private routerFindById() {
        this.router.get("/:id", async (request: Request<{ id: string }>, response: Response): Promise<any> => {
            try {
                const id = request.params.id;

                const data = await Job.findByPk(id);

                if (!data) {
                    return response.status(404).json({
                        message: `Job not found`,
                        cause: `Job with ID ${id} does not exist`
                    });
                }

                response.status(200).json({
                    message: `Job retrieved successfully`,
                    data: data
                });
            } catch (error) {
                const cause = error instanceof Error ? error.message : `Unknown error`;
    
                response.status(500).json({
                    message: `Failed to retrieve job`,
                    cause: cause
                });
            }
        });
    }

    private routerGetAll() {
        this.router.get("/all", async (request: Request<{ id: string }>, response: Response): Promise<any> => {
            try {
                const query = request.query["query"];
    
                const data = !query
                    ? await Job.findAll({ order: [["createdAt", "DESC"]] })
                    : await Job.findAll({
                        where: {
                            title: {
                                [Op.like]: `%${query}%`
                            },
                        },
                        order: [["createdAt", "DESC"]]
                    });
    
                response.status(201).json({
                    message: `Jobs retrieved successfully`,
                    data: data
                });
            } catch (error) {
                const cause = error instanceof Error ? error.message : `Unknown error`;
    
                response.status(500).json({
                    message: `Failed to retrieve jobs`,
                    cause: cause
                });
            }
        });
    }

    private routerAdd() {
        this.router.post("/add", async (request: Request<{}, {}, JobRequestBody>, response: Response): Promise<any> => {
            try {
                const { title, description, company, salary, email, newJob } = request.body;
    
                const data = await Job.create({ title, description, company, salary, email, newJob });
    
                response.status(201).json({
                    message: `Job created successfully`,
                    data: data
                });
            } catch (error) {
                const cause = error instanceof Error ? error.message : `Unknown error`;
    
                response.status(500).json({
                    message: `Failed to retrieve job`,
                    cause: cause
                });
            }
        });
    }
    
}

export const job = new JobController();