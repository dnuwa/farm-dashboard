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
    title: "",
    description: "",
    labels: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    country: "",
    location: "",
    banner: "",
    channel_ID: "",
    approved: "",
    created_by: 3357,
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
      url: `${process.env.REACT_APP_PARTNER_API}/blogs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        title: formValues.title,
        description: formValues.description,
        labels: formValues.labels,
        start_date: formValues.start_date,
        start_time: formValues.start_time,
        end_date: formValues.end_time,
        end_time: formValues.end_time,
        country: formValues.country,
        location: formValues.location,
        banner: formValues.banner,
        channel_ID: 0,
        approved: 0,
        created_by: 3357,
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
        Create a blog
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Create a blog</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.title}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, title: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>labels</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.labels}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, labels: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>start_date</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.start_date}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, start_date: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>start_time</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.start_time}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, start_time: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>end_date</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.end_date}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, end_date: d.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>end_time</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.end_time}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, end_time: d.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>location</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.location}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, location: d.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>banner</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  value={formValues.banner}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      banner: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                size="sm"
                type="text"
                placeholder=""
                value={formValues.dscription}
                onChange={(d) =>
                  onChangeValue({ ...formValues, dscription: d.target.value })
                }
              />
            </Form.Group>
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
            {!loadingStatus ? `Save` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
