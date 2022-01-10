import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  FormCheck,
  Container,
  InputGroup,
  Alert,
  Spinner,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  let initialState = {
    identity: "",
    password: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoadingStatus(true);
    ////private/v1
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/Login`,
      data: {
        identity: formValues.identity,
        password: formValues.password,
      },
    })
      .then((res) => {
        setSuccess(res);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setError(err.response);
      });
  };

  useEffect(() => {
    if (success.status === 200) {
      localStorage.setItem("user", success.data.data.token);
      localStorage.setItem("partnerId", success.data.data.user.partnerId);
      setLoadingStatus(false);
      window.location.reload(false);
    }
  }, [success, error]);

  //Todo {error management}
  //set access token
  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/auth/token`,
      headers: {
        clientId: `5sTvsLjd3edGQbpTfJ5YGk0Gs1UDSsQf`,
        clientSecret: `JCSQNZ0xKgr-U2OUeewlgTrGpuntXJna90OortwEgTdZ_vjk8QS_qAuylGfGEUAp`,
      },
    })
      .then((res) =>
        //set access cookie
        localStorage.setItem("access_token", res.data.token)
      )
      .catch((err) => console.error("expired-access-coockie", err.response));
  }, []);

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to Famunera</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        placeholder="Username"
                        value={formValues.identity}
                        onChange={(d) =>
                          onChangeValue({
                            ...formValues,
                            identity: d.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          value={formValues.password}
                          onChange={(d) =>
                            onChangeValue({
                              ...formValues,
                              password: d.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                    </div>
                    {error && error.status === 400 && (
                      <Alert variant="danger">{error.data.message}</Alert>
                    )}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={handleSubmit}
                  >
                    {!loadingStatus ? (
                      `Sign in`
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Login;
