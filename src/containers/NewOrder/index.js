import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Table,
  Form,
  Button,
} from "@themesberg/react-bootstrap";
import Axios from "axios";
import ItemsModal from "./ItemsModal";

export default function NewOrder() {
  const [cart, addToCart] = useState([]);

  const [delivery, setDelivery] = useState("pickup");

  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(false);

  //order form state
  let orderInitialState = {
    region: "",
    district: "",
  };

  let [formValues, onChangeValue] = useState(orderInitialState);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/regions`,
      // headers: {
      //   Authorization: `Bearer ${cookie.access_token}`,
      // },
    })
      .then((res) => setRegions(res.data.data.regions))
      .catch((err) => setError(err.response));
  }, []);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/regions/${Number(
        formValues.region
      )}/districts`,
      // headers: {
      //   Authorization: `Bearer ${cookie.access_token}`,
      // },
    })
      .then((res) => setDistricts(res.data.data.districts))
      .catch((err) => setError(err.response));
  }, [formValues.region]);

  const [shippingAmount, setShippingAmount] = useState(0);

  useEffect(() => {
    regions.filter((a) => {
      if (a.ID == formValues.region) {
        setShippingAmount(a);
      }
    });
  }, [formValues.region]);

  const [payement, setPayement] = useState("");

  return (
    <>
      <Row>
        <Card.Body>
          <h5 className="mb-2">NEW ORDER :</h5>
          <Row>
            <Col xs={12} xl={7}>
              <Card border="light" className="shadow-sm mb-3">
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ITEM</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">BAG TOTAL</th>
                      <td>
                        UGX{" "}
                        {Object.values(cart).reduce(
                          (accumulator, current) =>
                            accumulator +
                            parseInt(current.quantity) *
                              parseInt(current.local_price),
                          0
                        )}{" "}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">DELIVERY COST</th>
                      <td>UGX {delivery === "pickup" ? `10,000` : `0`}</td>
                    </tr>
                    <tr>
                      <th scope="row">TOTAL</th>
                      <td>
                        UGX{" "}
                        {Object.values(cart).reduce(
                          (accumulator, current) =>
                            accumulator +
                            parseInt(current.quantity) *
                              parseInt(current.local_price),
                          0
                        ) +
                          (delivery === "pickup"
                            ? 10000
                            : parseInt(
                                shippingAmount === 0
                                  ? 0
                                  : shippingAmount.shipping_amount
                              ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>

              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <div className="d-block mb-2 mb-md-0">
                  <h4>CART</h4>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <ItemsModal cart={cart} addToCart={addToCart} />
                </div>
              </div>
              <Card border="light" className="shadow-sm">
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"> ITEM</th>
                      <th scope="col">QUANTITY</th>
                      <th scope="col">UNIT COST</th>
                      <th scope="col">TOTAL COST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(cart).map((product) => (
                      <tr key={product.ID}>
                        <td>{product.product_name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.local_price}</td>
                        <td>{product.quantity * product.local_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xs={12} xl={5}>
              <Card border="light" className="shadow-sm mb-3">
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">DELIVERY OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Form.Group>
                        <Form.Check
                          checked={delivery === "pickup"}
                          onChange={() => setDelivery("pickup")}
                          type="radio"
                          defaultValue="option1"
                          label="Pickup Station"
                        />

                        <p className="mb-0 pt-0 pb-0">
                          Ready for pickup at our offices within 24 hours for
                          UGX 10,000
                        </p>
                        <Form.Check
                          checked={delivery === "standard"}
                          onChange={() => setDelivery("standard")}
                          type="radio"
                          defaultValue="option1"
                          label="Standard Shipping"
                        />
                        <Form.Label>Region.</Form.Label>
                        <Form.Select
                          className="mb-3"
                          size="sm"
                          value={formValues.region}
                          onChange={(d) =>
                            onChangeValue({
                              ...formValues,
                              region: d.target.value,
                            })
                          }
                        >
                          <option value="">Select</option>
                          {regions.map((region) => (
                            <option key={region.ID} value={region.ID}>
                              {region.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Label>District/Town/Area.</Form.Label>
                        <Form.Select
                          size="sm"
                          className="mb-3"
                          value={formValues.district}
                          onChange={(d) =>
                            onChangeValue({
                              ...formValues,
                              district: d.target.value,
                            })
                          }
                        >
                          <option value="">Select</option>
                          {districts.map(({ ID, name }) => (
                            <option key={ID} value={ID}>
                              {name}
                            </option>
                          ))}
                        </Form.Select>
                        <p className="">Delivered within 24 hours for UGX 0</p>
                      </Form.Group>
                    </tr>
                  </tbody>
                </Table>
              </Card>
              <Card border="light" className="shadow-sm mb-3">
                <Table responsive className="align-items-center table-flush">
                  <tbody>
                    <tr>
                      <Form.Group>
                        <Form.Label>PAYMENT</Form.Label>
                        <Form.Check
                          checked={payement === "mobile"}
                          onChange={() => setPayement("mobile")}
                          type="radio"
                          defaultValue="option1"
                          label="Mobile Money"
                        />
                        <Form.Check
                          checked={payement === "bank"}
                          onChange={() => setPayement("bank")}
                          type="radio"
                          defaultValue="option1"
                          label="Bank Deposit/Transfer"
                        />
                        <Form.Check
                          checked={payement === "wallet"}
                          onChange={() => setPayement("wallet")}
                          type="radio"
                          defaultValue="option1"
                          label="Famunera Wallet"
                        />
                      </Form.Group>
                    </tr>
                    {payement === "wallet" && (
                      <>
                        <Button variant="danger" className="m-3 p-3">
                          Customer's current wallet balance is insufficient to
                          cover this order.
                        </Button>
                        <p className="p-3">
                          This is the simplest form of payment. We shall
                          automatically get your order details and the
                          transaction will be reflected as a Debit in your
                          wallet transactions.
                        </p>
                      </>
                    )}
                  </tbody>
                </Table>
              </Card>
              <Button variant="info" className="m-1" size="sm">
                Crete Order
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Row>
    </>
  );
}
