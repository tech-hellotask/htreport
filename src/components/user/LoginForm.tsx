import { Form, Input, Button } from "antd";
import { FormItem } from "../../lib/form";
import { useAppDispatch } from "../../store";
import { authSuccess } from "../../store/auth";
import { ErrorAlert } from "../../lib/Alerts";
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "../../net/admin";
import { AdminLoginResponse } from "../../utils/types";
import { CustomError } from "../../utils/errors";

export type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const mutation = useMutation<AdminLoginResponse, CustomError, LoginInputs>(
    loginAuth,
    {
      onSuccess: (data) => {
        dispatch(authSuccess(data));
      },
    }
  );

  const onFinish = async (values: LoginInputs) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      onFinish={onFinish}
      initialValues={{ remember: true }}
      layout="vertical"
      className="box-light"
      size="large"
    >
      <h1 className="box-title">Login</h1>
      <ErrorAlert error={mutation.error} isError={mutation.isError} />
      <FormItem
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input email!",
          },
        ]}
      >
        <Input placeholder="example@email.com" />
      </FormItem>
      <FormItem
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input password!",
          },
        ]}
      >
        <Input.Password placeholder="********" />
      </FormItem>
      <Form.Item style={{ textAlign: "right" }}>
        <Button loading={mutation.isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
