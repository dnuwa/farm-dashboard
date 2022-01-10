import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Table,
  Dropdown,
  ButtonGroup,
  Alert,
  Pagination,
  Spinner,
  Form,
  Nav,
} from "@themesberg/react-bootstrap";
import UpdatePartner from "../containers/Partners/UpdatePartner";

import Axios from "axios";

export const PartnersTable = ({ reload, setReload }) => {
  const [partners, setPartners] = useState([]);
  const [isError, setError] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/partners`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setPartners(res.data.data.partners);
        setLoadingStatus(false);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, reload]);

  const TableRow = (props) => {
    const { logoUrl, partnername, refeerallink, website, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{logoUrl}</span>
        </td>
        <td>
          <span className="fw-normal">{partnername}</span>
        </td>
        <td>
          <span className="fw-normal">{refeerallink}</span>
        </td>
        <td>
          <span className="fw-normal">{website}</span>
        </td>
        <td>
          <UpdatePartner partnerId={ID} setReload={setReload} />
          {/* <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
              </Dropdown.Item> */}
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
              <th className="border-bottom">Partner name</th>
              <th className="border-bottom">Referal Link</th>
              <th className="border-bottom">Website URL</th>
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
              partners.length !== 0 &&
              partners.map((t) => <TableRow key={t.ID} {...t} />)
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
