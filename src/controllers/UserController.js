const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function register(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email já está em uso." });
    }


    const user = await prisma.user.create({
      data: { email, password },
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email já está em uso." });
    } else {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Login inválido." });
    }

    res.status(200).json({
      message: "Login bem-sucedido!",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true },
    });

    res.status(200).json({
      message: "Estes são os usuários registrados!",
      users,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { register, login, getUsers };