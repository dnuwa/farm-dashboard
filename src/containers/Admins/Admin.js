import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Table,
  Spinner,
  Button,
  Form,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default () => {
  let { id } = useParams();

  const [user, setUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [view, setView] = useState("Details");

  const [loadingStatus, setLoadingStatus] = useState(false);

  let initialState = {
    email: "",
    fullname: "",
    partnerId: "",
    phone: "",
    role: "",
    username: "",
    password: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setUser(res.data.data.adminUser);
        onChangeValue({
          ...formValues,
          email: res.data.data.adminUser.email,
          fullname: res.data.data.adminUser.fullname,
          partnerId: res.data.data.adminUser.partnerId,
          phone: res.data.data.adminUser.phone,
          role: res.data.data.adminUser.role,
          username: res.data.data.adminUser.username,
        });
        setLoadingStatus(false);
      })
      .catch((err) => {
        setIsError(err);
        setLoadingStatus(false);
      });
  }, [, view]);

  useEffect(() => {
    setIsSuccess(false);
  }, [view]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        email: formValues.email,
        fullname: formValues.fullname,
        partnerId: formValues.partnerId,
        phone: formValues.phone,
        role: formValues.role,
        username: formValues.username,
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/updatePassword/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        password: formValues.password,
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  return !loadingStatus && user ? (
    <>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col xs={12} xl={3}>
                  <Card border="light" className="shadow-sm">
                    <Table
                      responsive
                      className="align-items-center table-flush"
                    >
                      <tbody>
                        <tr>
                          <th scope="row">
                            <Button
                              bsPrefix="text"
                              href="#"
                              variant="primary"
                              className="m-3"
                              onClick={() => setView("Details")}
                            >
                              Account Details
                            </Button>
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">
                            <Button
                              bsPrefix="text"
                              href="#"
                              variant="primary"
                              className="m-3"
                              onClick={() => setView("Update")}
                            >
                              Edit Profile
                            </Button>
                          </th>
                        </tr>
                        <tr>
                          <th scope="row">
                            <Button
                              bsPrefix="text"
                              href="#"
                              variant="primary"
                              className="m-3"
                              onClick={() => setView("Change")}
                            >
                              Change Password
                            </Button>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
                {view === "Details" && (
                  <Col xs={12} xl={9}>
                    <Card border="light" className="shadow-sm">
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <tbody>
                          <tr>
                            <th scope="col">Full Name:</th>
                            <td>{user.fullname}</td>
                          </tr>
                          <tr>
                            <th scope="row">Username:</th>

                            <td>{user.username}</td>
                          </tr>
                          <tr>
                            <th scope="row">Role:</th>

                            <td>{user.role}</td>
                          </tr>
                          <tr>
                            <th scope="row">Email:</th>

                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <th scope="row">Phone:</th>

                            <td>{user.phone}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                )}
                {view === "Update" && (
                  <Col xs={12} xl={9}>
                    <Card border="light" className="shadow-sm">
                      <Form className="p-3">
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                size="sm"
                                value={formValues.fullname}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    fullname: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                type="text"
                                size="sm"
                                value={formValues.username}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    username: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Role</Form.Label>
                              <Form.Control
                                type="text"
                                size="sm"
                                value={formValues.role}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    role: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type="phone"
                                size="sm"
                                value={formValues.phone}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    phone: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                size="sm"
                                value={formValues.email}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    email: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          {isError && !loadingStatus && (
                            <Alert variant="danger">{`Something went wrong`}</Alert>
                          )}
                          {isSuccess && !loadingStatus && (
                            <Alert variant="success">{`This update was successfull`}</Alert>
                          )}
                        </Row>
                        <Button
                          variant="tertiary"
                          size="sm"
                          className="me-1"
                          onClick={handleUpdate}
                        >
                          Save Changes
                        </Button>
                      </Form>
                    </Card>
                  </Col>
                )}

                {view === "Change" && (
                  <Col xs={12} xl={9}>
                    <Card border="light" className="shadow-sm">
                      <Form className="p-3">
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>New Password</Form.Label>
                              <Form.Control
                                type="text"
                                size="sm"
                                value={formValues.password}
                                onChange={(d) =>
                                  onChangeValue({
                                    ...formValues,
                                    password: d.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>
                          {isError && !loadingStatus && (
                            <Alert variant="danger">{`Something went wrong`}</Alert>
                          )}
                          {isSuccess && !loadingStatus && (
                            <Alert variant="success">{`This update was successfull`}</Alert>
                          )}
                        </Row>
                        <Button
                          variant="tertiary"
                          size="sm"
                          className="me-1"
                          onClick={handleUpdatePassword}
                        >
                          Change Password
                        </Button>
                      </Form>
                    </Card>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Spinner animation="border" />
  );
};
