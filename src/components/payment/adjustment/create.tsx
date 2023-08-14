import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { FormItem } from "../../../lib/form";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { WorkerSearchType, searchWorker } from "../../../store/worker";
import { debounce } from "../../../utils/func";
import { useMutation } from "@tanstack/react-query";
import { createAdjustment } from "../../../net/payment";

export type CreateAdjustmentInputs = {
  worker_id: number;
  amount: number;
  remarks: string;
};

export default function CreateAdjustment() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchBy, setSearchBy] = useState("");
  const dispatch = useAppDispatch();
  const workers = useSelector<RootState, WorkerSearchType>(
    (state) => state.worker.searchWorker
  );
  const mutation = useMutation(createAdjustment, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      message.success("Adjustment created");
    },
  });

  const onFinish = (values: CreateAdjustmentInputs) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    return () => {
      mutation.reset();
    };
  }, []);

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
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Space>
            <Form.Item label="Search By">
              <Select
                defaultValue="name"
                onChange={(value) => setSearchBy(value)}
              >
                <Select.Option value="name">Name</Select.Option>
                <Select.Option value="phone">Phone</Select.Option>
                <Select.Option value="pid">ID</Select.Option>
              </Select>
            </Form.Item>
            <FormItem
              name="worker_id"
              label="Worker"
              rules={[
                {
                  required: true,
                  message: "Please select worker",
                },
              ]}
            >
              <Select
                loading={workers.loading}
                placeholder="Select worker"
                style={{ minWidth: "200px" }}
                showSearch
                onSearch={(value) => {
                  const callback = () => {
                    dispatch(searchWorker({ by: searchBy, value }));
                  };

                  const debouncedCallback = debounce(callback, 500);
                  debouncedCallback();
                }}
                filterOption={false}
              >
                {workers.data?.map((worker) => (
                  <Select.Option key={worker.id} value={worker.id}>
                    {worker.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter amount",
                },
              ]}
            >
              <InputNumber style={{ minWidth: "160px" }} placeholder="amount" />
            </FormItem>
          </Space>
          <FormItem
            name="remarks"
            label="Remarks"
            rules={[
              {
                required: true,
                message: "Please enter remarks",
              },
            ]}
          >
            <Input.TextArea placeholder="write..." />
          </FormItem>

          <Form.Item style={{ textAlign: "right" }}>
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
