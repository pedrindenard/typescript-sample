import { app } from "./services/app";
import { db } from "./services/database";

app.initialize(3000, "localhost")
db.initialize()