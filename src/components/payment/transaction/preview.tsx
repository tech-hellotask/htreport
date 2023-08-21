import { Alert, Button, Col, Modal, Row } from "antd";
import { TransactionPreviewType } from "../../../utils/types";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

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
      <Wrapper className="custom-scroll">
        <Row className="header" justify="space-around">
          <Col span={2}>
            <div className="item">
              {!items.some((item) => item.error) ? (
                <CheckCircleTwoTone
                  twoToneColor={"#52c41a"}
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <CloseCircleTwoTone
                  twoToneColor={"#ff0000"}
                  style={{ fontSize: "20px" }}
                />
              )}
            </div>
          </Col>
          <Col span={2}>
            <div className="item">Worker ID</div>
          </Col>
          <Col span={4}>
            <div className="item">Worker Name</div>
          </Col>
          <Col span={4}>
            <div className="item">Account No</div>
          </Col>
          <Col span={2}>
            <div className="item">Payment Method</div>
          </Col>
          <Col span={3}>
            <div className="item">Payable</div>
          </Col>
          <Col span={3}>
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
              className={`children ${item.error ? "error" : ""}`}
              justify="space-around"
            >
              <Col span={2}>
                <div className="item">
                  {!item.error && (
                    <CheckCircleTwoTone
                      twoToneColor={"#52c41a"}
                      style={{ fontSize: "20px" }}
                    />
                  )}
                  {item.error && (
                    <CloseCircleTwoTone
                      twoToneColor={"#ff0000"}
                      style={{ fontSize: "20px" }}
                    />
                  )}
                </div>
              </Col>
              <Col span={2}>
                <div className="item">{item.worker_id}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.worker_name}</div>
              </Col>
              <Col span={4}>
                <div className="item">{item.account_no}</div>
              </Col>
              <Col span={2}>
                <div className="item">{item.payment_method}</div>
              </Col>
              <Col span={3}>
                <div className="item">{item.payable}</div>
              </Col>
              <Col span={3}>
                <div className="item">{item.disbursement_amount}</div>
              </Col>
              <Col span={4}>
                {item.error && <div className={`item error`}>{item.error}</div>}
              </Col>
            </Row>
          );
        })}
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 73px);
  position: relative;

  .header {
    background-color: lightgray;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    .item {
      font-weight: 600;
      height: calc(100% - 20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
    }
  }

  .children {
    border-bottom: 1px solid #e8e8e8;

    &:last-child {
      border-bottom: none;
    }
  }

  .item {
    text-align: center;
    padding: 5px;
    border-right: 1px solid #e8e8e8;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: #f3f3f3;
    }
  }

  .error {
    color: red;
  }

  .children.error {
    background: #ffd6d6;
  }
`;
