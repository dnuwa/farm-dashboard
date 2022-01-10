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

export default ({ setReload, id }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    name: "",
    slug: "",
    region: "",
    latitude: "",
    longitude: "",
    type: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/regions`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // params: {
      //   limit: parseInt(limit),
      //   page: parseInt(page),
      // },
    })
      .then((res) => {
        setRegions(res.data.data.regions);
        // setLoadingStatus(false);
      })
      .catch((err) => {
        // setError(err);
        console.log("err", err);
        // setLoadingStatus(false);
      });
  }, []);

  useEffect(() => {
    setLoadingStatus(true);
    if (id) {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_PARTNER_API}/districts/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            name: res.data.data.district.name,
          });
          setLoadingStatus(false);
        })
        .catch((err) => setIsError(err));
    }
  }, [id]);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/districts/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        name: formValues.name,
        slug: formValues.slug,
        region: formValues.region,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        type: formValues.type,
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
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Edit Topical Page</Modal.Title>
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

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Region</Form.Label>
                <Form.Select
                  size="sm"
                  value={formValues.region}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, region: d.target.value })
                  }
                >
                  <option>Select</option>
                  {regions.map(({ ID, name }) => (
                    <option id={ID}>{name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
          )}

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
