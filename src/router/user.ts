import { Router } from "express";
import { createUser, getUsers, getUserId, updatePassword, updateUser, deleteUser } from "../controller/user";

const UserRouter = Router();

UserRouter.post("/createUser", createUser);
UserRouter.get("/getUsers", getUsers);
UserRouter.get("/getUserId/:id", getUserId);
UserRouter.put("/updatePassword", updatePassword);
UserRouter.put("/updateUser/:id", updateUser);
UserRouter.delete("/deleteUser/:id", deleteUser);

export default UserRouter;