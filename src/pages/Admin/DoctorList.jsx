import React, { useEffect, useState } from "react";
import { getAllDoctors, updateDoctorById } from "../../api/doctor";
import { Button, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";
import clsx from "clsx";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import { getUserById, updateUserById } from "../../api/user";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const fetchDoctors = async () => {
    try {
      dispatch(showLoader(true));
      const { success, doctorsList } = await getAllDoctors();
      if (success) {
        setDoctors(doctorsList);
        dispatch(showLoader(false));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateStatus = async (doctor) => {
    try {
      dispatch(showLoader(true));
      const res = await updateDoctorById(doctor);

      if (res) {
        setDoctors(doctors);
        dispatch(showLoader(false));
        message.success("Doctor status updated successfully");
        fetchDoctors();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      message.error(error.message);
      dispatch(showLoader(false));
    }
  };

  const UpdateRole = async (id) => {
    try {
      dispatch(showLoader(true));
      const { user } = await getUserById(id);
      // console.log(user);
      const res = await updateUserById({
        ...user,
        id: user.id,
        role: "doctor",
      });
      if (res.success) {
        message.success("User role updated successfully");
        fetchDoctors();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      message.error(error.message);
      dispatch(showLoader(false));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // console.log(doctors);

  const columns = [
    {
      title: (
        <span>
          <UserOutlined /> First Name
        </span>
      ),
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: (
        <span>
          {" "}
          <UserOutlined /> Last Name
        </span>
      ),
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: (
        <span>
          {" "}
          <AiOutlineMail /> Email
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Speciality",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={clsx(
            text === "approved" && "text-green-500",
            text === "pending" && "text-yellow-500",
            text === "rejected" && "text-red-500",
            text === "blocked" && "text-red-500"
          )}
        >
          {text.toUpperCase()}
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (record.status === "pending") {
          return (
            <div>
              <Button
                type="primary"
                className="mr-2 bg-green-500"
                onClick={() => {
                  updateStatus({
                    ...record,
                    id: record.id,
                    status: "approved",
                  });
                  UpdateRole(record.id);
                }}
              >
                Approve
              </Button>
              <Button
                type="primary"
                danger
                className="mr-2"
                onClick={() => {
                  updateStatus({
                    ...record,
                    id: record.id,
                    status: "rejected",
                  });
                }}
              >
                Reject
              </Button>
            </div>
          );
        }

        if (record.status === "approved") {
          return (
            <div>
              <Button
                type="primary"
                danger
                className="mr-2"
                onClick={() => {
                  updateStatus({
                    ...record,
                    id: record.id,
                    status: "blocked",
                  });
                }}
              >
                Block
              </Button>
            </div>
          );
        }

        if (record.status === "blocked") {
          return (
            <div>
              <Button
                type="primary"
                danger
                className="mr-2"
                onClick={() => {
                  updateStatus({
                    ...record,
                    id: record.id,
                    status: "approved",
                  });
                }}
              >
                Unblock
              </Button>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={doctors}
        scroll={{
          x: 300,
        }}
      />
      ;
    </div>
  );
};

export default DoctorList;
