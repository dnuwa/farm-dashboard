import React, { useEffect, useState } from "react";
import {
  faBoxes,
  faUser,
  faShoppingCart,
  faMoneyBill,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/Widgets";
import Axios from "axios";

export default () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${
        process.env.REACT_APP_PARTNER_API
      }/orders/partnerOrders/${localStorage.getItem("partnerId")}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setOrders(res.data.data.orders))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_AUTH_API}/private/v1/admin/users/all`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(1000000),
        page: parseInt(1),
      },
    })
      .then((res) => setUsers(res.data.data.Users))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/items`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(1000000),
        page: parseInt(1),
      },
    })
      .then((res) => setProducts(res.data.data.items))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/transactions`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(1000000),
        page: parseInt(1),
      },
    })
      .then((res) => setTransactions(res.data.data.transactions))
      .catch((err) => setError(err));
  }, []);



  const [admins, setState] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_AUTH_API}/private/v1/admin`).then((res) => {
      const persons = res.data.data.adminUsers;
      setState({ persons });
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h4>Dashboard</h4>
      </div>

      <Row className="">
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Users"
            title={users.length !== 0 ? users.length : 0}
            icon={faUser}
            iconColor="shape-secondary"
          />
          {/* this has been commented for future ref */}
          {/* <CounterWidget
            category="Bonuses"
            title={`${orders.reduce(
              (accumulator, current) =>
                accumulator + parseInt(current.bonus_total || 0),
              0
            )} UGX`}
            icon={faMoneyBill}
            iconColor="shape-secondary"
          /> */}
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Products"
            title={products.length!== 0 ? products.length : 0}
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faBoxes}
            iconColor="red"
          />
          {/* <CounterWidget
            category="Admins"
            title={
              admins.length !== 0 &&
              admins.persons.filter(
                (itemInArray) =>
                  itemInArray.partnerId ===
                  parseInt(localStorage.getItem("partnerId"))
              ).length
            }
            icon={faUser}
            iconColor="shape-secondary"
          /> */}
        </Col>

        {/* {localStorage.getItem("partnerId") === 1 && (
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category="Products"
              title="1302"
              icon={faBoxes}
              iconColor="shape-tertiary"
            />
          </Col>
        )} */}

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Orders"
            title={orders.length}
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faShoppingCart}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Quotations"
            title={transactions.length !== 0 ? transactions.length : 0}
            icon={faClipboardList}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>
      <Row className="">
        <Col xs={12} sm={6} xl={3} className="mb-4">
          {/* <CounterWidget
            category="Users"
            title={users.length !== 0 ? users.length : 0}
            icon={faUser}
            iconColor="shape-secondary"
          /> */}
          {/* this has been commented for future ref */}
          <CounterWidget
            category="Bonuses"
            title={`${orders.reduce(
              (accumulator, current) =>
                accumulator + parseInt(current.bonus_total || 0),
              0
            )} UGX`}
            icon={faMoneyBill}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          
          <CounterWidget
            category="Admins"
            title={
              admins.length !== 0 &&
              admins.persons.filter(
                (itemInArray) =>
                  itemInArray.partnerId ===
                  parseInt(localStorage.getItem("partnerId"))
              ).length
            }
            icon={faUser}
            iconColor="shape-secondary"
          />
        </Col>

        {localStorage.getItem("partnerId") === 1 && (
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category="Products"
              title="1302"
              icon={faBoxes}
              iconColor="shape-tertiary"
            />
          </Col>
        )}
      </Row>
    </>
  );
};
