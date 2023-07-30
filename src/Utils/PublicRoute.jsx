import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Navigate, Outlet } from "react-router";
import AppHeader from "../components/AppHeader";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Layout>
      <AppHeader />
      <Content className="bg-white">
        {!user ? <Outlet /> : <Navigate to="/" />}
      </Content>
    </Layout>
  );
};

export default PublicRoute;
