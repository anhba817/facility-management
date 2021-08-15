import React, { useCallback } from "react";
import { message, Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import useFetch from "@utils/useFetch";
import Logo from "@images/helixSenseLogo.svg";

const SignUpPage = () => {
  const history = useHistory();

  const { loading, fetchData: signup } = useFetch((params, setFieldError) => ({
    url: `${process.env.REACT_APP_API_URL}/auth/signup`,
    method: "POST",
    body: JSON.stringify(params),
    onSuccess: () => {
      message.success("Sign up success, you can login now!");
      history.push("/login");
    },
    onError: (error) => {
      Object.keys(error).forEach((key) =>
        error[key].forEach((err) => setFieldError(key, err))
      );
    },
  }));

  const onSubmit = useCallback(
    (values, { setFieldError }) => {
      signup(values, setFieldError);
    },
    [signup]
  );

  return (
    <div style={{ padding: "32px 0" }}>
      <Formik enableReinitialize initialValues={{}} onSubmit={onSubmit}>
        {({ isValid, values }) => (
          <Form
            layout="vertical"
            className="p-4"
            style={{
              width: 450,
              margin: "0px auto",
              backgroundColor: "#fff5f8",
            }}
          >
            <div style={{ width: 256, margin: "0px auto", marginBottom: 30 }}>
              <img alt="Logo" src={Logo} style={{ width: "100%" }} />
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  name="firstname"
                  validate={(value) => !value && "Please enter your first name"}
                  hasFeedback
                >
                  <Input
                    name="firstname"
                    placeholder="First name"
                    prefix={<i className="fa fa-user mr-2 text-primary" />}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  name="lastname"
                  validate={(value) => !value && "Please enter your last name"}
                  hasFeedback
                >
                  <Input
                    name="lastname"
                    placeholder="Last name"
                    prefix={<i className="fa fa-user mr-2 text-primary" />}
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item name="company">
              <Input
                name="company"
                placeholder="Company"
                prefix={<i className="fa fa-building-o mr-2 text-primary" />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              validate={(value) => !value && "Please enter your email"}
              hasFeedback
            >
              <Input
                name="email"
                placeholder="Email"
                prefix={<i className="fa fa-envelope mr-2 text-primary" />}
              />
            </Form.Item>
            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  name="password"
                  validate={(value) => !value && "Please enter your password"}
                  hasFeedback
                >
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    prefix={<i className="fa fa-lock mr-2 text-primary" />}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  name="confirm-password"
                  validate={(value) =>
                    value !== values.password && "Password does not match!"
                  }
                  hasFeedback
                >
                  <Input
                    name="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    prefix={<i className="fa fa-lock mr-2 text-primary" />}
                  />
                </Form.Item>
              </div>
            </div>

            <Button
              type="primary"
              block
              htmlType="submit"
              disabled={!isValid || loading}
              loading={loading}
            >
              Sign Up
            </Button>
            <div className="text-center">
              Already have an account?
              <Button type="link" href="/login">
                <u>Login</u>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
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

export default SignUpPage;
