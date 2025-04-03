import { Router } from "express";
import { job } from "../controllers/jobController";

const jobRouter = Router();

jobRouter.post("/add", job.add);

jobRouter.get("/all", job.getAll);
jobRouter.get("/:id", job.findById);

export default jobRouter;