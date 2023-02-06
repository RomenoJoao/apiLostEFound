import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import masterRoutes from "./router/routes"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT;

app.use("/api",masterRoutes)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log("Running Out ", process.env.PORT);
});
