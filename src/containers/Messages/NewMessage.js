import React, { useState, useEffect } from "react";
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
    message: "",
    service: "",
    to: "",
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
      url: `${process.env.REACT_APP_PARTNER_API}/message`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        message: formValues.message,
        service: formValues.service,
        to: formValues.to,
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

  const [districts, setDistrict] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/districts`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: 10000,
        page: 1,
      },
    })
      .then((res) => {
        setDistrict(res.data.data.districts);
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/regions`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: 10000,
        page: 1,
      },
    })
      .then((res) => {
        setRegions(res.data.data.regions);
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Button variant="outline-secondary" onClick={() => setShowDefault(true)}>
        New Message
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Send SMS</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  message: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>SMS Service</Form.Label>
            <Form.Select
              value={formValues.service}
              onChange={(d) =>
                onChangeValue({ ...formValues, service: d.target.value })
              }
            >
              <option>Select</option>
              <option>Africastalking</option>
              <option>Twilio</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Send To</Form.Label>
            <Form.Select
              value={formValues.to}
              onChange={(d) =>
                onChangeValue({ ...formValues, to: d.target.value })
              }
            >
              <option>Select</option>
              <option>All</option>
              <option value="uganda">Uganda</option>
              <option value="previous-customers">Previous Customers</option>
              <option value="custome">Custom</option>
              <option>Roles</option>
              <option value="farmer">&nbsp;&nbsp; Farmer</option>
              <option value="manufacturer">
                &nbsp;&nbsp; Farm Inputs Manufacturer / Supplier
              </option>
              <option value="processor">&nbsp;&nbsp; Food Processors</option>
              <option value="service_provider">
                &nbsp;&nbsp; Agro service Provider
              </option>
              <option value="buyer">
                &nbsp;&nbsp; Agro Produce Buyer (Only)
              </option>
              <option value="dealer">&nbsp;&nbsp; Farmer Inputs Dealer</option>
              <option>Regions</option>
              {regions &&
                regions.map(({ ID, name }) => (
                  <option value={ID} key={ID}>
                    &nbsp;&nbsp; {name}
                  </option>
                ))}
              <option>District</option>
              {districts &&
                districts.map(({ ID, name }) => (
                  <option value={ID} key={ID}>
                    &nbsp;&nbsp; {name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            // onClick={handleSubmit}
          >
            {!loadingStatus ? `Send` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
