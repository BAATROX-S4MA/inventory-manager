import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../inventorySlice';
import '../App.css';

const Form = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    category: 'default',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Name is required';
    if (!product.quantity || isNaN(product.quantity)) 
      newErrors.quantity = 'Valid quantity required';
    if (!product.price || isNaN(product.price)) 
      newErrors.price = 'Valid price required';
    if (product.category === 'default') 
      newErrors.category = 'Please select a category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addProduct({
        name: product.name,
        quantity: Number(product.quantity),
        price: Number(product.price),
        category: product.category
      }));
      setProduct({
        name: '',
        quantity: '',
        price: '',
        category: 'default',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="p-name">Product name: </label>
      <input
        value={product.name}
        id="p-name"
        type="text"
        placeholder="Product"
        name="name"
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}
      <br />

      <label htmlFor="p-quantity">Product quantity: </label>
      <input
        onChange={handleChange}
        value={product.quantity}
        id="p-quantity"
        type="text"
        name="quantity"
        placeholder="20"
      />
      {errors.quantity && <span className="error">{errors.quantity}</span>}
      <br />

      <label htmlFor="p-price">Product price per unit ($): </label>
      <input
        onChange={handleChange}
        value={product.price}
        id="p-price"
        type="text"
        name="price"
        placeholder="100"
      />
      {errors.price && <span className="error">{errors.price}</span>}
      <br />

      <select
        onChange={handleChange}
        value={product.category}
        name="category"
      >
        <option value="default">Pick a Category</option>
        <option value="foods">Foods</option>
        <option value="drinks">Drinks</option>
        <option value="phones">Phones</option>
        <option value="computers">Computers</option>
      </select>
      {errors.category && <span className="error">{errors.category}</span>}
      <br />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
};

export default Form;