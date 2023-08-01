import React, { useEffect, useState } from "react";
import { showLoader } from "../../redux/loaderSlice";
import { getAllUsers } from "../../api/user";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { clsx } from "clsx";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      dispatch(showLoader(true));
      const { success, usersList } = await getAllUsers();
      if (success) {
        setUsers(usersList);
        dispatch(showLoader(false));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "User Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",

      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <span
          className={clsx(
            text === "admin" && "text-red-500 ",
            text === "doctor" && "text-green-500",
            text === "normal" && "text-blue-500"
          )}
        >
          {text.toUpperCase()}
        </span>
      ),
    },
  ];

  //   console.log(users);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        scroll={{
          x: 300,
        }}
      />
      ;
    </div>
  );
};

export default UserList;
