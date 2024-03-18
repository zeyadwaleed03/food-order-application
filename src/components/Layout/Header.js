import React from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>{props.title}</h1>
        <HeaderCartButton onShow={props.onShow} />
      </header>
      <div className={classes['main-image']}>
        <img src={props.src} alt={props.alt} />
      </div>
    </>
  );
}

export default Header;
