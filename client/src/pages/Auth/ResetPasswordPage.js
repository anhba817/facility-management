import React, { useCallback } from "react";
import { message, Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import { useHistory, useParams, useLocation } from "react-router-dom";
import useFetch from "@utils/useFetch";
import Logo from "@images/helixSenseLogo.svg";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const query = useQuery();

  const { loading, fetchData: changePassword } = useFetch((params) => ({
    url: `${process.env.REACT_APP_API_URL}/user/${userId}/receive_new_password/${query.get("token")}`,
    method: "POST",
    body: JSON.stringify(params),
    onSuccess: () => {
      message.success("Password successfully changed, you can login now!");
      history.push("/login");
    },
    onError: (error) => {
      message.error(error);
    },
  }));

  const onSubmit = useCallback(
    (values) => {
      changePassword(values);
    },
    [changePassword]
  );

  return (
    <div style={{ padding: "32px 0" }}>
      <Formik enableReinitialize initialValues={{}} onSubmit={onSubmit}>
        {({ isValid, values }) => (
          <Form
            layout="vertical"
            className="p-4"
            style={{
              width: 350,
              margin: "0px auto",
              backgroundColor: "#fff5f8",
            }}
          >
            <div style={{ width: 256, margin: "0px auto", marginBottom: 30 }}>
              <img alt="Logo" src={Logo} style={{ width: "100%" }} />
            </div>
            <div className="mb-3">Enter new password</div>
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

            <Button
              type="primary"
              block
              htmlType="submit"
              disabled={!isValid || loading}
              loading={loading}
            >
              Reset Password
            </Button>
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

export default ResetPasswordPage;
