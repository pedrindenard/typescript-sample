import { app } from "./common/app";
import { db } from "./common/database";

app.initialize(3000, "localhost")
db.initialize()