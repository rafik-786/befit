import React, { useEffect, useState } from "react";
import {
  getDoctorAppointmentsByDoctorId,
  updateAppointmentStatus,
} from "../../api/appointments";
import moment from "moment";
import { Button, Table } from "antd";

const Patients = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const getAppointments = async () => {
    try {
      const res = await getDoctorAppointmentsByDoctorId(user.id);
      if (res.success) {
        setAppointments(res.appointments);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAppointments();
    //  console.log("Paitent", appointments);
  }, []);

  const onUpdateAppointment = async (record, status) => {
    record = { ...record, status: status };
    //  console.log(record);
    try {
      const res = await updateAppointmentStatus(
        record.userId,
        record.bookedOn,
        {
          ...record,
          status: status,
        }
      );
      if (res.success) {
        getAppointments();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    {
      title: "Appointment Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (slot) => {
        return (
          <span className="text-green-500 text-base">
            {moment(slot, "HH:mm").format("hh:mm")}
            {" - "}
            {moment(slot, "HH:mm").add(60, "minutes").format("hh:mm A")}
          </span>
        );
      },
    },
    {
      title: "Patient Name",
      dataIndex: "userName",
      key: "patientName",
    },
    {
      title: "Booking Date",
      dataIndex: "bookedOn",
      key: "bookedOn",
      render: (bookedOn) => {
        return (
          <span>
            {moment(bookedOn.toDate()).format("DD-MM-YYYY hh:mm:ss a")}
          </span>
        );
      },
    },
    {
      title: "Problems/Symptoms",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span
            className={`text-${
              status === "accepted" ? "green" : "red"
            }-500 text-base`}
          >
            {status.toUpperCase()}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (record.status === "pending") {
          return (
            <div className="space-x-3">
              <Button
                type="primary"
                className="bg-green-500"
                onClick={() => onUpdateAppointment(record, "accepted")}
              >
                Accept
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => onUpdateAppointment(record, "rejected")}
              >
                Reject
              </Button>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
};

export default Patients;
