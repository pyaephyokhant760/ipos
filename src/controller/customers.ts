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