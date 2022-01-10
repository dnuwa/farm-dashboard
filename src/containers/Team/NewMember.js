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
    name: "",
    title: "",
    bio: "",
    thumbnail: "",
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
      url: `${process.env.REACT_APP_PARTNER_API}/teamMembers`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        name: formValues.name,
        title: formValues.title,
        bio: formValues.bio,
        thumbnail: formValues.thumbnail,
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
        Add Team Member
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Team Member</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  name: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  title: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  bio: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              size="sm"
              value={formValues.thumbnail}
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  thumbnail: d.target.value,
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
