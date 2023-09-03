import { useQuery } from "@tanstack/react-query";
import { balanceReport } from "../../net/report";
import { BalanceReportType } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { Descriptions, DescriptionsProps } from "antd";

function BalanceReport({ data }: { data: BalanceReportType }) {
  const items: DescriptionsProps["items"] = [
    {
      key: "order_value",
      label: "Order Value",
      children: data.order_value.toLocaleString(),
      span: 2,
    },
    {
      key: "discount",
      label: "Order Discount",
      children: data.discount.toLocaleString(),
      span: 2,
    },
    {
      key: "customer_payment",
      label: "Cash In Through Customer",
      children: data.customer_payment.toLocaleString(),
      span: 2,
    },
    {
      key: "refund",
      label: "Total Refund",
      children: data.refund.toLocaleString(),
      span: 2,
    },
    {
      key: "compensation",
      label: "Total Compensation",
      children: data.compensation.toLocaleString(),
      span: 2,
    },
    {
      key: "service_charge",
      label: "Total Service Charge",
      children: data.service_charge.toLocaleString(),
      span: 2,
    },
    {
      key: "vat",
      label: "Total vat",
      children: data.vat.toLocaleString(),
      span: 2,
    },
    {
      key: "adjustment",
      label: "Total Adjustment",
      children: data.adjustment.toLocaleString(),
      span: 2,
    },
    {
      key: "bonus",
      label: "Total Worker Bonus",
      children: data.bonus.toLocaleString(),
      span: 2,
    },
    {
      key: "worker_commission",
      label: "Total Worker Commission",
      children: data.worker_commission.toLocaleString(),
      span: 2,
    },
    {
      key: "worker_payment",
      label: "Total Worker Payment",
      children: data.worker_payment.toLocaleString(),
      span: 2,
    },
    {
      key: "workers_payable",
      label: "Still Workers Payable",
      children:
        data.worker_commission +
        data.adjustment +
        data.bonus -
        data.worker_payment,
    },
    {
      key: "revenue",
      label: "Total Revenue",
      children: (
        data.order_value -
        data.worker_commission -
        data.discount
      ).toLocaleString(),
    },
  ];

  return (
    <Descriptions
      className="box-light"
      bordered
      title="Balance Report"
      items={items}
    />
  );
}

export default function Home() {
  const query = useQuery<BalanceReportType, CustomError>({
    queryKey: ["balance/report"],
    queryFn: balanceReport,
  });

  return (
    <div>
      {query.isLoading && <div>Loading...</div>}
      {query.isSuccess && <BalanceReport data={query.data} />}
    </div>
  );
}
