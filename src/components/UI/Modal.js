import React from 'react';
import { createPortal } from 'react-dom';

import classes from './Modal.module.css';
function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}
function Modal(props) {
  return (
    <>
      {createPortal(
        <div className={classes.backdrop} onClick={props.onShow}></div>,
        document.getElementById('backdrop')
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlay')
      )}
    </>
  );
}

export default Modal;
