import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
const PaySuccess = () => {
  const searchQuery = useSearchParams()[0];

  const referenceNum = searchQuery.get("reference");
  return (
    <div>
      <Container className="bg-light h-100">
        <Card className="bg-white p-5 p-md-5 mx-auto">
          <svg
            width="4em"
            height="4em"
            viewBox="0 0 16 16"
            className="text-success mx-auto my-4"
          >
            <path
              fill="currentColor"
              d="M8 .5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM14.927 6.7l-6.845 9.289a1.011 1.011 0 01-1.43.188L3.764 9.769a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.437 1.114z"
            />
          </svg>
          <div className="text-center">
            <h3 className="h4 text-dark font-weight-bold">Payment Done!</h3>
            <p className="text-secondary my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Payment ID: {referenceNum} </p>
            <div className="py-4 text-center">
              <Button href="/" variant="primary" size="lg">
                GO BACK
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default PaySuccess;
