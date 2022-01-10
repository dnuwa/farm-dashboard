import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Pagination,
  Alert,
  Spinner,
  Form,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import UpdateUser from "../containers/Users/UpdateUser";
import Axios from "axios";

export const UsersTable = ({reload, setReload}) => {
  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/users/all`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setUsers(res.data.data.Users);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { ID, fullname, phone, email, account_status, subscription_status } =
      props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={`user/${ID}`} className="fw-normal">
            {ID}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{fullname}</span>
        </td>
        <td>
          <span className="fw-normal">{phone}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className="fw-normal">{account_status}</span>
        </td>
        <td>
          <span className="fw-normal">{}</span>
        </td>
        <td>
          <span className="fw-normal">{subscription_status}</span>
        </td>
        <td className="d-lg-flex">
          <Card.Link as={Link} to={`user/${ID}`} className="fw-normal">
            <Button variant="outline-secondary" className="m-1" size="sm">
              <FontAwesomeIcon icon={faEye} className="me-2" /> View
            </Button>
          </Card.Link>

          <UpdateUser setReload={setReload} />
          <Button variant="outline-danger" className="m-1" size="sm">
            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center" size="sm">
          <thead>
            <tr>
              <th className="border-bottom">Id</th>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Verification</th>
              {/* <th className="border-bottom">Subscription</th> */}
              <th className="border-bottom">Registered</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {isError && (
              <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
            )}
            {loadingStatus ? (
              <Spinner animation="border" />
            ) : (
              users.map((t) => <TableRow key={t.ID} {...t} />)
            )}
          </tbody>
        </Table>
        {!loadingStatus && (
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => (page !== 0 ? setPage(page - 1) : 1)}
                >
                  Previous
                </Pagination.Prev>
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)}>
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              {/* Showing */}
              <Form.Select
                value={limit}
                onChange={(d) => setLimit(d.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Select>
            </small>
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
};
