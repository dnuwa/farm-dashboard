import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Form,
  Alert,
  Spinner,
} from "@themesberg/react-bootstrap";
import UpdateCommodity from "../containers/AgroCommodityPricesPage/UpdateCommodity";
import Delete from "../containers/AgroCommodityPricesPage/Delete";
import Axios from "axios";

export const AgroCommodityPricesPageTable = ({ reload, setReload }) => {
  const [items, setItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/commodities`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setItems(res.data.data.commodities);
        setLoadingStatus(false);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { commodity_name, unit, whole_sale_price, retail_price, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{commodity_name}</span>
        </td>
        <td>
          <span className="fw-normal">{unit}</span>
        </td>
        <td>
          <span className="fw-normal">{whole_sale_price}</span>
        </td>
        <td>
          <span className="fw-normal">{retail_price}</span>
        </td>
        <td>
          <UpdateCommodity id={ID} setReload={setReload} />
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
              <th className="border-bottom">Commodity Name</th>
              <th className="border-bottom">Unit</th>
              <th className="border-bottom">Whole Sale Price(WP)</th>
              <th className="border-bottom">Retail Price(RP)</th>
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
              items.map((t) => <TableRow key={`comm-${t.ID}`} {...t} />)
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
                <option value="150">150</option>
              </Form.Select>
            </small>
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
};
