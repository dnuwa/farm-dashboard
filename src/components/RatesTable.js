import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import rates from "../data/xrates";

import Delete from "../containers/Rates/Delete";
import UpdateRate from "../containers/Rates/UpdateRate";

export const RatesTable = ({ reload, setReload }) => {
  const totalRates = rates.length;

  const TableRow = (props) => {
    const { months, amount, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{months}</span>
        </td>
        <td>
          <span className="fw-normal">{amount}</span>
        </td>
        <td>
          <UpdateRate id={ID} setReload={setReload} />
          <Delete id={ID} setReload={setReload} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center"size="sm">
          <thead>
            <tr>
              <th className="border-bottom">No. of Months</th>
              <th className="border-bottom">Amount in UGX</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((t) => (
              <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalRates}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
