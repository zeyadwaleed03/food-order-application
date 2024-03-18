import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../store/cart-context';
function MealItem(props) {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  function addToCartHandler(amount) {
    const item = { amount, price: props.price, name: props.name, id: props.id };
    ctx.addCartItem(item);
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}> {props.description}</div>
        <div className={classes.price}> {price}</div>
      </div>

      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
}

export default MealItem;
