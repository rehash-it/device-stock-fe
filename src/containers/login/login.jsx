import { Form, Input, Button, Checkbox } from "antd";
import { Container } from "../../components/Container/Container";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { setUserSession } from "../../utils/common";
import AuthService from "../../services/AuthService";
import jwt_decode from 'jwt-decode';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const Login = (props) => {
  const onFinish = (values) => {
    AuthService.Auth(values)
      .then((response) => {
        const token = JSON.stringify(response.data);
        const user = jwt_decode(token);
        setUserSession(response.data, user);
        props.history.push("/devices");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <SectionHeading heading="Login to Your Account" />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
