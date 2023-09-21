import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal } from "antd";
import { useState } from "react";
import { FormItem } from "../../lib/form";
import { useMutation } from "@tanstack/react-query";
import { createRoleComponent } from "../../net/role";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";

export type RoleComponentInputs = {
  tag: string;
  name: string;
  key_name: string;
};

export default function CreateRoleComponent({
  onCreate,
}: {
  onCreate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const mutation = useMutation(createRoleComponent, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      onCreate();
    },
  });

  const onFinish = (values: RoleComponentInputs) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        type="primary"
        icon={<PlusOutlined />}
      >
        Add Component
      </Button>
      <Modal
        title="Add New Component"
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
          scrollToFirstError
          key="a"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <ErrorAlert
            error={mutation.error as CustomError}
            margin={true}
            isError={mutation.isError}
          />
          <FormItem
            name="tag"
            label="Section Name"
            rules={[
              {
                required: true,
                message: "Please input section name!",
              },
            ]}
          >
            <Input placeholder="ex: Payment" />
          </FormItem>
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
          <FormItem
            name="key_name"
            label="Key Name (Unique)"
            rules={[
              {
                required: true,
                message: "Please input key name!",
              },
            ]}
          >
            <Input placeholder="example_list" />
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
