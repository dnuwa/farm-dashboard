import React, { useState } from "react";
import {
  Button,
  Modal,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ adId, setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_PARTNER_API}/items/${adId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        setIsError(err);
      });
  };

  return (
    <React.Fragment>
      <Button
        variant="outline-danger"
        className="m-1"
        size="sm"
        onClick={() => setShowDefault(true)}
      >
        <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="sm"
      >
        <Modal.Header>
          <Modal.Title className="h6">Confirm</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to delete this item?</div>

          {isError && !loadingStatus && (
            <Alert variant="danger">{`Something went wrong, contact admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-denger ms-auto"
            onClick={handleClick}
          >
            {!loadingStatus ? `Yes` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
