import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Form, Col } from "@themesberg/react-bootstrap";
import Axios from "axios";

const Event = () => {
  let { id } = useParams();

  const [post, setPost] = useState(null);
  const [isError, setError] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(false);

  let initialState = {
    status: "",
    page_type: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/blogs/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setPost(res.data.data.blog);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, []);

  return !loadingStatus && post ? (
    <>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Col className="col-3">
          <Form.Label>Approval Status</Form.Label>
          <Form.Select
            value={formValues.status}
            onChange={(d) =>
              onChangeValue({ ...formValues, status: d.target.value })
            }
          >
            <option>Select</option>
            <option value="1">Pending Approval</option>
            <option value="2">Approve</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Col className="col-3">
          <Form.Label>Topical Page</Form.Label>
          <Form.Select
            value={formValues.page_type}
            onChange={(d) =>
              onChangeValue({ ...formValues, page_type: d.target.value })
            }
          >
            <option>Select</option>
            <option value="0">Crop Farming </option>
            <option value="1">Internship & Apprentiship</option>
            <option value="2">Livestock Farming</option>
          </Form.Select>
        </Col>
      </Form.Group>
    </>
  ) : (
    <Spinner animation="border" />
  );
};

export default Event;
