import { Button, Divider, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const res = await LoginUser(values);
      // console.log(res);
      dispatch(showLoader(false));
      if (res.success) {
        message.success(res.message);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...res.user,
            password: "********",
          })
        );
        navigate("/");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      // dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="w-screen mt-10 flex justify-center items-center">
      <div className="w-[90%] lg:w-[40%] xl:w-[30%] p-5  border-opacity-25 shadow-lg border-solid border-blue-100 ">
        <h1 className="text-blue-900">Login</h1>
        <Divider className="bg-blue-900" />
        <Form layout="vertical" onFinish={onFinish}>
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

          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-10 text-lg"
          >
            Sign In
          </Button>

          <Divider>
            <h3 className="font-normal w-full text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-700 underline block md:inline-block"
              >
                Create an Account
              </Link>
            </h3>
          </Divider>
        </Form>
      </div>
    </div>
  );
};

export default Login;
