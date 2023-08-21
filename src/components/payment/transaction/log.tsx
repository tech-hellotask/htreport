import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPaymentLog, closePaymentLog } from "../../../net/payment";
import { CustomError } from "../../../utils/errors";
import { PaymentLogType } from "../../../utils/types";
import { ErrorAlert } from "../../../lib/Alerts";
import { getTimeAgo } from "../../../utils/func";
import { Alert, Button, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function PaymentLog() {
  const query = useQuery<PaymentLogType[], CustomError>({
    queryKey: ["/payment/log?status=init&limit=5"],
    queryFn: fetchPaymentLog,
  });
  const closeMutation = useMutation(closePaymentLog, {
    onSuccess: () => {
      query.refetch();
    },
  });

  if (query.isLoading) return <div>Payment log checking...</div>;
  if (query.isError) {
    return <ErrorAlert error={query.error} isError={query.isError} />;
  }
  if (query.isSuccess && query.data?.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      {query.data.map(({ id, account_type, status, created_at }) => (
        <Alert
          key={id}
          type="error"
          className="mb-10"
          message={`Your have ${
            status === "init" ? "Initiated" : status
          } ${account_type} payment ${getTimeAgo(created_at)}`}
          icon={
            <Popconfirm
              title="Are you sure you want to close this payment?"
              onConfirm={() => {
                closeMutation.mutate(id);
              }}
            >
              <Button
                icon={<CloseOutlined />}
                shape="circle"
                size="small"
                loading={closeMutation.isLoading}
                danger
              />
            </Popconfirm>
          }
          showIcon
        />
      ))}
    </div>
  );
}
