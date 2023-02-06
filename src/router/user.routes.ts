import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany(
    {
        include:{
            founded:true
        }
    }
  );
  res.status(200).json({ users, message: "Users" });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json({ user, message: "Users" });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) return res.status(401).json({ message: "User Exist" });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password,
    },
  });
  res.status(201).json({ user, message: "User Created" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ user, message: "Users" });
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  const { id } = req.params;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      phone,
      password,
    },
  });
  res.status(200).json({ user, message: "User Updated" });
});

router.put("/update/passwordReset", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password,
    },
  });
  res.status(200).json({ user, message: "User Updated" });
});

export default router;
