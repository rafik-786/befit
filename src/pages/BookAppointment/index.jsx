import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { showLoader } from "../../redux/loaderSlice";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Popconfirm,
  Result,
  Row,
  message,
} from "antd";
import { getDoctorById } from "../../api/doctor";
import { Link } from "react-router-dom";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import {
  bookDoctorAppointment,
  getDoctorAppointmentsById,
} from "../../api/appointments";

const BookAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [problem, setProblem] = useState(null);
  const AvailableSlots = () => {
    const day = moment(date).format("dddd").toLowerCase();
    if (!doctor.days.includes(day)) {
      return (
        <h1 className="text-red-500 my-4">
          Doctor is not available on{" "}
          {day.charAt(0).toUpperCase() + day.slice(1)}.
        </h1>
      );
    }

    let startTime = moment(new Date(doctor.startTime.seconds * 1000));
    const endTime = moment(new Date(doctor.endTime.seconds * 1000));

    const slots = [];

    while (startTime < endTime) {
      slots.push(startTime.format("HH:mm"));
      startTime = moment(startTime, "HH:mm").add(60, "minutes");
    }

    return (
      <Row gutter={[40, 40]}>
        {slots.map((slot) => {
          return (
            <Col
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 6,
                xxl: 4,
              }}
              key={slot}
            >
              <Button
                type="dashed"
                disabled={
                  selectedSlot == slot ||
                  bookedSlots.find(
                    (bookedSlot) =>
                      bookedSlot.slot == slot &&
                      (bookedSlot.status == "accepted" ||
                        bookedSlot.status == "pending")
                  )
                }
                onClick={() => setSelectedSlot(slot)}
              >
                {moment(slot, "HH:mm").format("hh:mm A")}-
                {moment(slot, "HH:mm").add(60, "minutes").format("hh:mm A")}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };

  const getDoctor = async (id) => {
    try {
      dispatch(showLoader(true));
      const res = await getDoctorById(id);
      // console.log(res);
      if (res.success) {
        setDoctor({
          ...res.data,
          days: res.data.days.map((day) => day.toLowerCase()),
        });
      } else {
        throw new Error(res.message);
      }
      dispatch(showLoader(false));
    } catch (error) {
      console.error(error.message);
      dispatch(showLoader(false));
    }
  };

  const getBookedSlots = async () => {
    try {
      dispatch(showLoader(true));
      const res = await getDoctorAppointmentsById(doctor.id, date);
      if (res.success) {
        setBookedSlots(res.data);
      } else {
        throw new Error(res.message);
      }
      dispatch(showLoader(false));
    } catch (error) {
      console.error(error.message);
      dispatch(showLoader(false));
    }
  };

  useEffect(() => {
    getDoctor(id);
  }, []);

  useEffect(() => {
    if (date) {
      getBookedSlots();
      // console.log(bookedSlots);
    }
  }, [date]);

  const onBookAppointment = async () => {
    try {
      dispatch(showLoader(true));
      const res = await bookDoctorAppointment({
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        date,
        slot: selectedSlot,
        bookedOn: Timestamp.now(),
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem("user")).name,
        problem,
        status: "pending",
      });
      if (res.success) {
        message.success(res.message);
        navigate("/profile");
      } else {
        throw new Error(res.message);
      }
      dispatch(showLoader(false));
    } catch (error) {
      console.error(error.message);
      dispatch(showLoader(false));
    }
  };

  return !doctor ? (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  ) : (
    <div className="w-full   p-5 rounded-lg mx-auto px-2 sm:px-14  text-gray-500 flex justify-center md:justify-start space-x-10 md:space-x-20">
      <div className="">
        <Avatar
          size={{
            xs: 64,
            sm: 64,
            md: 64,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          className="bg-blue-400 mb-4"
        >
          {doctor.firstName.charAt(0).toUpperCase()}{" "}
          {doctor.lastName.charAt(0).toUpperCase()}
        </Avatar>
        <h1 className=" text-2xl md:text-4xl text-blue-900">
          Dr. {doctor.firstName} {doctor.lastName}
          {doctor.qualification.map((q) => {
            return (
              <span key={q} className=" text-sm text-rose-500">
                {" "}
                {q}
              </span>
            );
          })}
        </h1>
        <h3>
          Speciality:{" "}
          <span className="text-green-500 font-mono sm:text-sm md:text-base">
            {doctor.specialty}
          </span>
        </h3>
        <h3>
          Experience:
          <span className="text-green-500 font-mono">
            {" "}
            {doctor.experience} Years
          </span>
        </h3>
        <h3>
          Fees: <span className="text-green-500 font-mono">₹{doctor.fees}</span>
        </h3>
        <h3>
          Website:{" "}
          <Link
            className="text-lg font-mono"
            to={doctor.website ? `https://${doctor.website}` : "_blank"}
          >
            {doctor.website ? (
              doctor.website
            ) : (
              <span className="text-red-500 ">Not Available</span>
            )}
          </Link>
        </h3>
        <h3>
          Phone:{" "}
          <span className="text-green-500 font-mono">
            +91-{doctor.phoneNumber}
          </span>
        </h3>
        <h3>
          Available on:{" "}
          {doctor.days.map((day) => (
            <span
              className="bg-green-400 text-white mx-2 px-2 rounded-md font-mono"
              key={day}
            >
              {day}{" "}
            </span>
          ))}
        </h3>
        <Divider />
        <h1 className="text-2xl text-blue-900 my-5">Book Appointment</h1>
        <DatePicker
          onChange={(date, dateString) => {
            setDate(dateString);
          }}
          disabledDate={(current) =>
            current.isBefore(moment().subtract(1, "day"))
          }
        />
        {date && (
          <div className="my-5">
            <AvailableSlots />
          </div>
        )}

        {selectedSlot && (
          <Input.TextArea
            value={problem}
            rows={5}
            placeholder="Please describe your symptoms and problems here..."
            onChange={(e) => setProblem(e.target.value)}
          />
        )}
        {problem && (
          <div className="my-5">
            <Button type="primary" className="mr-2" onClick={onBookAppointment}>
              Book Appointment
            </Button>
            <Button type="primary" danger onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
