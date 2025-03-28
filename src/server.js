require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use("/auth", userRoutes);
app.use("/products", productRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Erro interno no servidor." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});