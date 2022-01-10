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
    parent_category: 0,
    membership_type: "Free is defualt",
    dashboard: 1,
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    setLoadingStatus(true);
    if (id) {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_PARTNER_API}/userCategories/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            name: res.data.data.userCat.name,
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
      url: `${process.env.REACT_APP_PARTNER_API}/userCategories/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        name: formValues.name,
        parent_category: formValues.parent_category,
        membership_type: formValues.membership_type,
        dashboard: formValues.dashboard,
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
          <Modal.Title className="h6">Create Category</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={formValues.name}
                onChange={(d) =>
                  onChangeValue({
                    ...formValues,
                    name: d.target.value,
                  })
                }
                required
              />
            </Form.Group>
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
