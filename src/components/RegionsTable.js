import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Alert,
  Spinner,
  Form,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

import UpdateRgions from "../containers/Regions/UpdateRegion";
// import Delete from "../containers/Regions/Delete";

export const RegionsTable = ({ reload, setReload }) => {
  const [regions, setRegions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/regions`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setRegions(res.data.data.regions);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { name, shipping_amount, show_in_ussd, order_no, ID } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={"#"} className="fw-normal">
            {name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{shipping_amount}</span>
        </td>
        <td>
          <span className="fw-normal">{show_in_ussd === 1 ? `Yes` : `No`}</span>
        </td>
        <td>
          <span className="fw-normal">{order_no}</span>
        </td>
        <td>
          <UpdateRgions id={ID} setReload={setReload} />
          {/* <Delete id={ID} setReload={setReload} /> */}
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
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Shipping Amount (UGX)</th>
              <th className="border-bottom">Show in USSD</th>
              <th className="border-bottom">Order</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError && (
              <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
            )}
            {loadingStatus ? (
              <Spinner animation="border" />
            ) : (
              regions.map((t) => <TableRow key={`r-${t.ID}`} {...t} />)
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
