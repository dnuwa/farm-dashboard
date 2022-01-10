import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);

  let initialState = {
    username: "",
    fullname: "",
    role: "",
    email: "",
    phone: "",
    password: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setShowDefault(false);
    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoadingStatus(true);

    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/Create`,
      data: {
        username: formValues.username,
        role: formValues.role,
        fullname: formValues.fullname,
        email: formValues.email,
        phone: formValues.phone,
        password: formValues.password,
        partnerId: parseInt(localStorage.getItem("partnerId")),
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
        Create Admin
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Admin</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.username}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, username: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.fullname}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, fullname: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Role</Form.Label>
                <Form.Select
                  size="sm"
                  value={formValues.role}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, role: d.target.value })
                  }
                >
                  <option>Select</option>
                  <option>Sales</option>
                  <option>Operations</option>
                  <option>Super Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder=""
                  value={formValues.email}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, email: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  size="sm"
                  type="phone"
                  placeholder=""
                  value={formValues.phone}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, phone: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder=""
                  value={formValues.password}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, password: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {isError && isError.status === 400 && (
            <Alert variant="danger">{isError.data.message}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? (
              `Submit`
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
