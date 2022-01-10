import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ id, setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  // const [id, setId] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    update_status: "",
    ussd_enabled: "",
    ussd_bonus: "",
    product_type: "",
    product_name: "",
    slug: "",
    featured_image: "",
    product_images: "",
    demo_video: "",
    total_product_size: "",
    description: "",
    local_price: "",
    last_price: "",
    vendor_price: "",
    vendor_price_last: "",
    local_currency: "",
    us_currency: "",
    measurement_unit: "",
    quality_measures: "",
    quality: "",
    category: "",
    colors: "",
    product_owner: "",
    account_type: "",
    sub_category: "",
    delivery: "",
    returns_data: "",
    guarantee: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    if (id) {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_PARTNER_API}/items/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            update_status: res.data.data.item.update_status,
            ussd_enabled: res.data.data.item.ussd_enabled,
            ussd_bonus: "",
            product_type: "",
            product_name: res.data.data.item.product_name,
            slug: "",
            featured_image: "",
            product_images: "",
            demo_video: "",
            total_product_size: "",
            description: res.data.data.item.description,
            local_price: res.data.data.item.local_price,
            last_price: "",
            vendor_price: "",
            vendor_price_last: "",
            local_currency: res.data.data.item.local_currency,
            us_currency: "",
            measurement_unit: "",
            quality_measures: "",
            quality: "",
            category: res.data.data.item.category,
            colors: "",
            product_owner: res.data.data.item.product_owner,
            account_type: "",
            sub_category: "",
            delivery: "",
            returns_data: "",
            guarantee: "",
          });
          // setData(res.data.data.partner);
          // console.log("res ---", res);
          setLoadingStatus(false);
        })
        .catch((err) => setIsError(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PARTNER_API}/items/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        update_status: parseInt(formValues.update_status),
        ussd_enabled: parseInt(formValues.ussd_enabled),
        ussd_bonus: parseInt(formValues.ussd_bonus || 500),
        product_type: formValues.product_type,
        product_name: formValues.product_name,
        slug: formValues.slug,
        featured_image: formValues.featured_image,
        product_images: formValues.product_images,
        demo_video: formValues.demo_video,
        total_product_size: formValues.total_product_size,
        description: formValues.description,
        local_price: formValues.local_price,
        last_price: formValues.last_price,
        vendor_price: parseInt(formValues.vendor_price || 0),
        vendor_price_last: parseInt(formValues.vendor_price_last || 0),
        local_currency: formValues.local_currency,
        us_currency: formValues.us_currency,
        measurement_unit: formValues.measurement_unit,
        quality_measures: formValues.quality_measures,
        quality: formValues.quality,
        category: formValues.category,
        colors: formValues.colors,
        product_owner: formValues.product_owner,
        account_type: formValues.account_type,
        sub_category: formValues.sub_category || 0,
        delivery: formValues.delivery,
        returns_data: formValues.returns_data,
        guarantee: formValues.guarantee,
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
        setReload(true);
        handleClose();
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  return (
    <React.Fragment>
      <Button
        variant="outline-success"
        className="m-1"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          setShowDefault(true);
        }}
      >
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Update item</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={formValues.product_name}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          product_name: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      size="sm"
                      value={formValues.update_status}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          update_status: d.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="0">Pending Approval</option>
                      <option value="1">Approved</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>USSD Bonus (UGX)</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={formValues.ussd_bonus}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          ussd_bonus: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Show in USSD</Form.Label>
                    <Form.Select
                      size="sm"
                      value={formValues.ussd_bonus}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          ussd_bonus: d.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Price (UGX)</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={formValues.local_price}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          local_price: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Vendor Price (UGX)</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={formValues.vendor_price}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          vendor_price: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>Categories</Form.Label>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Primary</Form.Label>
                    <Form.Select
                      size="sm"
                      value={formValues.category}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          category: d.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Secondary</Form.Label>
                    <Form.Select
                      size="sm"
                      value={formValues.sub_category}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          sub_category: d.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Featured Image (maximum of 8MBs)</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      // value={formValues.ad_file}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          featured_image: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tertiary</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Other Images (maximum of 8MBs)</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      value={formValues.product_images}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          product_images: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>Expected Produce</Form.Label>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Primary</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Secondary</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Demo Video Link</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      // value={formValues.ad_file}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          demo_video: d.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tertiary</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">Home</option>
                      <option value="1">Sidebar</option>
                      <option value="2">Footer</option>
                      <option value="3">Header</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    >
                      <option>Select</option>
                      <option value="0">Home</option>
                      <option value="1">Sidebar</option>
                      <option value="2">Footer</option>
                      <option value="3">Header</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Quality Measures</Form.Label>
                <Form.Check
                  defaultChecked
                  type="radio"
                  defaultValue="option1"
                  label="Germination Percentage"
                  name="exampleRadios"
                  id="radio1"
                  htmlFor="radio1"
                />
                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="Moisture Percentage"
                  name="exampleRadios"
                  id="radio2"
                  htmlFor="radio2"
                />
                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="Affloxitin Percentage"
                  name="exampleRadios"
                  id="radio2"
                  htmlFor="radio2"
                />
                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="Impurity Percentage"
                  name="exampleRadios"
                  id="radio2"
                  htmlFor="radio2"
                />
                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="Broken percentage"
                  name="exampleRadios"
                  id="radio2"
                  htmlFor="radio2"
                />
              </Form.Group>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Packaging Quantity</Form.Label>
                    <Form.Control
                      size="sm"
                      // value={formValues.display}
                      // onChange={(d) =>
                      //   onChangeValue({
                      //     ...formValues,
                      //     display: d.target.value,
                      //   })
                      // }
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Unit of Measurement</Form.Label>
                    <Form.Select
                      size="sm"
                      value={formValues.measurement_unit}
                      onChange={(d) =>
                        onChangeValue({
                          ...formValues,
                          measurement_unit: d.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="g">Gram (G)</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="mt">Metric Tonnes (mt)</option>
                      <option value="litres">Litres (lts)</option>
                      <option value="sq. cm">
                        Square Centimmeter (sq. cm)
                      </option>
                      <option value="sq. ft">Square Foot (sq. ft)</option>
                      <option value="acre">Acre</option>
                      <option value="cm">Centimeter (cm)</option>
                      <option value="m">Meter (m)</option>
                      <option value="pcs">Pieces (pcs)</option>
                      <option value="milliliters">Milliliters</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Label>Colors</Form.Label>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    label="Black"
                    id="checkbox1"
                    htmlFor="checkbox1"
                  />
                </Col>
                <Col>
                  <Form.Check label="Blue" id="checkbox2" htmlFor="checkbox2" />
                </Col>
                <Col>
                  <Form.Check
                    label="Brown"
                    id="checkbox3"
                    htmlFor="checkbox3"
                  />
                </Col>
                <Col>
                  <Form.Check label="Cyan" id="checkbox4" htmlFor="checkbox4" />
                </Col>
                <Col>
                  <Form.Check
                    label="Green"
                    id="checkbox5"
                    htmlFor="checkbox5"
                  />
                </Col>
                <Col>
                  <Form.Check label="Gray" id="checkbox6" htmlFor="checkbox6" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    label="Orange"
                    id="checkbox7"
                    htmlFor="checkbox7"
                  />
                </Col>
                <Col>
                  <Form.Check label="Pink" id="checkbox8" htmlFor="checkbox8" />
                </Col>
                <Col>
                  <Form.Check
                    label="Purple"
                    id="checkbox9"
                    htmlFor="checkbox9"
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="Red"
                    id="checkbox10"
                    htmlFor="checkbox10"
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="White"
                    id="checkbox11"
                    htmlFor="checkbox11"
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="Yellow"
                    id="checkbox12"
                    htmlFor="checkbox12"
                  />
                </Col>
              </Row>

              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={3}
                  value={formValues.description}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      description: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Delivery</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={3}
                  value={formValues.delivery}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      delivery: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Return Policy</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={3}
                  value={formValues.returns_data}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      returns_data: d.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Warranty</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={3}
                  // value={formValues.ad_desc}
                  // onChange={(d) =>
                  //   onChangeValue({
                  //     ...formValues,
                  //     ad_desc: d.target.value,
                  //   })
                  // }
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Check
                  defaultChecked
                  type="radio"
                  defaultValue="option1"
                  label="NEW"
                  name="exampleRadios"
                  id="radio1"
                  htmlFor="radio1"
                />

                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="OLD"
                  name="exampleRadios"
                  id="radio2"
                  htmlFor="radio2"
                />
              </Form.Group>
            </>
          )}
          {isError && !loadingStatus && (
            <Alert variant="danger">{`Something went wrong, contact admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? `Save` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
