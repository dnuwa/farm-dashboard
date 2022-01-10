import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Alert,
  Spinner,
  Form,
  Button,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import Axios from "axios";

export const OrdersTable = (reload, setReload) => {
  const [orders, setOrders] = useState([]);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/orders/partnerOrders/${localStorage.getItem(
        "partnerId"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // params: { featured: true, limit: 6 },
    })
      .then((res) => {
        setOrders(res.data.data.orders);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const {
      order_id,
      reference_id,
      order_date,
      order_by,
      phone_number,
      payment_method,
      payment_status,
      order_status,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={`order/${order_id}`} className="fw-normal">
            <Button bsPrefix="text" href="#tertiary" variant="tertiary">
              {reference_id}
            </Button>
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {moment(order_date).format("DD MMM YYYY")}
          </span>
        </td>
        <td>
          <span className="fw-normal">{order_by}</span>
        </td>
        <td>
          <span className="fw-normal">{phone_number}</span>
        </td>
        <td>
          <span className="fw-normal">{"N/A"}</span>
        </td>
        <td>
          <span className="fw-normal">{payment_method}</span>
        </td>
        <td>
          <span className="fw-normal">
            <span className="fw-normal">{payment_status}</span>
          </span>
        </td>
        <td>
          <span className="fw-normal">
            <span className="fw-normal">{order_status}</span>
          </span>
        </td>
        <td>
          <Card.Link as={Link} to={`order/${order_id}`} className="fw-normal">
            <FontAwesomeIcon icon={faEye} className="me-2" /> View
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
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Date</th>
              <th className="border-bottom">Customer</th>
              <th className="border-bottom">Contact</th>
              <th className="border-bottom">Order Method</th>
              <th className="border-bottom">Payment Method</th>
              <th className="border-bottom">Payment Status</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Bonuses</th>
              {/* <th className="border-bottom"></th> */}
            </tr>
          </thead>
          {isError && (
            <Alert variant="danger">{`Something wrong happened, contact network admin`}</Alert>
          )}
          <tbody>
            {isError && (
              <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
            )}
            {loadingStatus ? (
              <Spinner animation="border" />
            ) : (
              orders.map((t) => <TableRow key={t.reference_id} {...t} />)
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
