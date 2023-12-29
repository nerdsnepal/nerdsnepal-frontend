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
     const existingItem = state.items.find(item => item._id === newItem._id);
  if (existingItem) {
    if(existingItem.quantity>=existingItem.totalQuantity){
      existingItem.quantity = existingItem.quantity;
      return;
    }
    existingItem.quantity += newItem.quantity; // Adjust the property you use to represent quantity
  } else {
    // If the product is not in the cart, add it as a new entry
    state.items.push(newItem);
    }
      updateLocalStorageCart(state.items)
    },
    updateQuantity:(state,action)=>{
        const newItem = action.payload;
        const itemToUpdate = state.items.find(item => item._id === newItem._id);
        if(newItem.quantity>itemToUpdate.totalQuantity){
          return;
        }else{
          if (itemToUpdate) {
            itemToUpdate.quantity = newItem.quantity;
            updateLocalStorageCart(state.items)
          }
        }
        
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const removedItem = action.payload;
      state.items = state.items.filter(item => item._id !== removedItem._id);
      updateLocalStorageCart(state.items)
    },
    
    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      updateLocalStorageCart(state.items)
    },
  },
});

export const { addItem, removeItem, clearCart,updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;
