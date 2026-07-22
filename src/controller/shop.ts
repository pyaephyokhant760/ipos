export async function createUser(req: Request, res: Response) {
    const { name , slug , location , adminId , attendantIds } = req.body;
    try {
        const existingUser = await db.shop.findUnique({
            where: {
                slug: slug
            }
        });
        if(existingUser) {
            return res.status(400).json({ error: "Shop already exists" });
        }
        const newUser = await db.shop.create({
            data: {
                name,
                slug,
                location,
                adminId,
                attendantIds
            }
        });
        return res.status(201).json(newUser);
    }catch(error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

export async function getUsers(req: Request, res: Response) {
    try{
        const users = await db.shop.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        res.status(200).json({
            data:users,
            error:null
        })
    } catch (error) {
         return res.status(400).json({ error: "Something went wrong",data: null });
    }
}