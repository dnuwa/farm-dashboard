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

import UpdateDistrict from "../containers/Districts/UpdateDistrict";
import Delete from "../containers/Districts/Delete";
import Axios from "axios";

export const DistrictsTable = ({ reload, setReload }) => {
  const [districts, setRegions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/districts`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setRegions(res.data.data.districts);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { name, region, ID } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={"#"} className="fw-normal">
            {name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{region}</span>
        </td>
        <td>
          <UpdateDistrict id={ID} setReload={setReload} />
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
              <th className="border-bottom">Region</th>
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
              districts.map((t) => <TableRow key={t.ID} {...t} />)
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
