import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getServiceDetails } from "../../net/service";
import { ErrorAlert } from "../../lib/Alerts";
import { ServiceDetailsType, ServiceRequirementType } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { styled } from "styled-components";
import { Button, Col, Row, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="info-item">
      <span className="info-item-label">{label}</span>
      <span className="info-item-value">{value}</span>
    </div>
  );
}

function ServiceInformation({ data }: { data: ServiceDetailsType }) {
  return (
    <Col span={24} lg={12}>
      <InfoItem label="Name" value={data.name} />
      <InfoItem label="Details" value={data.details} />
      <InfoItem label="Worker Category" value={data.worker_category} />
      <InfoItem label="Work Days" value={data.work_days} />
      <InfoItem label="Total Holidays" value={data.total_holidays} />
      <InfoItem label="Hour Per Work" value={data.hour_per_work} />
      <InfoItem label="Hourly Rate" value={data.hourly_rate} />
      <InfoItem
        label="Worker Commission"
        value={`${data.worker_commission_amount} (${data.worker_commission_type})`}
      />
      <InfoItem
        label="Service Charge Amount"
        value={`${data.service_charge_amount} (${data.service_charge_type})`}
      />
    </Col>
  );
}

function ServiceRequirement({ data }: { data: ServiceRequirementType }) {
  return (
    <Col span={24} md={12} lg={8} xl={6}>
      <div className="box-light">
        <InfoItem label="Label" value={data.label} />
        <InfoItem label="Type" value={data.type} />
        <InfoItem label="Is Required" value={data.is_required ? "Yes" : "No"} />
        <div className="options">
          <div className="flex-between" style={{ alignItems: "center" }}>
            <h3>Options</h3>
            <Button icon={<PlusOutlined />} shape="circle" type="primary" />
          </div>
          <br />
          {data.options?.map((opt) => {
            return (
              <div className="option-item" key={opt.id}>
                <div className="data">
                  <InfoItem label="Label" value={opt.label} />
                  <InfoItem
                    label="Add Amount"
                    value={`${+opt.amount} (${opt.amount_type})`}
                  />
                </div>
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    shape="circle"
                    size="small"
                    type="primary"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    shape="circle"
                    size="small"
                  />
                </Space>
              </div>
            );
          })}
        </div>
      </div>
    </Col>
  );
}

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const query = useQuery<ServiceDetailsType, CustomError>({
    queryKey: [`/service/${id}`],
    queryFn: getServiceDetails,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) {
    return <ErrorAlert error={query.error} />;
  }

  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <ServiceInformation data={query.data} />
        <Col span={24}>
          <h3>Requirements</h3>
          <br />
          <Row gutter={[16, 16]}>
            {query.data.requirements?.map((req) => (
              <ServiceRequirement key={req.id} data={req} />
            ))}
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .info-item {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .info-item-label {
      font-weight: 500;
    }
  }

  .options {
    .option-item {
      border: 1px solid #e0e0e0;
      padding: 8px 16px;
      margin-bottom: 8px;
      background-color: #f7f7f7;
      display: flex;
      justify-content: space-between;

      .data {
        width: calc(100% - 70px);
      }
    }
  }
`;
