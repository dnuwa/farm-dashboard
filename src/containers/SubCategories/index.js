import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import NewProductCategory from "./NewProductCategory";

import { SubCategoryTable } from "../../components/SubCategoryTable";
import Axios from "axios";

export default () => {
  const [reload, setReload] = useState(false);

  let { id } = useParams();
  // const [categories, setCategories] = useState([]);

  const [categories, setCategories] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_PARTNER_API}/categories/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setCategories(res.data.data.category);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, []);

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
            <Breadcrumb.Item active>Sub Categories</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{categories && categories.name} - Sub Categories</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-toolbar mb-2 mb-md-0">
            <NewProductCategory setReload={setReload} />
          </div>
        </div>
      </div>

      <SubCategoryTable reload={reload} setReload={setReload} />
    </>
  );
};
