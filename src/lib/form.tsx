import { Col, Form } from "antd";

export function FormItem({
  children,
  name,
  label,
  required,
  col,
  ...rest
}: {
  children: React.ReactNode;
  name: string;
  label: string;
  rules?: {
    required?: boolean;
    message?: string;
  }[];
  required?: boolean;
  valuePropName?: string;
  col?: number;
}) {
  if (required && !rest.rules) {
    rest.rules = [{ required: true, message: `${label} is required!` }];
  }

  const component = (
    <Form.Item name={name} label={label} {...rest}>
      {children}
    </Form.Item>
  );

  if (col) {
    <Col span={24 / col}>{component}</Col>;
  }

  return component;
}
