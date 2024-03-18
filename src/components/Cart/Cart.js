import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import React, { useContext, useState } from 'react';
import Checkout from './Checkout';

function Cart({ onShow }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const cartCtx = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const totalAmount =
    cartCtx.totalAmount === 0 ? '$0.00' : `$${cartCtx.totalAmount.toFixed(2)}`;
  const addCartItemHandler = (cartItem) => {
    cartCtx.addCartItem({ ...cartItem, amount: 1 });
  };
  const removeCartItemHandler = (id) => {
    cartCtx.removeCartItem(id);
  };
  const showOrderButton = cartCtx.cartItems.length > 0;
  function orderButtonHandler() {
    setShowForm(true);
  }
  async function submitingFormHandler(data) {
    try {
      setIsSubmiting(true);

      const response = await fetch(
        'https://react-http-ef528-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            user: data,
            orderedItems: cartCtx.cartItems,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setSuccess(true);
      cartCtx.clearCart();
    } catch (error) {
      setError(error.message);
    }
    setIsSubmiting(false);
  }
  let modalContent;
  if (error) {
    modalContent = (
      <>
        <p>{error}</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={onShow}>
            Close
          </button>
        </div>
      </>
    );
  } else if (isSubmiting) {
    modalContent = <p>Sending order data...</p>;
  } else if (success) {
    modalContent = (
      <>
        <p>Successfuly sent the order</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={onShow}>
            Close
          </button>
        </div>
      </>
    );
  } else {
    modalContent = (
      <>
        <ul className={classes['cart-items']}>
          {cartCtx.cartItems.map((item) => (
            <CartItem
              {...item}
              key={item.id}
              onAdd={addCartItemHandler.bind(null, item)}
              onRemove={removeCartItemHandler.bind(null, item.id)}
            />
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {showForm ? (
          <Checkout onShow={onShow} onSub={submitingFormHandler} />
        ) : (
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onShow}>
              Close
            </button>
            {showOrderButton && (
              <button className={classes.button} onClick={orderButtonHandler}>
                Order
              </button>
            )}
          </div>
        )}
      </>
    );
  }
  return <Modal onShow={onShow}>{modalContent}</Modal>;
}

export default Cart;
