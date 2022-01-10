import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import { RatesTable } from "../../components/RatesTable";
import NewRates from "./NewRates";

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
            <Breadcrumb.Item active>Rates</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Rates</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <NewRates setReload={setReload} />
        </div>
      </div>

      <RatesTable reload={reload} setReload={setReload} />
    </>
  );
};
