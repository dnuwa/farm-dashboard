import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Breadcrumb,
  InputGroup,
} from "@themesberg/react-bootstrap";
import NewAword from "./NewAword";

import { AwordsTable } from "../../components/AwordsTable";

export default () => {
  const [reload, setReload] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <div className="d-block mb-2 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Famunera</Breadcrumb.Item>
            <Breadcrumb.Item active>Awards</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Awards</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <NewAword setReload={setReload} />
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <AwordsTable reload={reload} setReload={setReload} />
    </>
  );
};
