import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Spinner,
  Alert,
  Col,
  Row,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import UpdateListing from "../containers/Listings/UpdateListing";
import Delete from "../containers/Listings/Delete";

import Axios from "axios";

export const ListingsTable = ({ reload, setReload }) => {
  const [listings, setItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/items`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setItems(res.data.data.items);
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
      ID,
      product_owner,
      category,
      local_price,
      ussd_enabled,
      product_name,
      is_featured,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={`item/${ID}`} className="fw-normal">
            {ID}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{product_name}</span>
        </td>
        <td>
          <span className="fw-normal">{category}</span>
        </td>
        <td>
          <span className="fw-normal">{product_owner}</span>
        </td>
        <td>
          <span className="fw-normal">{`UGX ${local_price}`}</span>
        </td>
        <td>
          <span className="fw-normal">{ussd_enabled === 1 ? `yes` : `no`}</span>
        </td>
        <td>
          <span className="fw-normal">{is_featured === 0 ? `no` : `yes`}</span>
        </td>
        <td>
          <UpdateListing setReload={setReload} id={ID} />
          <Delete setReload={setReload} id={ID} />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={4} md={2} xl={4}>
            Filter by
            <Row>
              <Col xl={6}>
                <Form.Select
                  value={status}
                  onChange={(d) => setStatus(d.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="">All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </Form.Select>
              </Col>

              <Col xl={6}>
                <Form.Select
                  value={category}
                  onChange={(d) => setCategory(d.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="">All</option>
                  <option value="agro_inputs">Agro inputs</option>
                  <option value="agro_insurance">Agro insurance</option>
                  <option value="extension_services">Extension services</option>
                  <option value="modal_farms">Modal farms</option>
                  <option value="agro_produc">Agro produce</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col xs={8} md={6} lg={5} xl={6} className="ps-md-0 text-end">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center" size="sm">
            <thead>
              <tr>
                <th className="border-bottom">ID</th>
                <th className="border-bottom">Title</th>
                <th className="border-bottom">Category</th>
                <th className="border-bottom">Owner</th>
                <th className="border-bottom">Price</th>
                <th className="border-bottom">USSD</th>
                <th className="border-bottom">Featured</th>
                <th className="border-bottom">Actions</th>
              </tr>
            </thead>
            {isError && (
              <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
            )}
            <tbody>
              {loadingStatus ? (
                <Spinner animation="border" />
              ) : (
                listings.map((t) => <TableRow key={`item-${t.ID}`} {...t} />)
              )}
            </tbody>
          </Table>
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
        </Card.Body>
      </Card>
    </>
  );
};
