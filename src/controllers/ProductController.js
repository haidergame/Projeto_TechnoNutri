const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProduct(req, res) {
    const { name, price, description, image } = req.body;

    // Validação de entrada
    if (!name || !price || !description || !image) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        // Conversão de 'price' para Float e criação do produto
        const product = await prisma.product.create({
            data: { name, price: parseFloat(price), description, image },
        });

        res.status(201).json({
            message: "Produto criado com sucesso!",
            product: { id: product.id, name: product.name, price: product.price, image: product.image },
        });
    } catch (error) {
        console.error("Erro ao criar o produto:", error.message);
        res.status(500).json({ error: "Erro interno do servidor.", details: error.message });
    }
}

async function getProducts(req, res) {
    try {
        // Busca todos os produtos com os campos especificados
        const products = await prisma.product.findMany({
            select: { id: true, name: true, price: true, description: true, image: true },
        });

        res.status(200).json({
            message: "Produtos obtidos com sucesso!",
            products: products,
        });
    } catch (error) {
        console.error("Erro ao obter produtos:", error.message);
        res.status(500).json({ error: "Erro interno do servidor.", details: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = parseInt(req.params.id, 10);

        // Validação se o produto existe
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        // Exclusão do produto
        await prisma.product.delete({
            where: { id: productId },
        });

        res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir o produto:", error.message);
        res.status(500).json({ error: "Erro interno do servidor.", details: error.message });
    }
}

module.exports = { createProduct, getProducts, deleteProduct };