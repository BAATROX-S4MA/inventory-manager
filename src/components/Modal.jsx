import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal, editProduct } from '../inventorySlice';
import '../App.css';

const Modal = () => {
  const dispatch = useDispatch();
  const { modal, products } = useSelector(state => state.inventory);
  const product = products.find(prod => prod.id === modal.productId);

  const [formData, setFormData] = useState({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    category: product.category,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.quantity || isNaN(formData.quantity)) 
      newErrors.quantity = 'Valid quantity required';
    if (!formData.price || isNaN(formData.price)) 
      newErrors.price = 'Valid price required';
    if (formData.category === 'default') 
      newErrors.category = 'Please select a category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(editProduct({
        id: modal.productId,
        newProduct: {
          name: formData.name,
          quantity: Number(formData.quantity),
          price: Number(formData.price),
          category: formData.category,
        },
      }));
      dispatch(toggleModal());
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="m-name">Product name: </label>
          <input
            value={formData.name}
            id="m-name"
            type="text"
            placeholder="Product"
            name="name"
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <br />

          <label htmlFor="m-quantity">Product quantity: </label>
          <input
            onChange={handleChange}
            value={formData.quantity}
            id="m-quantity"
            type="text"
            name="quantity"
            placeholder="20"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
          <br />

          <label htmlFor="m-price">Product price per unit ($): </label>
          <input
            onChange={handleChange}
            value={formData.price}
            id="m-price"
            type="text"
            name="price"
            placeholder="100"
          />
          {errors.price && <span className="error">{errors.price}</span>}
          <br />

          <select
            onChange={handleChange}
            value={formData.category}
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

          <div className="modal-buttons">
            <button type="button" onClick={() => dispatch(toggleModal())}>
              Cancel
            </button>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;