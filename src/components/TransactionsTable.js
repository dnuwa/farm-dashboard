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

import Delete from "../containers/Team/Delete";
import UpdateMember from "../containers/Team/UpdateMember";
import Axios from "axios";

export const TransactionsTable = ({ setReload, reload }) => {
  const [transactions, setTransactions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/transactions`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setTransactions(res.data.data.transactions);
        setLoadingStatus(false);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { user_ID, phone, type, amount, other_information, created_at, ID, status } = props;

    return (
      <tr>
        <td>
          
            {user_ID}
          
        </td>
        <td>
          N/A
        </td>
        <td>
          N/A
        </td>
        <td>
          UGX {amount}
        </td>
        <td>
          N/A
        </td>
        {/* <td>
          <span
            className="fw-normal"
            dangerouslySetInnerHTML={{ __html: other_information }}
          >
        </td> */}
        <td>
          {created_at}
        </td>
        <td>
          {status || `N/A`}
          {/* <UpdateMember id={ID} setReload={setReload} />
          <Delete id={ID} setReload={setReload} /> */}
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
              <th className="border-bottom">Customer</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Type</th>
              <th className="border-bottom">Amount</th>
              <th className="border-bottom">Details</th>
              <th className="border-bottom">Created</th>
              <th className="border-bottom">Status</th>
            </tr>
          </thead>
          {/* {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )} */}
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            transactions.map((t) => <TableRow key={t.ID} {...t} />)
          )}
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
