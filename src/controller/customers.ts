import { db } from "../db/db";

export async function createUser(req, res) {
  const { name, email, phone } = req.body;
  try {
    const newCustomer = await db.user.create({
      data: {
        name,
        email,
        phone,
      },
    });
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUser(req, res) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  } 
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
}

