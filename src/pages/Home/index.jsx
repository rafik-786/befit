import { Avatar, Button, Col, Row, message } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { useNavigate } from "react-router";
import { showLoader } from "../../redux/loaderSlice";
import { getAllDoctors } from "../../api/doctor";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = React.useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const getDoctors = async () => {
    try {
      dispatch(showLoader(true));

      const res = await getAllDoctors();
      if (res.success) {
        setDoctors(res.doctorsList);
      } else {
        throw new Error(res.message);
      }
      dispatch(showLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(showLoader(false));
    }
  };

  React.useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="px-6 sm:px-8 md:px-14">
      <div className=" my-4 flex justify-between">
        <Search
          placeholder="Search Doctor"
          className="w-1/2 md:w-1/4"
          allowClear
        />
        {user.role !== "doctor" && user.role !== "admin" && (
          <Button
            type="dashed"
            onClick={() => navigate("/applyDoctor")}
            className="uppercase text-blue-900 font-semibold"
          >
            Apply Doctor
          </Button>
        )}
      </div>
      <Row gutter={[16, 16]}>
        {doctors.map(
          (doctor) =>
            doctor.status === "approved" && (
              <Col
                key={doctor.id}
                span={24}
                md={{
                  span: 12,
                }}
                lg={{
                  span: 8,
                }}
                xxl={{
                  span: 6,
                }}
              >
                <div
                  onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                  className="flex justify-evenly  p-5 shadow-lg border-solid border-blue-200 border-opacity-10 text-gray-600 cursor-pointer hover:shadow-2xl ease-in-out hover:transition-all"
                >
                  <div className="">
                    <h1 className="text-blue-900 ">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h1>
                    <h4>
                      {doctor.qualification.map((degree, idx) => (
                        <span
                          className="text-blue-500 font-mono"
                          key={`qualification-${doctor.id}-${idx}`}
                        >
                          {degree}{" "}
                        </span>
                      ))}
                    </h4>
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
                      Fees:{" "}
                      <span className="text-green-500 font-mono">
                        ₹{doctor.fees}
                      </span>
                    </h3>
                    <h3>
                      Website:{" "}
                      <Link
                        className="text-lg font-mono"
                        to={
                          doctor.website
                            ? `https://${doctor.website}`
                            : "_blank"
                        }
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
                        {doctor.phoneNumber}
                      </span>
                    </h3>
                  </div>
                  <Avatar size={64} className="bg-blue-400">
                    {doctor.firstName.charAt(0).toUpperCase()}
                    {doctor.lastName.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
              </Col>
            )
        )}
      </Row>
    </div>
  );
};

export default Home;
