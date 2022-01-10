import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import NewProductCategory from "./NewProductCategory";

import { ProductCategoryTable } from "../../components/ProductCategoryTable";

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
            <Breadcrumb.Item active>Product Categories</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Product Categories</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-toolbar mb-2 mb-md-0">
            <NewProductCategory setReload={setReload} />
          </div>
        </div>
      </div>

      <ProductCategoryTable reload={reload} setReload={setReload} />
    </>
  );
};
