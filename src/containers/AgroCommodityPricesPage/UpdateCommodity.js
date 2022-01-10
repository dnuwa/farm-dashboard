import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ setReload, id }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  let initialState = {
    commodity_name: "",
    unit: "",
    whole_sale_price: "",
    Whole_Sale_Price_USD: "",
    retail_price: "",
    Retail_Price_USD: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    setLoadingStatus(true);
    {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_PARTNER_API}/commodities/${id}`,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            commodity_name: res.data.data.commodity.commodity_name,
            unit: res.data.data.commodity.unit,
            whole_sale_price: res.data.data.commodity.whole_sale_price,
            Whole_Sale_Price_USD: res.data.data.commodity.Whole_Sale_Price_USD,
            retail_price: res.data.data.commodity.retail_price,
            Retail_Price_USD: res.data.data.commodity.Retail_Price_USD,
          });
          setLoadingStatus(false);
        })
        .catch((err) => {
          setIsError(err);
          setLoadingStatus(false);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/commodities/${id}`,
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
      <Button
        variant="outline-success"
        className="m-1"
        size="sm"
        onClick={() => setShowDefault(true)}
      >
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Edit Commodity</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Commodity Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.commodity_name}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      commodity_name: d.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
                  <option value="">Select category</option>
                  <option value="">Gram (g)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Whole Sale Price (UGX)</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.whole_sale_price}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      whole_sale_price: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Retail Price (UGX)</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.retail_price}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      retail_price: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}

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
