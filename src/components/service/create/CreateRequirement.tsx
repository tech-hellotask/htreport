import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";

export default function ServiceRequirement() {
  // {
  //   "base_price": 0,
  //   "is_required": true,
  //   "label": "string",
  //   "name": "string",
  //   "service_id": 0,
  //   "type": "string"
  // }
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Add Requirement</h3>
        <Form.List name={["customerFields"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      <Form.Item
                        name={[field.name, "name"]}
                        label="Name"
                        required={true}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        name={[field.name, "dataType"]}
                        label="Data Type"
                        required={true}
                      >
                        <Select placeholder="Select Data Type">
                          <Select.Option value="text">Text</Select.Option>
                          <Select.Option value="number">Number</Select.Option>
                          <Select.Option value="boolean">Boolean</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label=" ">
                        <Button
                          size="small"
                          danger
                          shape="circle"
                          icon={<MinusOutlined />}
                          onClick={() => remove(field.name)}
                        ></Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </Col>
  );
}
