import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./styles.css";

export default function Donation() {
  const [progress, setProgress] = useState(100); // User's current points
  const [buttonDisabled, setButtonDisabled] = useState(true); // Button is disabled by default
  //toast
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  //model
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get Donations

  const [donate, setDonate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/donations/")
      .then((response) => {
        setDonate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const requiredPoints = 100; // Required points to donate

  // Handle button click
  const handleClaimVoucher = () => {
    if (progress >= requiredPoints) {
      // Donation logic goes here
      console.log("Voucher claimed!");
    }
  };

  // Enable/disable button based on user's points
  if (progress >= requiredPoints) {
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
  } else {
    if (!buttonDisabled) {
      setButtonDisabled(true);
    }
  }

  //voucher button - model
  const handleBothClicksOne = () => {
    handleClaimVoucher();
    handleShow();
  };

  //model - toast
  const handleBothClicksTwo = () => {
    toggleShowA();
    handleClose();
  };

  return (
    <div className="cards_styles color_div card_flex">
      {donate.map((donate) => (
        <div key={donate._id}>
          <div className="card_flex">
            <Card style={{ width: "18rem", height: "20rem" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>{donate.donateName}</Card.Title>
                <div className="card_overflow">
                  <Card.Text>{donate.donateDetails}</Card.Text>
                </div>
                <br />
                <ProgressBar
                  now={progress}
                  max={donate.donatePoints}
                  label={`${progress}`}
                  variant="success"
                />
                <Button
                  variant="primary"
                  style={{ margin: "1rem 0" }}
                  onClick={handleBothClicksOne}
                  disabled={buttonDisabled}
                  className="button_styles"
                >
                  Donate
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Model */}
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{donate.donateName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {donate.donateDetails}
                <br />
                <br />
                <Card.Subtitle className="mb-2 text-muted">
                  Donation Amount: LKR {donate.donateAmount}
                </Card.Subtitle>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleBothClicksTwo}>
                  Doante
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* Toast */}
          <div>
            <Col md={12} className="mb-2">
              <Toast
                show={showA}
                onClose={toggleShowA}
                className="redeem_toast"
              >
                <Toast.Header className="toast_header">
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>
                  Thank You for your donation to the{donate.donateName}!
                </Toast.Body>
              </Toast>
            </Col>
          </div>
        </div>
      ))}
    </div>
  );
}