import React, { useReducer, useRef } from 'react';
import classes from './Checkout.module.css';
const isEmpty = (val) => {
  return val.trim().length === 0;
};
const hasLength = (val, length) => {
  return val.trim().length === length;
};

const initialState = {
  name: false,
  street: false,
  postal: false,
  city: false,
};
function reducer(state, action) {
  if (action.type === 'RESET') {
    return initialState;
  } else if (action.type === 'POSTAL') {
    return {
      ...state,
      postal: true,
    };
  } else if (action.type === 'NAME') {
    return {
      ...state,
      name: true,
    };
  } else if (action.type === 'STREET') {
    return {
      ...state,
      street: true,
    };
  } else if (action.type === 'CITY') {
    return {
      ...state,
      city: true,
    };
  }
}
function Checkout({ onShow, onSub }) {
  const [valdityState, dispatch] = useReducer(reducer, initialState);
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  function submitFormHandler(e) {
    e.preventDefault();
    dispatch({ type: 'RESET' });
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = hasLength(enteredPostal, 5);
    const formIsValid =
      enteredNameIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;
    if (!enteredNameIsValid) {
      dispatch({
        type: 'NAME',
      });
    }
    if (!enteredPostalIsValid) {
      dispatch({
        type: 'POSTAL',
      });
    }
    if (!enteredStreetIsValid) {
      dispatch({
        type: 'STREET',
      });
    }
    if (!enteredCityIsValid) {
      dispatch({
        type: 'CITY',
      });
    }
    if (!formIsValid) {
      return;
    }
    onSub({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div
        className={`${classes.control}
      ${valdityState.name && classes.invalid}`}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {valdityState.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control}
        ${valdityState.street && classes.invalid}`}
      >
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetRef} />
        {valdityState.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control}
        ${valdityState.postal && classes.invalid}`}
      >
        <label htmlFor="postal code">Postal code</label>
        <input id="postal code" type="text" ref={postalRef} />
        {valdityState.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div
        className={`${classes.control}
        ${valdityState.city && classes.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityRef} />
        {valdityState.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onShow}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
