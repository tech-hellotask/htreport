import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, message } from "antd";
import { useState } from "react";
import { FormItem } from "../../lib/form";
import { useMutation } from "@tanstack/react-query";
import { createRole } from "../../net/admin";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";

export type RoleInputs = {
  name: string;
};

export default function CreateUserRole() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const mutation = useMutation(createRole, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      message.success("Role created successfully");
    },
  });

  const onFinish = (values: RoleInputs) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New Role
      </Button>
      <Modal
        title="Add New Role"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
        style={{ top: -100 }}
        footer={null}
      >
        <Form
          form={form}
          name="signup"
          scrollToFirstError
          key="a"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <ErrorAlert
            error={mutation.error as CustomError}
            isError={mutation.isError}
            margin={true}
          />
          <FormItem
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </FormItem>
          <Form.Item>
            <Button
              loading={mutation.isLoading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
