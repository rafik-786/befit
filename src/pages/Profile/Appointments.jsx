import { Table } from "antd";
import { useEffect, useState } from "react";
import { getDoctorAppointmentsByUserId } from "../../api/appointments";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const getAppointments = async () => {
    try {
      const res = await getDoctorAppointmentsByUserId(user.id);
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
  }, []);

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
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
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
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={appointments}
        scroll={{
          x: 300,
        }}
      />
    </div>
  );
};

export default Appointments;
