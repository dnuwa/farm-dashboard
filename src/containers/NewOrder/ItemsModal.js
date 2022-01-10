import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
  Table,
  Nav,
  Card,
  Pagination,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ cart, addToCart }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  // const [loadingStatus, setLoadingStatus] = useState(false);
  // const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [related, setRelatedItems] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_PARTNER_API}/items`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setProducts(res.data.data.items);
      })
      .catch((err) => setIsError(err));
  }, [, limit, page]);

  //add quantity to each item
  const preparedItems = {};

  const [items, setItems] = useState({});

  useEffect(() => {
    if (products.length !== 0) {
      const modified = products.map((obj) => ({ ...obj, quantity: 1 }));

      modified.forEach((item) => {
        preparedItems[item.ID] = item;
      });

      setItems(preparedItems);
    }
  }, [products]);

  const handleQtyChange = (id, qty) => {
    // you probably want to create a new object
    // instead of mutating it in place
    setItems({
      ...items,
      [id]: { ...items[id], quantity: qty !== "" ? parseInt(qty) : 1 },
    });
  };

  return (
    <React.Fragment>
      <Button variant="info" size="sm" onClick={() => setShowDefault(true)}>
        Add Item
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Item to Basket</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Seller</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(items).map((product) => (
                <tr key={product.ID}>
                  <td>{product.product_name}</td>
                  <td>{product.product_owner}</td>
                  <td>{product.local_price}</td>
                  <td>
                    {" "}
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder=""
                      value={product.quantity}
                      onChange={(e) =>
                        handleQtyChange(product.ID, e.currentTarget.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <Button
                      size="sm"
                      variant="info"
                      className="text-white ms-auto"
                      onClick={() => {
                        addToCart([...cart, {
                          ID: product.ID,
                          quantity: product.quantity,
                          featured_image: product.featured_image,
                          product_name: product.product_name,
                          local_price: product.local_price,
                          local_currency: `UGX`,
                        }]);
                        handleClose();
                      }}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
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

          {isError && isError.data.message && (
            <Alert variant="danger">{isError.data.message}</Alert>
          )}
          {isError && !isError.data.message && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
