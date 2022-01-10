import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ id, status, reload, setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  let [formValues, onChangeValue] = useState({
    phone: "",
    region: "",
    district: "",
    paymentMethod: "",
    orderStatus: "",
    paymentStatus: "",
  });

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        onChangeValue({
          ...formValues,
          phone: res.data.data.order.phone_number,
          region: parseInt(res.data.data.order.region),
          district: parseInt(res.data.data.order.district),
          paymentMethod: res.data.data.order.order_status,
          orderStatus: res.data.data.order.orderStatus,
          paymentStatus: res.data.data.order.payment_status,
        });
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  }, [, reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/orders/${parseInt(id)}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        phone: formValues.phone,
        region: formValues.region,
        district: formValues.district,
        paymentMethod: formValues.paymentMethod,
        orderStatus: formValues.orderStatus,
        paymentStatus: formValues.paymentStatus,
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
        variant="outline-gray"
        className=""
        size="sm"
        onClick={() => setShowDefault(true)}
      >
        <div className="d-flex justify-content-between">
          <div>{status}</div>
          {/* <FontAwesomeIcon icon={faCaretDown} /> */}
        </div>
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">UPDATE ORDER {id}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Choose Payment Status</Form.Label>
              <Form.Select
                size="sm"
                valus={formValues.paymentStatus}
                onChange={(d) =>
                  onChangeValue({
                    ...formValues,
                    paymentStatus: d.target.value,
                  })
                }
              >
                <option>{status}</option>
                <option>Recieved</option>
                <option>Pending</option>
                <option>Refunded</option>
                <option>Canceled</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Check
                label="Send SMS to customer"
                id="checkbox1"
                htmlFor="checkbox1"
              />
            </Form.Group>
          </>
          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleSubmit}
          >
            {!loadingStatus ? (
              `Update Status`
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
