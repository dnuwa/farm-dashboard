import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Alert,
} from "@themesberg/react-bootstrap";
import UpdateTopicalPage from "../containers/TopicalPages/UpdateTopicalPage";
import Delete from "../containers/TopicalPages/Delete";

import Axios from "axios";

export const PagesTable = ({ reload, setReload }) => {
  const [topicalPages, setPages] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/blogChannels`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setPages(res.data.data.blogChannels);
        setReload(false);
      })
      .catch((err) => setError(err));
  }, [, reload]);

  const TableRow = (props) => {
    const { title, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{title}</span>
        </td>
        <td>
          <UpdateTopicalPage setReload={setReload} id={ID} />
          <Delete setReload={setReload} id={ID} />
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
              <th className="border-bottom">Title</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          {isError && (
            <Alert variant="danger">{`Something wrong happened, contact network admin`}</Alert>
          )}
          <tbody>
            {topicalPages.map((t) => (
              <TableRow key={`page-${t.ID}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
