import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Card, Table } from "@themesberg/react-bootstrap";
import Axios from "axios";
import PaymentStatusUpdate from "./PaymentStatusUpdate";
import OrderStatusUpdate from "./OrderStatusUpdate";
import moment from "moment-timezone";

export default () => {
  let { ref } = useParams();

  const [order, setOrder] = useState(null);
  const [isError, setError] = useState(false);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/orders/${ref}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setOrder(res);
        setReload(false);
      })
      .catch((err) => setError(err));
  }, [, reload]);

  return (
    order && (
      <>
        <Row>
          <Col xs={12} xl={12}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">ORDER: {ref}</h5>
                <Row>
                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Details</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Order Date</th>
                            <th scope="col">
                              {moment(order.data.data.order.order_date).format(
                                "DD MMM YYYY"
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{`Customer`}</th>
                            <td>
                              {order.data.data.order.order_by || `not set`}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">{`Address`}</th>
                            <td>{`null value`}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Status</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <tbody>
                          <tr>
                            <th scope="col" className="border">
                              Payment Method
                            </th>
                            <th scope="col" className="border">
                              {order.data.data.order.payment_method}
                            </th>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border"
                            >{`Payment Status`}</th>
                            <PaymentStatusUpdate
                              status={order.data.data.order.payment_status}
                              id={ref}
                              reload={reload}
                              setReload={setReload}
                            />
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border"
                            >{`Order Status`}</th>
                            <OrderStatusUpdate
                              status={order.data.data.order.order_status}
                              id={ref}
                              reload={reload}
                              setReload={setReload}
                            />
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Summary</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <tbody>
                          <tr>
                            <th scope="col" className="border">
                              Total
                            </th>
                            <th scope="col" className="border">
                              {order.data.data.order.cart_total}
                            </th>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border"
                            >{`Delivery Fee`}</th>
                            <td>{order.data.data.order.shipping_charge}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border"
                            >{`Service Fee`}</th>
                            <td className="border">{`0`}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border"
                            >{`Grand Total`}</th>
                            <td className="border">
                              {order.data.data.order.cart_total +
                                order.data.data.order.shipping_charge}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={12}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                  <h5 className="mb-1">ORDER ITEMS</h5>
                  <div>
                    Total Calculated Bonus:{" "}
                    {order.data.data.order.items.reduce(
                      (accumulator, current) =>
                        accumulator +
                        parseInt(current.order_quantity) *
                          parseInt(current.product.ussd_bonus),
                      0
                    )}{" "}
                    UGX
                  </div>
                </div>
                <Row>
                  <Col xs={12} xl={12}>
                    <Card border="light" className="shadow-sm">
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Bonus per each</th>
                            <th scope="col">Total bonus on each</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.data.data.order.items.map(
                            ({ order_quantity, product }) => (
                              <tr key={product.ID}>
                                <th scope="row">{product.product_name}</th>
                                <td>{product.local_price}</td>
                                <td>{order_quantity}</td>
                                <td>{product.ussd_bonus}</td>
                                <td>
                                  {parseInt(order_quantity) *
                                    parseInt(product.ussd_bonus)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
            <Card border="light" className="shadow-sm">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" colspan="3"></th>
                      <th scope="col" colspan="2">
                        Vendor
                      </th>
                      <th scope="col" colspan="3">
                        Famunera
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price (UGX)</th>
                      <th scope="col">Total (UGX)</th>
                      <th scope="col">Price (UGX)</th>
                      <th scope="col">Total (UGX)</th>
                      <th scope="col">Margin (UGX)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.data.data.order.items.map(
                      ({ order_quantity, product }) => (
                        <tr key={product.ID}>
                          <th scope="row">{product.product_name}</th>
                          <td>{product.vendor_price}</td>
                          <td>{order_quantity}</td>
                          <td>{product.vendor_price}</td>
                          <td>{product.vendor_price}</td>
                          {/* <td>{product.local_price}</td> */}
                          <td>{product.vendor_price}</td>
                          <td>{product.last_price}</td>
                          <td>
                            {parseInt(
                              product.last_price !== "" ? product.last_price : 0
                            ) -
                              parseInt(
                                product.vendor_price !== ""
                                  ? product.vendor_price
                                  : 0
                              )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                  {/* <thead>
                    <tr>
                      <th scope="col" colspan="3">
                        Total
                      </th>
                      <th scope="col" colspan="2">
                        N/A
                      </th>
                      <th scope="col" colspan="2">
                        N/A
                      </th>
                      <th scope="col" colspan="1">
                        N/A
                      </th>
                    </tr>
                  </thead> */}
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};
