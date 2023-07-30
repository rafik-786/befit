import { Result, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import DoctorList from "./DoctorList";
import UserList from "./UserList";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getUserById } from "../../api/user";
import { showLoader } from "../../redux/loaderSlice";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const localUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      dispatch(showLoader(true));
      const { success, user } = await getUserById(localUser?.id);
      if (success) {
        if (user.role === "admin") {
          setIsAdmin(true);
        }
        dispatch(showLoader(false));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      dispatch(showLoader(false));
      console.log(error);
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    localUser &&
    (!isAdmin ? (
      <div className="px-14 my-2">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
        />
      </div>
    ) : (
      <div className="px-14 my-2">
        <Tabs
          items={[
            {
              label: (
                <span>
                  <UserOutlined />
                  Users
                </span>
              ),
              key: "users",
              children: <UserList />,
            },
            {
              label: (
                <span>
                  <PlusCircleOutlined />
                  Doctors
                </span>
              ),
              key: "doctors",
              children: <DoctorList />,
            },
          ]}
        ></Tabs>
      </div>
    ))
  );
};

export default Admin;
