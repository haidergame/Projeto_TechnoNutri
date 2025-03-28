import React, { useState } from "react";
import axios from "axios";
import "./Product.css";

function Product() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/products", newProduct);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Erro ao criar produto.");
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Criar Produto</h2>
      <div className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Nome do Produto"
          value={newProduct.name}
          onChange={handleInputChange}
          className="product-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={newProduct.price}
          onChange={handleInputChange}
          className="product-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={newProduct.description}
          onChange={handleInputChange}
          className="product-input"
        />
        <input
          type="text"
          name="image"
          placeholder="URL da Imagem"
          value={newProduct.image}
          onChange={handleInputChange}
          className="product-input"
        />
        <button
          onClick={handleCreateProduct}
          className="product-button"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Criar Produto"}
        </button>
      </div>
      {message && <p className="product-message">{message}</p>}
    </div>
  );
}

export default Product;