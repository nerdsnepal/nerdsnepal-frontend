import { createSlice } from '@reduxjs/toolkit';

const getStoredItems = ()=>{
    try {
    const items = JSON.parse(localStorage.getItem('cart'))
    return items
    } catch (error) {
        return []
    }
}
const initialState = {
  items:getStoredItems()|| [], // An array to hold cart items
};

const updateLocalStorageCart = (items)=>{
    localStorage.setItem('cart',JSON.stringify(items))
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
      updateLocalStorageCart(state.items)
    },
    // Remove an item from the cart
    removeItem: (state, action) => {
      const removedItem = action.payload;
      const index = state.items.findIndex(item => item.id === removedItem.id);
      if (index !== -1) {
        state.items.splice(index, 1);
        updateLocalStorageCart(state.items)
      }

    },
    
    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      updateLocalStorageCart(state.items)
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
