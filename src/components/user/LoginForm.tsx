import { Form, Input, Button } from "antd";
import { FormItem } from "../../lib/form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthType } from "../../store/auth";

export type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm({
  onFinish,
}: {
  onFinish: (values: LoginInputs) => void;
}) {
  const [form] = Form.useForm();
  const auth = useSelector<RootState, AuthType>((state) => state.auth);

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
        <Button loading={auth.loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
