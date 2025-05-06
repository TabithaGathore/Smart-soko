import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [trader, setTrader] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !trader) return;
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), trader }),
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        setName('');
        setPrice('');
        setTrader('');
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div>
      <h2>Product Listings</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price.toFixed(2)} (Trader: {p.trader})</li>
        ))}
      </ul>
      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Trader" value={trader} onChange={e => setTrader(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductList;
