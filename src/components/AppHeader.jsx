import { Avatar, Button, Popover } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router";

const AppHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <Header className="bg-blue-50 flex  justify-between items-center px-14 ">
      <h1
        className="text-blue-900 tracking-widest text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Befit🩺
      </h1>

      {user && (
        <Popover
          content={
            <div className="flex flex-col space-y-4">
              <Button
                type="default"
                className="cursor-pointer bg-green-500 text-white"
                onClick={() => {
                  //on click can be applied
                  if (user.role === "admin") navigate("/admin");
                  else navigate("/profile");
                }}
              >
                {user.role === "admin" ? "Dashboard" : "Profile"}
              </Button>
              <Button
                type="default"
                danger
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          }
        >
          <Avatar className="bg-blue-400 cursor-pointer">
            {user.name.substring(0, 2).toUpperCase()}
          </Avatar>
        </Popover>
      )}
    </Header>
  );
};

export default AppHeader;
