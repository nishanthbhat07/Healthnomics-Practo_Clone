import React from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Button } from "reactstrap";
import "./common.css";
class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      this.props.onClick();
    }
  };

  render() {
    const { stripe } = this.props;
    return (
      <form className="form-form" onSubmit={this.handleSubmit}>
        <CardElement
          className="input-input"
          options={{
            style: {
              base: {
                fontSize: 24,
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button color="primary" type="submit" disabled={!stripe}>
          Pay ₹100
        </Button>
      </form>
    );
  }
}

const InjectedCheckoutForm = ({ onClick }) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} onClick={onClick} />
      )}
    </ElementsConsumer>
  );
};
export default InjectedCheckoutForm;
