import { Router } from "express";
import { createUser } from "../controller/customers";

const UserRouter = Router();

UserRouter.post("/createUser", createUser);

export default UserRouter;