import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import { FormItem } from "../../lib/form";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

function BasicInfo() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Basic Info</h3>
        <FormItem name="name" label="Title" required={true}>
          <Input placeholder="Ex: 30 days package" />
        </FormItem>
        <FormItem
          name="workerCategoryId"
          label="Worker Category"
          required={true}
        >
          <Select placeholder="Select Category">
            <Select.Option value="1">Domestic Worker</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="isActive" label="Is Active" valuePropName="checked">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked
          />
        </FormItem>
        <FormItem name="details" label="Details">
          <Input.TextArea placeholder="Details" />
        </FormItem>
      </div>
    </Col>
  );
}

/*
- [ ] Total Days 
- [ ] Total Holidays 
- [ ] Min Hour A Day 
- [ ] Max Hour A Day
- [ ] Trial
*/

function ServiceConfiguration() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Configuration</h3>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <FormItem
              name="totalDays"
              label="Total Days"
              required={true}
              col={2}
            >
              <InputNumber />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="totalHolidays"
              label="Total Holidays"
              required={true}
            >
              <InputNumber />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="minHourADay"
              label="Min Hour A Day"
              required={true}
              col={2}
            >
              <InputNumber />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="maxHourADay"
              label="Max Hour A Day"
              required={true}
              col={2}
            >
              <InputNumber />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="trial" label="Total Trial" required={true} col={2}>
              <InputNumber />
            </FormItem>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

function ServiceRevenueModel() {
  return (
    <Col span={24} xl={16}>
      <div className="box-light">
        <h3 className="box-title">Service Revenue Model</h3>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={8}>
            <div className="inner-box">
              <h4 className="inner-box-title">Worker Commission </h4>
              <FormItem
                name="workerCommissionType"
                label="Type"
                required={true}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="percentage">Percentage</Select.Option>
                  <Select.Option value="fixed">Fixed</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="workerCommissionAmount"
                label="Amount"
                required={true}
              >
                <InputNumber />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12} lg={8}>
            <div className="inner-box">
              <h4 className="inner-box-title">Customer Commission </h4>
              <FormItem
                name="customerCommissionType"
                label="Type"
                required={true}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="percentage">Percentage</Select.Option>
                  <Select.Option value="fixed">Fixed</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="customerCommissionAmount"
                label="Amount"
                required={true}
              >
                <InputNumber />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12} lg={8}>
            <div className="inner-box">
              <h4 className="inner-box-title">Service Charge </h4>
              <FormItem name="serviceChargeType" label="Type" required={true}>
                <Select placeholder="Select Type">
                  <Select.Option value="percentage">Percentage</Select.Option>
                  <Select.Option value="fixed">Fixed</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="serviceChargeAmount"
                label="Amount"
                required={true}
              >
                <InputNumber />
              </FormItem>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

function ServiceDiscount() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Discount</h3>
        <FormItem name="discountType" label="Discount Type" required={true}>
          <Select placeholder="Select Discount Type">
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="fixed">Fixed</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="discountAmount" label="Discount Amount" required={true}>
          <InputNumber />
        </FormItem>
        <FormItem
          name="discountValidity"
          label="Discount Validity"
          required={true}
        >
          <DatePicker.RangePicker />
        </FormItem>
      </div>
    </Col>
  );
}

/*
Service ID 
- [ ] Name  [Ex: apartment size, no of rooms, etc]
- [ ] Data Type [Ex: text, number, boolean]
*/
function NecessaryCustomerInfo() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Necessary Customer Informations</h3>
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

function ServicePricing() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Pricing</h3>
        <FormItem name="pricingType" label="Pricing Type" required={true}>
          <Select placeholder="Select Pricing Type">
            <Select.Option value="fixed">Fixed</Select.Option>
            <Select.Option value="hourly">Hourly</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="price" label="Price" required={true}>
          <InputNumber />
        </FormItem>
        <FormItem name="currency" label="Currency" required={true}>
          <Select placeholder="Select Currency">
            <Select.Option value="usd">USD</Select.Option>
            <Select.Option value="bdt">BDT</Select.Option>
          </Select>
        </FormItem>
      </div>
    </Col>
  );
}

export default function CreateService() {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      <Row gutter={[24, 24]}>
        <BasicInfo />
        <ServiceConfiguration />
        <ServiceDiscount />
        <ServiceRevenueModel />
        <NecessaryCustomerInfo />
        <ServicePricing />
      </Row>
    </Form>
  );
}
