import { Alert, Button, Col, Modal, Row } from "antd";
import { TransactionPreviewType } from "../../../utils/types";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { UploadOutlined } from "@ant-design/icons";

export default function TransactionPreview({
  items,
  submit,
  isSuccess,
  isLoading,
  reset,
}: {
  items: TransactionPreviewType[];
  submit: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  if (!items || !items.length) {
    return null;
  }

  return (
    <Modal
      open={open}
      width={window.innerWidth}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: "100%",
        height: "100vh",
      }}
      title={
        <div className="flex-between">
          <div>Payment Preview</div>
          <div style={{ marginRight: "40px" }}>
            {!isSuccess && !items.some((item) => item.error) && (
              <Button
                loading={isLoading}
                onClick={() => submit()}
                type="primary"
                icon={<UploadOutlined />}
              >
                Submit
              </Button>
            )}
            {isSuccess && (
              <Alert message="Successfully uploaded" type="success" showIcon />
            )}
          </div>
        </div>
      }
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Wrapper>
        <Row gutter={[16, 16]} className="header" justify="space-around">
          <Col span={4}>
            <div className="item">Worker Name</div>
          </Col>
          <Col span={4}>
            <div className="item">Account No</div>
          </Col>
          <Col span={4}>
            <div className="item">Payment Method</div>
          </Col>
          <Col span={4}>
            <div className="item">Payable</div>
          </Col>
          <Col span={4}>
            <div className="item">Disbursement Amount</div>
          </Col>
          <Col span={4}>
            <div className="item">Error</div>
          </Col>
        </Row>
        {items.map((item, i) => {
          return (
            <Row
              key={i}
              gutter={[16, 16]}
              className={`children ${item.error ? "error" : ""}`}
              justify="space-around"
            >
              <Col span={4}>
                <div className="item">{item.worker_name}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.account_no}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.payment_method}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.payable}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.disbursement_amount}</div>
              </Col>
              <Col span={4}>
                <div className={`item`}>{item.error}</div>
              </Col>
            </Row>
          );
        })}
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  .header {
    background-color: lightgray;
    margin-bottom: 10px;

    .item {
      font-weight: 600;
    }
  }

  .children {
    padding: 10px 0;
  }

  .item {
    text-align: center;
    padding: 5px;
  }

  .children:nth-child(odd) {
    background-color: lightgray;
  }

  .error {
    color: red;
  }
`;
