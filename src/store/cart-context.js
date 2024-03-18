import React, { createContext, useReducer } from 'react';
function cartReducer(state, action) {
  if (action.name === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.cartItem.price * action.cartItem.amount;
    const itemInd = state.cartItems.findIndex((item) => {
      return item.id === action.cartItem.id;
    });
    let updatedCart;
    if (itemInd > -1) {
      updatedCart = [...state.cartItems];
      updatedCart[itemInd].amount =
        updatedCart[itemInd].amount + action.cartItem.amount;
    } else {
      updatedCart = state.cartItems.concat(action.cartItem);
    }
    return { cartItems: updatedCart, totalAmount: updatedTotalAmount };
  } else if (action.name === 'REMOVE') {
    const itemInd = state.cartItems.findIndex((item) => {
      return item.id === action.id;
    });

    const item = state.cartItems[itemInd];
    const updatedTotalAmount = state.totalAmount - item.price;
    let updatedCart;
    if (item.amount === 1) {
      updatedCart = state.cartItems.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      updatedCart = [...state.cartItems];
      updatedCart[itemInd].amount = updatedCart[itemInd].amount - 1;
    }
    return { cartItems: updatedCart, totalAmount: updatedTotalAmount };
  }
  if (action.name === 'CLEAR') {
    return {
      cartItems: [],
      totalAmount: 0,
    };
  }

  return {
    cartItems: [],
    totalAmount: 0,
  };
}

const CartContext = createContext({
  cartItems: [],
  totalAmount: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
  clearCart: () => {},
});
export function CartContextProvider(props) {
  const [cartData, dispatchCart] = useReducer(cartReducer, {
    cartItems: [],
    totalAmount: 0,
  });

  function addCartItem(cartItem) {
    dispatchCart({
      name: 'ADD',
      cartItem,
    });
  }
  function removeCartItem(id) {
    dispatchCart({
      name: 'REMOVE',
      id,
    });
  }
  function clearCart() {
    dispatchCart({ name: 'CLEAR' });
  }
  return (
    <CartContext.Provider
      value={{
        cartItems: cartData.cartItems,
        totalAmount: cartData.totalAmount,
        addCartItem: addCartItem,
        removeCartItem: removeCartItem,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
