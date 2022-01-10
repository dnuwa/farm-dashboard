import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default ({setReload}) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    username: "",
    fullname: "",
    role: "",
    email: "",
    phone: "",
    password: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

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
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Create an advert</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
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
                <Form.Label>Email (optional)</Form.Label>
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
                <Form.Label>Phone Number</Form.Label>
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
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
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
                <Form.Label>Country</Form.Label>
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
                <Form.Label>Country</Form.Label>
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
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Primary Role</Form.Label>
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
                <Form.Label>Secondary Role</Form.Label>
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
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ID Number</Form.Label>
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
                <Form.Label>Password</Form.Label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
