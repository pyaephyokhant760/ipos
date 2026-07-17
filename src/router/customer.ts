import { Router } from "express";
import { createUser , getUser , getUserById } from "../controller/customers";

const UserRouter = Router();

UserRouter.post("/createUser", createUser);
UserRouter.get("/getUser",getUser);
UserRouter.get("/getUserId/:id", getUserById);

export default UserRouter;