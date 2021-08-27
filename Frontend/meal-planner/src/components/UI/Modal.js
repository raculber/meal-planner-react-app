import Card from "./Card";

import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.header}>
        {props.title}
        <div className={classes.close} onClick={props.hideModal}></div>
      </div>
      <div className={`${classes.content} ${props.className}`}>
        {props.children}
      </div>
      <div className={classes.footer}>{props.footer}</div>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          children={props.children}
          className={props.className}
          footer={props.footer}
          hideModal={props.hideModal}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;
