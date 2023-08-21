import { Button, Space, Upload, message } from "antd";
import { useState } from "react";
import { Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { FileType } from "../../../utils/types";
import { useMutation } from "@tanstack/react-query";
import {
  createTransactionFromFile,
  transactionDetailsFromFile,
} from "../../../net/payment";
import TransactionPreview from "./preview";

export default function UploadPayment() {
  const [form] = Form.useForm();
  const [file, setFile] = useState<FileType | null>(null);

  const previewMutation = useMutation(transactionDetailsFromFile, {
    onSuccess: () => {},
  });
  const createMutation = useMutation(createTransactionFromFile, {
    onSuccess: () => {
      form.resetFields();
    },
  });

  const normFile = (_e: { file: FileType; fileList: FileType[] }) => {
    if (_e.fileList.length > 1) {
      _e.fileList.shift();
    }

    return _e && _e.fileList;
  };

  const onFinish = ({ files }: { files: FileType[] }) => {
    const file = files.pop();

    // allow only excel and csv
    const types = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!types.includes(file.type)) {
      message.error("You can only upload Excel or CSV files!");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file.originFileObj);

    previewMutation.mutate(formData);
    setFile(file);
  };

  return (
    <div>
      {previewMutation.isSuccess && (
        <TransactionPreview
          items={previewMutation.data}
          submit={() => {
            const formData = new FormData();
            formData.append("file", file.originFileObj);
            createMutation.mutate(formData);
          }}
          isLoading={createMutation.isLoading}
          isSuccess={createMutation.isSuccess}
          reset={() => createMutation.reset()}
        />
      )}
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          name="files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload a file",
            },
          ]}
        >
          <Upload.Dragger
            multiple={false}
            beforeUpload={() => false}
            style={{ background: "#fff" }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item label=" " style={{ textAlign: "right" }}>
          <Space>
            <Button
              loading={previewMutation.isLoading}
              type="primary"
              htmlType="submit"
            >
              Preview
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
