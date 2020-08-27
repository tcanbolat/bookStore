import React, { useState } from "react";

import classes from "./checkout.module.css";
import checkValidity from "../../utils/validity/checkValidity";
import updateObject from "../../utils/updateObject/updateObject";
import Input from "../../components/UI/Input/Input";
import MainBody from "../../components/MainBody/MainBody";
import Button from "../../components/UI/Button/Button";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import API from "../../utils/API";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import instance from "../../utils/axios-instance";

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });

  const checkoutHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    API.checkoutCart({
      id: props.location.state.itemIds,
      total: props.location.state.total,
      shippingInfo: formData,
    })
      .then((res) => {
        props.history.push("/orderhistory");
      })
      .catch((err) => {
      });
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form className={classes.CheckoutForm} onSubmit={checkoutHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button
        disabled={!formIsValid}
        type="submit"
        clicked={(e) => {
          checkoutHandler(e);
        }}
        btnType="Order"
      >
        CHECKOUT
      </Button>
    </form>
  );

  const addComas = (number) => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <MainBody>
      {props.location.state === undefined ? (
        <PlaceHolder message="Checkout from your Cart." />
      ) : (
        <div className={classes.CheckoutBody}>
          <h1>Your total is ${addComas(props.location.state.total)}</h1>
          {form}
        </div>
      )}
    </MainBody>
  );
};

export default withErrorHandler(Checkout, instance);
