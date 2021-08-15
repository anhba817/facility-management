import React, { useCallback } from "react";
import { message, Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import useFetch from "@utils/useFetch";
import Logo from "@images/helixSenseLogo.svg";

const ForgotPasswordPage = () => {

  const { loading, fetchData: sendResetPassword } = useFetch(
    (params) => ({
      url: `${process.env.REACT_APP_API_URL}/user/${params.email}/reset_password`,
      method: "POST",
      onSuccess: () => {
        message.success("Reset email sent, please check your mail box!");
      },
      onError: (error) => {
        message.error(error);
      },
    })
  );

  const onSubmit = useCallback(
    (values) => {
      sendResetPassword(values);
    },
    [sendResetPassword]
  );

  return (
    <div style={{ padding: "32px 0" }}>
      <Formik enableReinitialize initialValues={{}} onSubmit={onSubmit}>
        {({ isValid }) => (
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
            <div className="mb-3">
              {"Enter your email address below and we'll " +
                "send you a link to reset your password."}
            </div>
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

            <Button
              type="primary"
              block
              htmlType="submit"
              disabled={!isValid || loading}
              loading={loading}
            >
              Send reset link
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

export default ForgotPasswordPage;
