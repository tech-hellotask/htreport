import styled from "styled-components";
import { WorkerType } from "../../../utils/types";
import { Col, Row } from "antd";

function Item({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="item">
      <div className="label">{label}</div>
      <div className="value">
        {typeof value === "string" ? (!value ? "N/A" : value) : value}
      </div>
    </div>
  );
}

export default function WorkerProfileInfo({ worker }: { worker: WorkerType }) {
  return (
    <Wrapper span={24} xl={6}>
      <div className="content">
        <Row gutter={[24, 10]}>
          <Col span={8} md={24}>
            <div className="image">
              <img src={worker?.image} alt="" />
            </div>
          </Col>
          <Col span={8} md={12} xl={24}>
            <div className="info">
              <div className="name">{worker.name}</div>
              <Item label="Phone" value={worker.phone} />
              <Item label="Nagad" value={worker.nagad} />
              <Item label="Bkash" value={worker.bkash} />
              <Item
                label="Active Payment Account"
                value={worker.active_account}
              />
            </div>
          </Col>
          <Col span={8} md={12} xl={24} style={{ marginLeft: "auto" }}>
            <div className="account">
              <Item
                label="Total Order Amount"
                value={worker.commission.toString()}
              />
              <Item
                label="Total Adjustment"
                value={worker.total_adjustment.toString()}
              />
              <Item label="Total Paid" value={worker.total_paid.toString()} />
              <Item label="Payable" value={worker.payable.toString()} />
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(Col)`
  .content {
    background: #fff;
    padding: 16px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    @media (min-width: 1200px) {
      min-height: calc(100vh - 100px);
    }

    .image {
      width: 140px;
      height: 140px;
      background: lightgray;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .name {
      font-size: 20px;
      margin-bottom: 10px;
      padding: 10px;
    }

    .info,
    .account {
      max-width: 400px;
      .value {
        color: gray;
      }
    }

    .account {
      margin-left: auto;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .label {
      width: 45%;
    }
  }
`;
