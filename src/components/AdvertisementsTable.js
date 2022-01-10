import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Spinner,
  Alert,
  Form
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import UpdateAdvert from "../containers/Advertisement/UpdateAdvert";
import Delete from "../containers/Advertisement/Delete";
import Axios from "axios";

export const AdvertisementsTable = ({ setReload, reload }) => {
  const [ads, setAds] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/adverts`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // Pagination not implemented
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setAds(res.data.data.adverts);
        setLoadingStatus(false);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { id, ad_desc, ad_file, ad_link, ad_title } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={`advert/${id}`} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{ad_title}</span>
        </td>
        <td>
          <span className="fw-normal">{ad_file}</span>
        </td>
        <td>
          <span className="fw-normal">{ad_desc}</span>
        </td>
        <td>
          <span className="fw-normal">{ad_link}</span>
        </td>
        <td className="d-lg-flex">
          <UpdateAdvert adId={id} setReload={setReload} />
          <Delete adId={id} setReload={setReload} />
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
              <th className="border-bottom">S/No</th>
              <th className="border-bottom">Ad Title</th>
              <th className="border-bottom">Ad File</th>
              <th className="border-bottom">Ad Display</th>
              <th className="border-bottom">Ad Link</th>
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
              ads.map((t) => <TableRow key={`advert-${t.id}`} {...t} />)
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
                <Pagination.Item>{page}</Pagination.Item>
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
