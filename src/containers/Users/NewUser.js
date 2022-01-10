import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    name: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    id_no: "",
    Password: "",
    gender: "",
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
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/users/Create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        role: formValues.role,
        country: formValues.country,
        id_no: formValues.id_no,
        partnerId: parseInt(localStorage.getItem("partnerId")),
        Password: formValues.Password,
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
        Add User
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add User</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.name}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, name: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Email (optional)</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
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
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
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
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.address}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, address: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Country</Form.Label>
                <Form.Select
                  value={formValues.country}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, country: d.target.value })
                  }
                >
                  <option value="">Select country</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>I am a...</Form.Label>
                <Form.Select
                  value={formValues.gender}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, gender: d.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Company">Company</option>
                  <option value="NGO">NGO</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Primary Role</Form.Label>
                {/* <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.role}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, role: d.target.value })
                  }
                /> */}
                <Form.Select
                  value={formValues.role}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, role: d.target.value })
                  }
                >
                  <option value="">Select role</option>
                  <option value="farmer">Farmer</option>
                  <option value="manufacturer">
                    Farm Inputs Manufacturer / Supplier
                  </option>
                  <option value="processor">Food Processors</option>
                  <option value="service_provider">
                    Agro service Provider
                  </option>
                  <option value="buyer">Agro Produce Buyer (Only)</option>
                  <option value="dealer">Farmer Inputs Dealer</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Secondary Role</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.role}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, role: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>ID Numbers</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.id_no}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, id_no: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.password}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, password: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {isError && isError.data.message && (
            <Alert variant="danger">{isError.data.message}</Alert>
          )}
          {isError && !isError.data.message && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? (
              `Add user`
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
