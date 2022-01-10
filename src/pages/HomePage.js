import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
// import Login from "./Login";
import DashboardOverview from "./dashboard/DashboardOverview";
import Advertisement from "../containers/Advertisement";
import Users from "./Users";
import User from "./User";
import Orders from "./Orders";
import Order from "./Order";
import NewOrder from "./NewOrder";
import Listings from "./Listings";
import Messages from "./Messages";
import AgroCommodityPricesPage from "./AgroCommodityPricesPage";
import ForexRates from "./ForexRates";
import Manuals from "./ManualsPage";
import PostsEvents from "./PostsEvents";
import Event from "./Event";
import TopicalPages from "./TopicalPages";
import Testimonials from "./Testimonials";
import Awords from "./Awords";
import Partners from "./Partners";
import Team from "./Team";
import Settings from "./Settings";
import UserCategories from "./UserCategories";
import ProductCategories from "./ProductCategories"
import SubCategories from "./SubCategories";
import Regions from './Regions';
import Districts from './Districts';
import Rates from './Rates';
import Admins from './Admins';
import Admin from './Admin';
import Transactions from './Transactions';
import ForgotPassword from "./httperrorpages/ForgotPassword";
import ResetPassword from "./httperrorpages/ResetPassword";
import Lock from "./httperrorpages/Lock";
import NotFoundPage from "./httperrorpages/NotFound";
import ServerError from "./httperrorpages/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // const localStorageIsSettingsVisible = () => {
  //   return localStorage.getItem('settingsVisible') === 'false' ? false : true
  // }

  // const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  // const toggleSettings = () => {
  //   setShowSettings(!showSettings);
  //   localStorage.setItem('settingsVisible', !showSettings);
  // }

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      path={Routes.Advertisement.path}
      component={Advertisement}
    />
    <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <RouteWithSidebar exact path={Routes.User.path} component={User} />
    <RouteWithSidebar exact path={Routes.Orders.path} component={Orders} />
    <RouteWithSidebar exact path={Routes.Order.path} component={Order} />
    <RouteWithSidebar exact path={Routes.NewOrder.path} component={NewOrder} />
    <RouteWithSidebar exact path={Routes.Awords.path} component={Awords} />
    <RouteWithSidebar exact path={Routes.Partners.path} component={Partners} />
    <RouteWithSidebar exact path={Routes.Team.path} component={Team} />
    
    <RouteWithSidebar exact path={Routes.Listings.path} component={Listings} />
    <RouteWithSidebar exact path={Routes.Events.path} component={PostsEvents} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Event.path} component={Event} />
    <RouteWithSidebar
      exact
      path={Routes.TopicalPages.path}
      component={TopicalPages}
    />
    <RouteWithSidebar exact path={Routes.Messages.path} component={Messages} />
    <RouteWithSidebar
      exact
      path={Routes.AgroCommodityPricesPage.path}
      component={AgroCommodityPricesPage}
    />
    <RouteWithSidebar
      exact
      path={Routes.ForexRates.path}
      component={ForexRates}
    />
    <RouteWithSidebar exact path={Routes.Manuals.path} component={Manuals} />
    <RouteWithSidebar exact path={Routes.Testimonials.path} component={Testimonials} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.UserCategories.path} component={UserCategories} />
    <RouteWithSidebar exact path={Routes.ProductCategories.path} component={ProductCategories} />
    <RouteWithSidebar exact path={Routes.SubCategories.path} component={SubCategories} />
    <RouteWithSidebar exact path={Routes.Regions.path} component={Regions} />
    <RouteWithSidebar exact path={Routes.Districts.path} component={Districts} />
    <RouteWithSidebar exact path={Routes.Rates.path} component={Rates} />
    <RouteWithSidebar exact path={Routes.Admins.path} component={Admins} />
    <RouteWithSidebar exact path={Routes.Admin.path} component={Admin} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
