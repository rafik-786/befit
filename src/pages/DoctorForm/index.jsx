import {
  Button,
  Col,
  Divider,
  Form,
  Result,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import Input from "antd/es/input/Input";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";
import { addDoctor, getDoctorById } from "../../api/doctor";
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";

// useForm();

const DoctorForm = () => {
  const specialtyOptions = [
    {
      label: "Cardiologist",
      value: "Cardiologist",
    },
    {
      label: "Dermatologist",
      value: "Dermatologist",
    },
    {
      label: "Endocrinologist",
      value: "Endocrinologist",
    },
    {
      label: "Gastroenterologist",
      value: "Gastroenterologist",
    },
    {
      label: "Gynecologist",
      value: "Gynecologist",
    },
    {
      label: "Nephrologist",
      value: "Nephrologist",
    },
    {
      label: "Neurologist",
      value: "Neurologist",
    },
    {
      label: "Ophthalmologist",
      value: "Ophthalmologist",
    },
    {
      label: "Otolaryngologist",
      value: "Otolaryngologist",
    },
    {
      label: "Pediatrician",
      value: "Pediatrician",
    },
    {
      label: "Psychiatrist",
      value: "Psychiatrist",
    },
  ];

  const qualificationOptions = [
    {
      label: "MBBS",
      value: "MBBS",
    },
    {
      label: "MD",
      value: "MD",
    },
    {
      label: "MS",
      value: "MS",
    },
    {
      label: "DM",
      value: "DM",
    },
    {
      label: "MCh",
      value: "MCh",
    },
    {
      label: "DNB",
      value: "DNB",
    },
    {
      label: "BDS",
      value: "BDS",
    },
  ];

  const daysOptions = [
    {
      label: "Monday",
      value: "Monday",
    },
    {
      label: "Tuesday",
      value: "Tuesday",
    },
    {
      label: "Wednesday",
      value: "Wednesday",
    },
    {
      label: "Thursday",
      value: "Thursday",
    },

    {
      label: "Friday",
      value: "Friday",
    },
    {
      label: "Saturday",
      value: "Saturday",
    },
    {
      label: "Sunday",
      value: "Sunday",
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [applied, setApplied] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const [form] = Form.useForm();

  const checkApplied = async () => {
    const doctor = await getDoctorById(user.id);
    if (doctor.success) {
      setApplied(true);
      setStatus(doctor.data.status);
      form.setFieldsValue({
        ...doctor.data,
        startTime: null,
        endTime: null,
      });
      // console.log(doctor.data.status);
    } else {
      setApplied(false);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const res = await addDoctor({
        ...values,
        id: user.id,
        startTime: values.startTime.$d,
        endTime: values.endTime.$d,
        status: status === "approved" ? "approved" : "pending",
        role: "doctor",
        website: values.website ? values.website : null,
      });

      if (res.success) {
        message.success(
          status === "approved" ? "Details Updated Successfully" : res.message
        );
        dispatch(showLoader(false));
        navigate("/profile");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      console.log(error);
      message.error(error.message);
    }
  };

  useEffect(() => {
    checkApplied();
  }, [applied]);

  if (applied && status === "pending") {
    return (
      <div className="px-14 my-2 inset-0 -z-10  fixed flex justify-center items-center">
        <Result
          status="warning"
          title="You have already applied. Please wait for approval🙂"
        />
      </div>
    );
  }

  if (applied && status === "blocked") {
    return (
      <div className="px-14 my-2 inset-0 -z-10  fixed flex justify-center items-center">
        <Result
          status="error"
          title="You account has been blocked. Please contact admin🙂"
        />
      </div>
    );
  }

  return (
    <div className="px-14 my-2">
      <h1 className="uppercase font-semibold text-blue-900 text-center text-4xl  ">
        Profile
      </h1>

      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={40}>
          <Col span={24}>
            <h1 className="text-blue-900">Personal Details</h1>
            <Divider className="bg-blue-900" />
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input placeholder="Enter first Name" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input placeholder="Enter last Name" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input placeholder="Enter email" type="email" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter phone number"
                addonBefore="+91"
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item label="Website" name="website">
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <h1 className="text-blue-900">Professional Details</h1>
            <Divider className="bg-blue-900" />
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Specialty"
              name="specialty"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Select
                placeholder="Select Specialty"
                options={specialtyOptions}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Experience" min={0} />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Qualification"
              name="qualification"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Select
                placeholder="Select Qualification"
                options={qualificationOptions}
                mode="multiple"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <h1 className="text-blue-900">Availability</h1>
            <Divider className="bg-blue-900" />
          </Col>
          <Col
            span={24}
            md={{
              span: 4,
            }}
          >
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 4,
            }}
          >
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col
            span={24}
            md={{
              span: 8,
            }}
          >
            <Form.Item
              label="Days"
              name="days"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Select
                placeholder="Select Days"
                mode="multiple"
                options={daysOptions}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            md={{
              span: 4,
            }}
          >
            <Form.Item
              label="Fees"
              name="fees"
              rules={[
                {
                  required: true,
                  message: "Mandatory Field",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter fees"
                addonBefore="₹"
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          block
          className="my-10 h-10 text-xl "
          type="primary"
          htmlType="submit"
        >
          Apply
        </Button>
      </Form>
    </div>
  );
};

export default DoctorForm;
