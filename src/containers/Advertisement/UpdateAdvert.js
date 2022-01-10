import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ adId, setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [id, setId] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    ad_title: "",
    ad_desc: "",
    ad_file: "",
    ad_link: "",
    display: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    if (id) {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_PARTNER_API}/adverts/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            ad_title: res.data.data.adverts.ad_title,
            ad_desc: res.data.data.adverts.ad_desc,
            ad_file: res.data.data.adverts.ad_file,
            ad_link: res.data.data.adverts.ad_link,
            display: res.data.data.adverts.display,
          });
          // setData(res.data.data.partner);
          setLoadingStatus(false);
        })
        .catch((err) => setIsError(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/adverts/${id}`,
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
        setReload(true)
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
        onClick={(e) => {
          e.preventDefault();
          setShowDefault(true);
          setId(adId);
        }}
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
          <Modal.Title className="h6">Update an advert</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ad Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.ad_title}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      ad_title: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Ad Description</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={3}
                  value={formValues.ad_desc}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      ad_desc: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ad Link</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.ad_link}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      ad_link: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
                  // value={formValues.ad_file}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      ad_file: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}
          {isError && !loadingStatus && (
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
