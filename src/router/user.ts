import { Router } from "express";
import { createUser , getUsers  } from "../controller/user";

const UserRouter = Router();

UserRouter.post("/createUser", createUser);
UserRouter.get('/getUsers', getUsers);

export default UserRouter;