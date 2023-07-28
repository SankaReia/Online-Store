import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { AddressI, PaymentI } from "../../utils/models";

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout: FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFilledIn, setIsFilledIn] = useState(true);
  const [address, setAddress] = useState<AddressI>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [payment, setPayment] = useState<PaymentI>({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            address={address}
            setAddress={setAddress}
            isFilledIn={isFilledIn}
            setIsFilledIn={setIsFilledIn}
          />
        );
      case 1:
        return (
          <PaymentForm
            payment={payment}
            setPayment={setPayment}
            isFilledIn={isFilledIn}
            setIsFilledIn={setIsFilledIn}
          />
        );
      case 2:
        return <Review address={address} payment={payment} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    for (const key in address) {
      if (address[key] === "") setIsFilledIn(false);
      else setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
