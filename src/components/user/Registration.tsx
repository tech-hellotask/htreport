import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  Button,
  Modal,
  Alert,
  message,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { FormItem } from "../../lib/form";
import { FileType, RoleType } from "../../utils/types";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAdmin } from "../../net/admin";
import { fetchRoles } from "../../net/role";

export type UserInputs = {
  username: string;
  roleId: number;
  email: string;
  phone: string;
  password: string;
  image: FileType[];
};

export default function UserRegistration() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const mutation = useMutation(createAdmin, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      message.success("User created successfully!");
    },
  });
  const roleList = useQuery({
    queryKey: ["/role/list"],
    queryFn: fetchRoles,
    refetchInterval() {
      return false;
    },
  });

  const normFile = (_e: { file: FileType; fileList: FileType[] }) => {
    console.log("Upload event:", _e);

    if (_e.fileList.length > 1) {
      _e.fileList.shift();
    }

    return _e && _e.fileList;
  };

  const onFinish = (values: UserInputs) => {
    // TODO: Handle image upload
    mutation.mutate(values);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New User
      </Button>
      <Modal
        title="Add New User"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={Math.min(window.innerWidth, 700)}
        style={{ top: -100 }}
        footer={null}
      >
        <Form
          form={form}
          scrollToFirstError
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          {mutation.isError && (
            <Alert type="error" message={mutation.error as string} />
          )}
          <Row gutter={[24, 0]}>
            <Col span={24} md={12}>
              <FormItem
                name="name"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input username!",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </FormItem>
              <FormItem
                name="role_id"
                label="User Role"
                rules={[
                  {
                    required: true,
                    message: "Please select user's role!",
                  },
                ]}
              >
                <Select loading={roleList.isLoading} placeholder="Select One">
                  {roleList.isSuccess &&
                    roleList.data?.map((role: RoleType) => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.name}
                      </Select.Option>
                    ))}
                </Select>
              </FormItem>
              <FormItem
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input user's email!",
                  },
                ]}
              >
                <Input placeholder="example@email.com" />
              </FormItem>
              <FormItem
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input user's phone number!",
                  },
                ]}
              >
                <Input placeholder="+880 xxx-xxxxxxx" />
              </FormItem>
              <FormItem
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input user's password!",
                  },
                ]}
              >
                <Input.Password placeholder="********" />
              </FormItem>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Image">
                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger multiple={false}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-hint">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <FormItem
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input user's address!",
                  },
                ]}
              >
                <Input placeholder="Ex: Area, Road, Block, House" />
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                loading={mutation.isLoading}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
