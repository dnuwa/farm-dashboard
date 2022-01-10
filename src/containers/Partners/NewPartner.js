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
  const handleClose = () => setShowDefault(false);

  let initialState = {
    partnername: "",
    refeerallink: "",
    website: "",
    logoUrl: "",
    approved: 1,
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_PARTNER_API}/partners`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        partnername: formValues.partnername,
        refeerallink: formValues.refeerallink,
        website: formValues.website,
        logoUrl: formValues.logoUrl,
        approved: 1,
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
        Create New Partner
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Partner</Modal.Title>
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
                  value={formValues.partnername}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      partnername: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Referal Link</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.refeerallink}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      refeerallink: d.target.value,
                    })
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
                <Form.Label>Website</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.website}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, website: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.logoUrl}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, logoUrl: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {isError && (
            <Alert variant="danger">{`Something went wrong, contact Admin`}</Alert>
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
