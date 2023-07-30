import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import AppHeader from "../components/AppHeader";
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <AppHeader />
      <Content className="bg-white">
        {user ? <Outlet /> : <Navigate to="/login" />}
      </Content>
    </Layout>
  );
};

export default ProtectedRoute;
