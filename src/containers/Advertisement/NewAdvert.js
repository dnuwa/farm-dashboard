import React, { useState } from "react";
import { Button, Modal, Form, Spinner } from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({setReload}) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    ad_title: "",
    ad_desc: "",
    ad_file: "",
    ad_link: "",
    display: "",
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
      url: `${process.env.REACT_APP_PARTNER_API}/adverts/Create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        ad_title: formValues.ad_title,
        ad_desc: formValues.ad_desc,
        ad_file: formValues.ad_file,
        ad_link: formValues.ad_link,
        display: parseInt(formValues.display),
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
        variant="outline-secondary"
        // size="sm"
        onClick={() => setShowDefault(true)}
      >
        Add Advertisement
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Create an advert</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ad Title</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  ad_title: d.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ad Description</Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  ad_desc: d.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ad Link</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  ad_link: d.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ad Display</Form.Label>
            <Form.Select
              size="sm"
              value={formValues.display}
              onChange={(d) =>
                onChangeValue({ ...formValues, display: d.target.value })
              }
            >
              <option>Select</option>
              <option value="0">Home</option>
              <option value="1">Sidebar</option>
              <option value="2">Footer</option>
              <option value="3">Header</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Ad Image</Form.Label>
            <Form.Control
              type="file"
              size="sm"
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  ad_file: d.target.value,
                })
              }
            />
          </Form.Group>
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
