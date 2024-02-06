import React from "react";
import Footer from "../components/includes/Footer";
import Header from "../components/includes/Header";
import { useSelector } from "react-redux";
import Layout from "./layout";
import { allPublicRoute, logedInRoute } from "./allRoute";
import { Redirect, Route, useLocation, useParams } from "react-router-dom";
import Loader from "../components/common/loader";
function AuthRoute() {
  const { user, loader } = useSelector((state) => state.root);
  const location = useLocation();
  const param = useParams();
  const isLoggedIn = user;

  let path = [`/openCollection`, `/openArt/${param?.id}`];
  return (
    <div style={{ position: "relative" }}>
      {loader?.Loader && <Loader />}

      <Header />

      {isLoggedIn?.token
        ? logedInRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })
        : allPublicRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })}
      {/* <Redirect path="/" /> */}
      <Footer />
    </div>
  );
}

export default AuthRoute;
