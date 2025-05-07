import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: JSON.parse(localStorage.getItem('products')) || [],
  searchTerm: '',
  sortBy: 'name-asc',
  modal:{open:false, productId: null}
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        id: Date.now(),
        ...action.payload
      });
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleModal: (state, action) => {
      state.modal.open = !state.modal.open;
      state.modal.productId = action.payload;
    },
    editProduct: (state, action) => {
      const {id, newProduct} = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if(index !== -1){
        state.products[index] = { ...state.products[index], ...newProduct};
      }
    }
  }
});

export const { addProduct, deleteProduct, setSearchTerm, setSortBy, toggleModal, editProduct } = inventorySlice.actions;
export default inventorySlice.reducer;