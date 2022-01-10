import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCog,
  faSignOutAlt,
  faTimes,
  faUser,
  faFilm,
  faMoneyCheckAlt,
  faShoppingCart,
  faBoxes,
  faFileInvoiceDollar,
  faEnvelope,
  faStickyNote,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
// import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const [partner, setPartner] = useState("");

  useEffect(() => {
    setPartner(localStorage.getItem("partnerId"));
  }, []);

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={'#'}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {/* <NavItem title="Volt React" link={Routes.Presentation.path} image={ReactHero} /> */}

              <NavItem title="Famunera" />
              <NavItem
                title="Dashboard"
                link={Routes.DashboardOverview.path}
                icon={faChartPie}
              />
              {partner === "1" && (
                <NavItem
                  title="Advertisement"
                  icon={faFilm}
                  link={Routes.Advertisement.path}
                />
              )}
              {partner === "1" && (
                <NavItem title="Users" icon={faUser} link={Routes.Users.path} />
              )}
              <NavItem
                title="Orders"
                icon={faShoppingCart}
                link={Routes.Orders.path}
              />
              {partner === "1" && (
                <NavItem
                  title="Listings"
                  icon={faBoxes}
                  link={Routes.Listings.path}
                />
              )}

              {partner === "1" && (
                <CollapsableNavItem
                  eventKey="community/"
                  title="Community"
                  icon={faComments}
                >
                  <NavItem
                    title="Posts/ Events"
                    link={Routes.Events.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Posts/ Pages"
                    link={Routes.TopicalPages.path}
                    icon={faCircle}
                  />
                </CollapsableNavItem>
              )}

              <NavItem
                title="Transactions"
                icon={faMoneyCheckAlt}
                link={Routes.Transactions.path}
              />

              {partner === "1" && (
                <NavItem
                  title="Messages"
                  icon={faEnvelope}
                  link={Routes.Messages.path}
                />
              )}

              {partner === "1" && (
                <CollapsableNavItem
                  eventKey="pages/"
                  title="Pages"
                  icon={faStickyNote}
                >
                  <NavItem
                    title="Commodity Prices"
                    link={Routes.AgroCommodityPricesPage.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Forex Rates Page"
                    link={Routes.ForexRates.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Download Guides"
                    link={Routes.Manuals.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Testimonials"
                    link={Routes.Testimonials.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Awards"
                    link={Routes.Awords.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Partners"
                    link={Routes.Partners.path}
                    icon={faCircle}
                  />
                  <NavItem
                    title="Team Members"
                    link={Routes.Team.path}
                    icon={faCircle}
                  />
                </CollapsableNavItem>
              )}

              {/* <NavItem
                title="Settings"
                icon={faCog}
                link={Routes.Settings.path}
              /> */}

              <CollapsableNavItem
                eventKey="settings/"
                title="Settings"
                icon={faCog}
              >
                {partner === "1" && (
                  <NavItem
                    title="User Categories"
                    link={Routes.UserCategories.path}
                    icon={faCircle}
                  />
                )}
                {partner === "1" && (
                  <NavItem
                    title="Product Categories"
                    link={Routes.ProductCategories.path}
                    icon={faCircle}
                  />
                )}
                {partner === "1" && (
                  <NavItem
                    title="Delivery Regions"
                    link={Routes.Regions.path}
                    icon={faCircle}
                  />
                )}
                {partner === "1" && (
                  <NavItem
                    title="Delivery Districts"
                    link={Routes.Districts.path}
                    icon={faCircle}
                  />
                )}
                {/* {partner === "1" && (
                  <NavItem
                    title="Membership Rates"
                    link={Routes.Rates.path}
                    icon={faCircle}
                  />
                )} */}

                <NavItem
                  title="Admin users"
                  link={Routes.Admins.path}
                  icon={faCircle}
                />
              </CollapsableNavItem>

              <Button
                variant="primary"
                className="m-1"
                onClick={() => {
                  localStorage.clear();
                  document.location.href = "/";
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2 pl-0" />{" "}
                Logout
              </Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
