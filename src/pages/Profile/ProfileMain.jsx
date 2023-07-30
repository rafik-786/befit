import { Avatar, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const ProfileMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <div className="text-blue-900">
      <Avatar size={128} className="bg-blue-400">
        {user.name.substring(0, 2).toUpperCase()}
      </Avatar>
      <h1 className="mt-5">
        Username:
        <span className="m-4 text-3xl text-green-700  ">{user.name}</span>
      </h1>
      <h1>
        User Id:
        <span className="m-4 text-3xl text-green-700 ">{user.id}</span>
      </h1>
      <h1>
        User Email:
        <span className="m-4 text-3xl text-green-700 ">{user.email}</span>
      </h1>
      <h1>
        User Role:
        <span className="m-4 text-3xl text-green-700 ">{user.role}</span>
      </h1>

      <Button
        type="default"
        danger
        className="mt-5"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfileMain;
