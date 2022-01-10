import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ partnerId, setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [data, setData] = useState({});
  let initialState = {
    partnername: "",
    refeerallink: "",
    website: "",
    logoUrl: "",
    approved: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/partners/${partnerId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // params: { featured: true, limit: 6 },
    })
      .then((res) => {
        onChangeValue({
          ...formValues,
          partnername: res.data.data.partner.partnername,
          refeerallink: res.data.data.partner.refeerallink,
          website: res.data.data.partner.website,
          logoUrl: res.data.data.partner.logoUrl,
          approved: res.data.data.partner.approved,
        });
        setData(res.data.data.partner);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/partners/${partnerId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        partnername: formValues.partnername,
        refeerallink: formValues.refeerallink,
        website: formValues.website,
        logoUrl: formValues.logoUrl,
        approved: formValues.approved,
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
            <Alert variant="danger">{`Something went wrong, contact admin`}</Alert>
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
