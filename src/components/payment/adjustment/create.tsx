import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { useState } from "react";
import { FormItem } from "../../../lib/form";

export default function CreateAdjustment() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={() => setOpen(true)} type="primary">
        Add New Adjustment
      </Button>
      <Modal
        title="Create Adjustment"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
        style={{ top: -100 }}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Space>
            <FormItem name="worker_id" label="Worker">
              <Select placeholder="Select worker" style={{ minWidth: "200px" }}>
                <Select.Option value="1">Worker 1</Select.Option>
              </Select>
            </FormItem>
            <FormItem name="amount" label="Amount">
              <InputNumber style={{ minWidth: "160px" }} placeholder="amount" />
            </FormItem>
          </Space>
          <FormItem name="remarks" label="Remarks">
            <Input.TextArea placeholder="write..." />
          </FormItem>

          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
