import React, { useState, useEffect } from "react";
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

import UpdateProductCategory from "../containers/ProductCategories/UpdateProductCategory";
import Delete from "../containers/ProductCategories/Delete";
import Axios from "axios";

export const ProductCategoryTable = ({ reload, setReload }) => {

  const [categories, setCategories] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/categories/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setCategories(res.data.data.categories);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { name, cat_for, display_order, sub_categories, ID } = props;

    return (
      <tr>
        <td>{name}</td>
        <td>
          <span className="fw-normal">{cat_for}</span>
        </td>
        <td>
          <span className="fw-normal">Show</span>
        </td>
        <td>
          <span className="fw-normal">{display_order}</span>
        </td>
        <td>
          <span className="fw-normal">
            <Card.Link
              as={Link}
              to={`sub_categories/${ID}`}
              className="fw-normal"
            >
              <Button variant="tertiary" size="sm">
                Manage({sub_categories.length})
              </Button>
            </Card.Link>
          </span>
        </td>
        <td>
          <UpdateProductCategory id={ID} setReload={setReload} />
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
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Category for</th>
              <th className="border-bottom">Show in menu</th>
              <th className="border-bottom">Display Order</th>
              <th className="border-bottom">Sub Categories</th>
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
              categories.map((t) => <TableRow key={`cat-${t.ID}`} {...t} />)
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
