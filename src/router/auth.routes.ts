import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!emailExist)
    return res.status(404).json({ message: "Email não é válido" });

  if (emailExist.password !== password)
    return res.status(401).json({ message: "Password Inválida" });

  return res.status(200).json({ emailExist, message: "Sucesso" });
});

export default router;
