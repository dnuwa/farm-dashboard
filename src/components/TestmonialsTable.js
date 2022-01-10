import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Form,
  Alert,
  Spinner
} from "@themesberg/react-bootstrap";

import UpdateTestimonial from "../containers/Testimonials/UpdateTestimonial";
import Delete from "../containers/Testimonials/Delete";
import Axios from "axios";

export const TestmonialsTable = ({ id, reload, setReload }) => {
  // const totalTestimonials = testimonials.length;

  const [testimonials, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/testimonials`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setUsers(res.data.data.testimonials);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { thumbnail, description, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal"><img
              src={`https://famunera-uploads.s3.us-east-2.amazonaws.com/${thumbnail}`}
            /></span>
        </td>
        <td>
          <span
            className="fw-normal"
            dangerouslySetInnerHTML={{ __html: description }}
          ></span>
        </td>
        <td>
          <UpdateTestimonial id={ID} setReload={setReload} />
          <Delete id={ID} setReload={setReload} />
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
              <th className="border-bottom">Image</th>
              <th className="border-bottom">Description</th>
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
              testimonials.map((t) => <TableRow key={t.ID} {...t} />)
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
