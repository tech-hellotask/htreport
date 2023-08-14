import { Form, Row, Col, Button, Input, Select, Upload } from "antd";
import { FormItem } from "../../lib/form";
import { InboxOutlined } from "@ant-design/icons";
import { FileType } from "../../utils/types";

export default function WorkerForm() {
  const [form] = Form.useForm();

  const normFile = (_e: { file: FileType; fileList: FileType[] }) => {
    console.log("Upload event:", _e);

    if (_e.fileList.length > 1) {
      _e.fileList.shift();
    }

    return _e && _e.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Worker Registration</h1>
      <Row gutter={[24, 16]}>
        <Col span={24} md={12} lg={8} xl={6}>
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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Name" />
          </FormItem>
          <FormItem
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select Category" showSearch allowClear>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={24} md={12} lg={8} xl={6}>
          <FormItem
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone!" }]}
          >
            <Input placeholder="+880 XXX-XXXXXXX" />
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
          <FormItem
            name="emergencyContact"
            label="Emergency Contact"
            rules={[
              { required: true, message: "Please input emergency contact!" },
            ]}
          >
            <Input placeholder="+880 XXX-XXXXXXX" />
          </FormItem>
          <FormItem name="email" label="Email">
            <Input placeholder="example@email.com" />
          </FormItem>
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
        <Col span={24} md={12} lg={8} xl={6}>
          <FormItem
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select Status" showSearch allowClear>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="level"
            label="Level"
            rules={[{ required: true, message: "Please select level" }]}
          >
            <Select placeholder="Select Level" showSearch allowClear>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select placeholder="Select type" showSearch allowClear>
              <Select.Option value="1">Freelance</Select.Option>
              <Select.Option value="1">Payrole</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="holidays"
            label="Holidays"
            rules={[{ required: true, message: "Please select holidays" }]}
          >
            <Select
              placeholder="Select One"
              showSearch
              allowClear
              mode="multiple"
            >
              <Select.Option value="1">Saturday</Select.Option>
              <Select.Option value="1">Sunday</Select.Option>
              <Select.Option value="1">Monday</Select.Option>
              <Select.Option value="1">Tuesday</Select.Option>
              <Select.Option value="1">Wednesday</Select.Option>
              <Select.Option value="1">Thursday</Select.Option>
              <Select.Option value="1">Friday</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="workhours"
            label="Working Hours"
            rules={[{ required: true, message: "Please add working hours" }]}
          >
            <Select
              placeholder="Select Work Hours"
              showSearch
              allowClear
              mode="multiple"
            >
              <Select.Option value="1">5 AM</Select.Option>
              <Select.Option value="1">6 AM</Select.Option>
              <Select.Option value="1">7 AM</Select.Option>
              <Select.Option value="1">8 AM</Select.Option>
              <Select.Option value="1">9 AM</Select.Option>
              <Select.Option value="1">10 AM</Select.Option>
              <Select.Option value="1">11 AM</Select.Option>
              <Select.Option value="1">12 PM</Select.Option>
              <Select.Option value="1">1 PM</Select.Option>
              <Select.Option value="1">2 PM</Select.Option>
              <Select.Option value="1">3 PM</Select.Option>
              <Select.Option value="1">4 PM</Select.Option>
              <Select.Option value="1">5 PM</Select.Option>
              <Select.Option value="1">6 PM</Select.Option>
              <Select.Option value="1">7 PM</Select.Option>
              <Select.Option value="1">8 PM</Select.Option>
              <Select.Option value="1">9 PM</Select.Option>
              <Select.Option value="1">10 PM</Select.Option>
              <Select.Option value="1">11 PM</Select.Option>
              <Select.Option value="1">12 AM</Select.Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={24} md={12} lg={8} xl={6}>
          <FormItem
            name="deviceType"
            label="Communication Device Type"
            rules={[{ required: true, message: "Please select device type" }]}
          >
            <Select placeholder="Select Device Type" showSearch allowClear>
              <Select.Option value="1">Button Phone</Select.Option>
              <Select.Option value="1">Android Phone</Select.Option>
              <Select.Option value="1">iOS</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="onBoardingPlatform"
            label="On Boarding Platform"
            rules={[{ required: true, message: "Please select one" }]}
          >
            <Select placeholder="Select One" showSearch allowClear>
              <Select.Option value="1">Us</Select.Option>
              <Select.Option value="1">Sheba</Select.Option>
            </Select>
          </FormItem>

          <FormItem name="bio" label="About">
            <Input.TextArea placeholder="Write about worker" />
          </FormItem>
          <FormItem name="referredBy" label="Referral Code">
            <Input placeholder="xyz" />
          </FormItem>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
