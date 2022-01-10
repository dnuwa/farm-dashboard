import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import moment from "moment-timezone";
import Axios from "axios";

export const AdminsTable = ({reload}) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_AUTH_API}/private/v1/admin`).then(
      (res) => {
        const persons = res.data.data.adminUsers;
        setState({ persons });
      }
    );
  }, [, reload]);

  const TableRow = (props) => {
    const { username, fullname, phone, email, role, created, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{username}</span>
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
          <span className="fw-normal">{role}</span>
        </td>
        <td>
          <span className="fw-normal">
            {moment(created).format("DD MMM YYYY")}
          </span>
        </td>
        <td>
          <Card.Link as={Link} to={`admin/${ID}`} className="fw-normal">
            <Button variant="outline-secondary" className="m-1" size="sm">
              <FontAwesomeIcon icon={faEye} className="me-2" /> View
            </Button>
          </Card.Link>
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
              <th className="border-bottom">Username</th>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Created</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.length !== 0 &&
              state.persons
                .filter(
                  (itemInArray) =>
                    itemInArray.partnerId ===
                    parseInt(localStorage.getItem("partnerId"))
                )
                .map((t) => <TableRow key={t.ID} {...t} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
