import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Modal, Select } from "antd";
import { useState } from "react";
import { FormItem } from "../../lib/form";
import { useMutation } from "@tanstack/react-query";
import { createRoleAccess } from "../../net/role";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";
import { RoleType } from "../../utils/types";

export type RoleAccessInputs = {
  role_id: number;
  component_id: number;
};

export default function CreateRoleAccess({
  onCreate,
  roles,
  itemId,
}: {
  onCreate: () => void;
  roles: RoleType[];
  itemId: number;
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const mutation = useMutation(createRoleAccess, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      onCreate();
    },
  });

  const onFinish = (values: RoleAccessInputs) => {
    mutation.mutate({
      role_id: values.role_id,
      component_id: itemId,
    });
  };

  return (
    <div>
      <Button
        type="primary"
        size="small"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      />
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
            name="role_id"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select placeholder="Select role">
              {roles?.map((role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
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
