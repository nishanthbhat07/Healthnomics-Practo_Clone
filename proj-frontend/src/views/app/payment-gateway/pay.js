import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Modal } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import MyCheckoutForm from "./start";
const stripePromise = loadStripe(
  "pk_test_51HojBHDpfvzgJR4pXFOGRvutxEvv5tUs2z61xMMxhFkMlyqlpQ8zmwPOLiixRqmf3x0ygs71SWxkpbldhiH18t4800Am9RBDzh"
);

const Pay = ({ open, showModal, onClick }) => {
  return (
    <>
      <Modal isOpen={open} toggle={showModal}>
        <Helmet>
          <title>Pay</title>
        </Helmet>
        <Elements stripe={stripePromise}>
          <MyCheckoutForm onClick={onClick} />
        </Elements>
      </Modal>
    </>
  );
};

export default Pay;
