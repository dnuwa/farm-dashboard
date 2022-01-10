import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Spinner,
  Alert,
  Form,
} from "@themesberg/react-bootstrap";
import Delete from "../containers/PostsEvents/Delete";
import { Link } from "react-router-dom";

import Axios from "axios";

export const EventsTable = ({ reload, setReload }) => {
  const [events, setAdverts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/blogs`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setAdverts(res.data.data.blogs);
        setLoadingStatus(false);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const {
      created_by,
      tags,
      topical_pages,
      post_type,
      created_at,
      approved,
      ID,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={`posts_events/${ID}`} className="fw-normal">
            {created_by}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{tags}</span>
        </td>
        <td>
          <span className="fw-normal">{topical_pages}</span>
        </td>
        <td>
          <span className="fw-normal">{post_type}</span>
        </td>
        <td>
          <span className="fw-normal">
            {moment(created_at).format("DD MMM YYYY")}
          </span>
        </td>
        <td>
          <span className="fw-normal">{approved}</span>
        </td>
        <td>
          <Card.Link as={Link} to={`posts_events/${ID}`} className="fw-normal">
            {`Manage`}
          </Card.Link>
        </td>
        <td>
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
              <th className="border-bottom">Author</th>
              <th className="border-bottom">Tags</th>
              <th className="border-bottom">Topical Page</th>
              <th className="border-bottom">Post Type</th>
              <th className="border-bottom">Date Created</th>
              <th className="border-bottom">Approved</th>
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
              events.map((t) => <TableRow key={`posts-${t.ID}`} {...t} />)
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
