import { SyncOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, DatePicker, Row, message } from "antd";
import { useState } from "react";
import { migrateOrders } from "../../net/order";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";

function FetchOrders() {
  const [date, setDate] = useState("");
  const mutation = useMutation(migrateOrders, {
    onSuccess: () => {
      setDate("");
      message.success("Synced");
    },
  });

  return (
    <Col span={24} md={12} lg={8}>
      <div className="box-light">
        <h2 className="box-title">Sync Orders</h2>
        <ErrorAlert
          error={mutation.error as CustomError}
          isError={mutation.isError}
        />
        <div className="flex-between">
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="Select Date"
            onChange={(_, dateString) => {
              setDate(dateString);
            }}
            style={{ width: "100%" }}
            disabledDate={(current) => {
              return current.isAfter(new Date());
            }}
          />
          <Button
            style={{ marginLeft: "10px" }}
            icon={<SyncOutlined />}
            loading={mutation.isLoading}
            type="primary"
            onClick={() => {
              if (date) mutation.mutate(date);
              else {
                message.error("Please select a date");
              }
            }}
          >
            Sync
          </Button>
        </div>
      </div>
    </Col>
  );
}

export default function SyncPayments() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <FetchOrders />
      </Row>
    </div>
  );
}
