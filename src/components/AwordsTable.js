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
import Axios from "axios";
import UpdateAword from "../containers/Awords/UpdateAword";
import Delete from "../containers/Awords/Delete";

export const AwordsTable = ({ reload, setReload }) => {
  const [awords, setAwords] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/awards`,
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      // },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setAwords(res.data.data.awards);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const TableRow = (props) => {
    const { thumbnail, link, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">
            <img
              src={`https://famunera-uploads.s3.us-east-2.amazonaws.com/${thumbnail}`}
            />
          </span>
        </td>
        <td>
          <span className="fw-normal">{link}</span>
        </td>
        <td>
          <UpdateAword id={ID} setReload={setReload} />
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
              <th className="border-bottom">Link</th>
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
              awords.map((t) => <TableRow key={`a-${t.ID}`} {...t} />)
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
