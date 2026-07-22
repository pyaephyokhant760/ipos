//create user
import { db } from "../db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
export async function createUser(req: Request, res: Response) {
    const { email ,password , username , firstName , lastName , phone , dob , gender , image , role} = req.body;
    try {
        const existingUser = await db.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const existingUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });
        if (existingUsername) {
            return res.status(400).json({ error: "User with this username already exists" });
        }
        const existingPhone = await db.user.findUnique({
            where: {
                phone: phone
            }
        }); 
         if (existingPhone) {
            return res.status(400).json({ error: "User with this phone number already exists" });
        }
        const newUser = await db.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
                username,
                firstName,
                lastName,
                phone,
                dob: dob ? new Date(dob) : null,
                gender,
                image,
                role
            }
        });
        return res.status(201).json(newUser);
    }catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await db.user.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        const filteredUsers = users.map((user) => {
            const { password , role , ... others } = user;
            return others;
        })
        res.status(200).json({
            data:filteredUsers,
            error:null
        })
    } catch (error) {
         return res.status(400).json({ error: "Something went wrong",data: null });
    }
}


export async function getUserId(req : Request , res: Response) {
    const id = req.params.id;
    try{
        const user = await db.user.findUnique({
            where : {
                id
            }
        })

        if(!user) {
            return res.status(400).json({data: null,error: "No User Found"})
        }

        const { password , ...result } = user;
        res.status(200).json({
            data : result,
            error : null
        })
    }catch(error) {
        return res.status(400).json({data:null,error: "Something went wrong"})
    }
}


export async function updatePassword(req: Request, res: Response) {
    if (!req.body || !req.body.email || !req.body.oldPassword || !req.body.newPassword) {
        return res.status(400).json({ error: "Missing required fields: email, oldPassword, newPassword" });
    }
    const { email, oldPassword, newPassword } = req.body;
    try{
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });
        if(!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid old password" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedNewPassword
            }
        });
        return res.status(200).json({ message: "Password updated successfully" });
    }catch(error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { email, username, firstName, lastName, phone, dob, gender, image, role } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        });
        if(!user) {
            return res.status(400).json({ error: "User not found" });
        }
        await db.user.update({
            where: {
                id: id
            },
            data: {
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                dob: dob,
                gender: gender,
                image: image,
                role: role
            }
        });
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        });
        if(!user) {
            return res.status(400).json({ error: "User not found" });
        }
        await db.user.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}