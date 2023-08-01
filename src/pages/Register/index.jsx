import { Button, Divider, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/user";
import { showLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const onFinish = async (values) => {
    setDisabled(true);
    dispatch(showLoader(true));
    try {
      if (values.password !== values.confirmPassword)
        throw new Error("Passwords do not match");

      //delete confirmPassword from values
      delete values.confirmPassword;

      // console.log(values);
      const res = await CreateUser({ ...values, role: "normal" });

      if (res.success) {
        dispatch(showLoader(false));
        message.success(res.message);
        navigate("/login");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      setDisabled(false);
      dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="w-screen mt-10 flex justify-center items-center">
      <div className="w-[90%] lg:w-[40%] xl:w-[30%]  p-5 border-opacity-25 shadow-lg border-solid border-blue-100">
        <h1 className="text-blue-900">Register</h1>
        <Divider className="bg-blue-900" />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={disabled}
            className="h-10 text-lg"
            block
          >
            Register
          </Button>

          <Divider>
            <h3 className="font-normal w-full text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 underline">
                Sign In
              </Link>
            </h3>
          </Divider>
        </Form>
      </div>
    </div>
  );
};

export default Register;
