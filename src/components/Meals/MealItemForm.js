import React, { useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../UI/Input';

function MealForm(props) {
  const inputRef = useRef();
  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();

        const amountNum = +inputRef.current.value;
        props.onAddToCart(amountNum);
      }}
    >
      <Input
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
        ref={inputRef}
      />

      <button type="submit">+ Add</button>
    </form>
  );
}

export default MealForm;
