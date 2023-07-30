import { Tabs } from "antd";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProfile } from "react-icons/ai";
import Appointments from "./Appointments";
import Patients from "./Patients";
import ProfileMain from "./ProfileMain";
import DoctorForm from "../DoctorForm";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      label: (
        <span>
          <CgProfile /> Profile
        </span>
      ),
      key: "profile",
      children: user.role === "doctor" ? <DoctorForm /> : <ProfileMain />,
    },
    {
      label: (
        <span>
          <AiOutlineProfile /> Appointment
        </span>
      ),
      key: "appointments",
      children: <Appointments />,
    },
  ];

  if (user.role === "doctor") {
    items.push({
      label: (
        <span>
          <AiOutlineProfile /> Patients
        </span>
      ),
      key: "patients",
      children: <Patients />,
    });
  }

  return (
    <div className="px-14">
      <Tabs defaultActiveKey="profile" items={items}></Tabs>
    </div>
  );
};

export default Profile;
