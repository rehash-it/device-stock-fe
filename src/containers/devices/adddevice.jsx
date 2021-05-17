import React, { useState } from "react";
import { Form, Input, Select, Switch, Button, AutoComplete } from "antd";
import { Container } from "../../components/Container/Container";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Redirect } from "react-router-dom";
import DeviceService from "../../services/DeviceService";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddDevice = (props) => {
  const [form] = Form.useForm();
  const [redirect, setRedirect] = useState(null);

  const onFinish = async (values) => { 
      await DeviceService.create(values)
        .then((response) => {
          if (response.status == 200) {
            setRedirect(<Redirect to="/devices" />);
          }
        })
        .catch((e) => {
          console.log(e);
        });
  };

  if (redirect) {
    return redirect;
  }

  return (
    <Container>
      <SectionHeading
        heading= "Add New Device" 
      />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="device"
          label="Device"
          rules={[
            {
              required: true,
              message: "Please input the device name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="os"
          label="Operating System"
          rules={[
            {
              required: true,
              message: "Please input the device operating system!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item
          name="manufacturer"
          label="Manufacturer"
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Please input device manufacturer!",
            },
          ]}
        >
          <Input />
        </Form.Item>
     
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default AddDevice;
