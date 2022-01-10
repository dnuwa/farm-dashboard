import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    commodity_name: "",
    unit: "",
    whole_sale_price: "",
    Whole_Sale_Price_USD: "",
    retail_price: "",
    Retail_Price_USD: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_PARTNER_API}/commodities`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        commodity_name: formValues.commodity_name,
        unit: formValues.unit,
        whole_sale_price: formValues.whole_sale_price,
        Whole_Sale_Price_USD: formValues.whole_sale_price,
        retail_price: formValues.retail_price,
        Retail_Price_USD: formValues.Retail_Price_USD,
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
        setReload(true);
        handleClose();
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outline-secondary" onClick={() => setShowDefault(true)}>
        Add Commodity
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Commodity</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Commodity Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  commodity_name: d.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Unit</Form.Label>
            <Form.Select
              value={formValues.unit}
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  unit: d.target.value,
                })
              }
            >
              <option>Select category</option>
              <option>Gram (g)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Whole Sale Price (UGX)</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  whole_sale_price: d.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Retail Price (UGX)</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  retail_price: d.target.value,
                })
              }
            />
          </Form.Group>

          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? `Save` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
