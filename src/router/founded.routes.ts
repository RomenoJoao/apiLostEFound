import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const items = await prisma.founded.findMany();
  res.status(200).json({ items, message: "Founded" });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.founded.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json({ user, message: "Item" });
});
router.get("/byCategory/:category", async (req: Request, res: Response) => {
  const { category } = req.params;

  console.log(category);

  const items = await prisma.founded.findMany({
    where: {
      category,
    },
    include: {
      user: true,
    },
  });

  res.status(200).json({ items, message: "Items" });
});

router.post("/", async (req: Request, res: Response) => {
  const { local, description, category, image, userId } = req.body;
  //   const { userId } = req.headers;

  console.log(req.headers);
  const user = await prisma.founded.create({
    data: {
      local,
      description,
      category,
      image,
      userId,
    },
  });
  res.status(201).json({ user, message: "Item Created" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await prisma.founded.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ item, message: "Users" });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { local, description, category, image } = req.body;
  const { id } = req.params;

  const user = await prisma.founded.update({
    where: {
      id,
    },
    data: {
      local,
      description,
      category,
      image,
    },
  });
  res.status(200).json({ user, message: "User Updated" });
});

export default router;
