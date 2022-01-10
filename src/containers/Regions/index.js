import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Breadcrumb,
} from "@themesberg/react-bootstrap";

import { RegionsTable } from "../../components/RegionsTable";
import NewRegion from './NewRegion';

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
            <Breadcrumb.Item active>Regions</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Regions</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-toolbar mb-2 mb-md-0">
            <NewRegion setReload={setReload} />
          </div>
        </div>
      </div>

      <RegionsTable reload={reload} setReload={setReload}/>
    </>
  );
};

