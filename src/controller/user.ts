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
         return res.status(400).json({ error: "Sometime went wrong",data: null });
    }
}