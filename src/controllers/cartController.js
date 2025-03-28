const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCartItems = async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        product: true,  // Inclui os dados do produto relacionado ao item do carrinho
      },
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
  }
};

const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cartItem = await prisma.cart.create({
      data: {
        productId,  // Relaciona o carrinho ao produto
        quantity,   // Quantidade do produto no carrinho
      },
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item ao carrinho.' });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cart.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Item removido do carrinho.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item do carrinho.' });
  }
};

module.exports = { getCartItems, addItemToCart, deleteCartItem };