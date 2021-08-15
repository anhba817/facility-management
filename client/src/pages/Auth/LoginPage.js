import React, { useCallback } from "react";
import { message, Form, Input, Button } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import useFetch from "@utils/useFetch";
import Logo from "@images/helixSenseLogo.svg";

const LoginPage = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const { loading, fetchData: login } = useFetch((params) => ({
    url: `${process.env.REACT_APP_API_URL}/auth/signin`,
    method: "POST",
    body: JSON.stringify(params),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data));
      history.replace(from);
    },
    onError: (error) => {
      Object.keys(error).forEach((key) =>
        error[key].forEach((err) => message.error(err))
      );
    },
  }));

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();

      login(values);
    } catch (err) {
      // Do nothing
    }
  }, [form, login]);

  return (
    <div style={{ padding: "32px 0" }}>
      <Form
        form={form}
        className="p-4"
        style={{ width: 350, margin: "0px auto", backgroundColor: "#fff5f8" }}
      >
        <div style={{ width: 256, margin: "0px auto", marginBottom: 30 }}>
          <img alt="Logo" src={Logo} style={{ width: "100%" }} />
        </div>
        <Form.Item
          name={["email"]}
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            prefix={<i className="fa fa-envelope pr-2 text-primary" />}
            placeholder="Email"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name={["password"]}
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input
            prefix={<i className="fa fa-lock pr-2 text-primary" />}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
        <div className="text-center">
          Don't have an account?
          <Button type="link" href="/signup">
            <u>Sign Up</u>
          </Button>
        </div>
        <div className="text-center">
          <Button type="link" href="/forgot-password">
            <u>Forgot your password</u>
          </Button>
        </div>
      </Form>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        Copyright | All Rights Reserved HelixSense 2021
      </div>
    </div>
  );
};

export default LoginPage;
