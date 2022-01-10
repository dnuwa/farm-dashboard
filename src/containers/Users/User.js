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
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Axios from "axios";

export default () => {
  let { userId } = useParams();

  const [user, setUser] = useState(null);
  const [isError, setError] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/users/${userId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setUser(res.data.data.User);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, []);

  const [view, setView] = useState("Details");

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
                              onClick={() => setView("photo")}
                            >
                              Edit Photos
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
                        <tr>
                          <th scope="row">
                            <Button
                              bsPrefix="text"
                              href="#"
                              variant="primary"
                              className="m-3"
                              // onClick={() => setView("Change")}
                            >
                              Subscription
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
                              // onClick={() => setView("Change")}
                            >
                              Products
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
                              // onClick={() => setView("Change")}
                            >
                              Wallet
                            </Button>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
                {view === "Details" && (
                  <Col xs={12} xl={9}>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                      <div className="d-block mb-2 mb-md-0"></div>
                      <div className="btn-toolbar mb-2 d-flex col-4">
                        <Button
                          variant="info"
                          className="m-auto btn-sm text-white"
                          onClick={() => setView("Update")}
                        >
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Edit User
                        </Button>
                        <Card.Link
                          as={Link}
                          to={`/user/${user.ID}/order`}
                          className="fw-normal"
                        >
                          <Button
                            variant="warning"
                            className="m-auto btn-sm text-white ml-2"
                          >
                            <FontAwesomeIcon
                              icon={faCartPlus}
                              className="me-2"
                            />
                            New order
                          </Button>
                        </Card.Link>
                      </div>
                    </div>

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
                              <Form.Label>
                                Account Verification Status
                              </Form.Label>
                              <Form.Select>
                                <option defaultValue>Select</option>
                                <option>Verified</option>
                                <option>Not Verified</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" size="sm" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" size="sm" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="phone" size="sm" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Country</Form.Label>
                              <Form.Select>
                                <option defaultValue>Select</option>
                                <option>Uganda</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="email" size="sm" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Primary Role</Form.Label>
                              <Form.Control type="phone" size="sm" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Secondary Role</Form.Label>
                              <Form.Select>
                                <option defaultValue>Select</option>
                                <option>Independent Farmer</option>
                                <option>Farmers' Group</option>
                                <option>Farmers' Co-operative</option>
                                <option>Farmers' Association</option>
                                <option>Farmers' Federation</option>
                                <option>Farmers' Agent</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Account for</Form.Label>
                              <Form.Check
                                // defaultChecked
                                type="radio"
                                defaultValue="option1"
                                label="Male"
                              />
                              <Form.Check
                                // defaultChecked
                                type="radio"
                                defaultValue="option1"
                                label="Famale"
                              />
                              <Form.Check
                                // defaultChecked
                                type="radio"
                                defaultValue="option1"
                                label="Company"
                              />
                              <Form.Check
                                // defaultChecked
                                type="radio"
                                defaultValue="option1"
                                label="NGO"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>ID Number</Form.Label>
                              <Form.Control type="email" size="sm" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Products or Services you deal in
                              </Form.Label>
                              <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Size or scale of operation
                              </Form.Label>
                              <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>What are you looking for?</Form.Label>
                              <Form.Check label="Buyers" />
                              <Form.Check label="Agro Inputs Suppliers" />
                              <Form.Check label="Equipment or Machinery Suppliers" />
                              <Form.Check label="Financing" />
                              <Form.Check label="Agronomy or Extension Services" />
                              <Form.Check label="Delivery or Freight" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Agro information</Form.Label>
                              <Form.Check label="Agro Commodity Prices" />
                              <Form.Check label="Forex Rates" />
                              <Form.Check label="Guides" />
                              <Form.Check label="Weather Forecast" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button variant="tertiary" size="sm" className="me-1">
                          Save Changes
                        </Button>
                      </Form>
                    </Card>
                  </Col>
                )}

                {view === "photo" && (
                  <Col xs={12} xl={9}>
                    <Card border="light" className="shadow-sm">
                      <Form className="p-3">
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Profile Photo</Form.Label>
                              <Form.Control type="file" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Cover Picture</Form.Label>
                              <Form.Control type="file" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button variant="tertiary" size="sm" className="me-1">
                          Save Change
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
                              <Form.Control type="text" size="sm" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button variant="tertiary" size="sm" className="me-1">
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
