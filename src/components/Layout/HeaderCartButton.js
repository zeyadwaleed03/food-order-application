import React, { useContext, useEffect, useState } from 'react';
import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';
function HeaderCartButton(props) {
  const ctx = useContext(CartContext);
  const [buttonHighlited, setButtonHighlited] = useState(false);
  const num = ctx.cartItems.reduce(
    (currentNum, item) => currentNum + item.amount,
    0
  );
  useEffect(() => {
    if (ctx.cartItems.length === 0) {
      return;
    }
    setButtonHighlited(true);

    const timer = setTimeout(() => {
      setButtonHighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.cartItems]);
  const btnClasses = `${classes.button} ${buttonHighlited && classes.bump}`;

  return (
    <button className={btnClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{num}</span>
    </button>
  );
}

export default HeaderCartButton;
