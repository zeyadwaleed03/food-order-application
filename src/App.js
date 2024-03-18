import React, { useState } from 'react';
import meals from './assets/meals.jpg';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

import Cart from './components/Cart/Cart';
function App() {
  const [cartState, setCartState] = useState(false);
  function toggleCartState() {
    setCartState((prevState) => !prevState);
  }
  return (
    <>
      <Header
        title="ReactMeals"
        src={meals}
        alt="food picture"
        onShow={toggleCartState}
      />
      <main>
        {cartState && <Cart onShow={toggleCartState} />}
        <Meals />
      </main>
    </>
  );
}

export default App;
