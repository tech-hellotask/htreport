export interface MenuItemType {
  key: string;
  icon: React.ReactNode;
  label: string | React.ReactNode;
  children?: MenuItemType[];
  type?: "group" | "item";
  link?: string;
  title?: string;
}

export type FileType = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  originFileObj: File;
  percent: number;
  size: number;
  status: string;
  type: string;
  uid: string;
};

export interface PaymentWorkerListItemType {
  id: number;
  pid?: number;
  name: string;
  image?: string;
  phone: string;
  nagad: string;
  bkash: string;
  active_account: string;
  total_paid: number;
  total_adjustment: number;
  total_commission: number;
  payable: number;
}

export interface ServiceListItemType {
  id: number;
  name: string;
  details: string;
  is_active: boolean;
  worker_category: string;
  created_at: string;
}

export interface AdjustmentType {
  id: number;
  worker_id: number;
  worker_pid: number;
  name: string;
  phone: string;
  amount: number;
  remarks: string;
  added_by: string;
  added_by_id: number;
  created_at?: string;
  updated_at?: string;
  payment_id?: number;
  payment_account_no?: string;
}

export interface OrderListItemType {
  id: number;
  type: string;
  customer_id: number;
  service_id: number;
  service_name: string;
  status: string;
  payment_status: string;
  area_id: number;
  created_at: string;
  work_hour: number;
  rate: number;
  regular_price: number;
  discount: number;
  vat: number;
  service_charge: number;
  final_price: number;
  refund: number;
}

export interface WorkerOrderListItemType {
  id: number;
  commission: number;
  type: string;
  status: string;
  order_status: string;
  is_backup: boolean;
  payment_id: number;
  payment_method: string;
  payment_account_no: string;
  payment_created_at: string;
  start_time: string;
  end_time: string;
  created_at: string;
  payment_status: string;
  final_price: number;
}

export interface OrderType {
  id: number;
  pid: number;
  type: string;
  customer_id: number;
  total_charge: number;
  discount: number;
  status: string;
  payment_status: string;
  area_id: number;
  created_at: string;
  worker_id: number;
  worker_pid: number;
  worker_type: string;
  worker_name: string;
  worker_phone: string;
  worker_image: string;
}

export interface TransactionType {
  id: number;
  worker_id: number;
  worker_pid: number;
  worker_name: string;
  worker_phone: string;
  account_no: string;
  payment_method: string;
  tx_id: string;
  note: string;
  paid_by: string;
  created_at: string;
}

export interface AdminType {
  id: number;
  pid: number;
  role: string;
  name: string;
  image: string;
  email: string;
  phone: string;
}

export interface RoleType {
  id: number;
  name: string;
  created_at: string;
}

export interface WorkerLedgerTypeItem {
  amount: number;
  remarks?: string;
  created_at: string;
  order_id?: number;
  order_status?: string;
  order_type?: string;
  is_backup?: boolean;
  payment_id?: number;
  payment_method?: string;
  payment_account_no?: string;
  payment_created_at?: string;
  payment_status?: string;
  status?: string;
  type: string;
  account_no?: string;
  note?: string;
  tx_id?: string;
  tx_type?: "debit" | "credit";
  is_delete?: boolean;
}

export interface WorkerLedgerType {
  end_date: string;
  items?: WorkerLedgerTypeItem[];
  start_date: string;
  debit: number;
  credit: number;
}

export interface AdminLoginResponse {
  accessToken: string;
  user: AdminType;
}

export interface TransactionPreviewType {
  worker_id: number;
  worker_name: string;
  account_no: string;
  active_account: string;
  payment_method: string;
  disbursement_amount: number;
  payable: number;
  error?: string;
}

export interface WorkerType {
  id: number;
  type: string;
  name: string;
  image?: string;
  phone: string;
  nagad: string;
  bkash: string;
  created_at: Date;
  active_account: string;
  total_paid: number;
  total_adjustment: number;
  commission: number;
  payable: number;
}

export interface PaymentPayableType {
  id: number;
  name: string;
  nagad: string;
  bkash: string;
  active_account: string;
  payable: number;
}

export interface PaymentLogType {
  id: number;
  status: string;
  account_type: string;
  user_name: string;
  created_at: string;
}

export interface OrderDetailsPaymentType {
  id: number;
  method: string;
  amount: number;
  remarks: string;
  tx_id: string;
  status: string;
  created_at: string;
  meta_info?: {
    trxID?: string;
    amount?: string;
    intent?: string;
    currency?: string;
    paymentID?: string;
    statusCode?: string;
    agreementID?: string;
    statusMessage?: string;
    customerMsisdn?: string;
    payerReference?: string;
    transactionStatus?: string;
    paymentExecuteTime?: string;
    merchantInvoiceNumber?: string;
  };
}

export interface OrderDetailsRefundType {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string;
  account_no: string;
  account_details: string;
  remarks: string;
  status: string;
  tx_id: string;
  customer_id: number;
  refund_by: string;
  created_at: string;
  updated_at: string;
}
export interface OrderDetailsType {
  id: number;
  type: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  service_id: number;
  service_name: string;
  worker_commission_type: string;
  worker_commission_amount: number;
  service_charge_type: string;
  service_charge_amount: number;
  rate_per_work: number;
  status: string;
  area_id: number;
  created_at: string;
  updated_at?: string;
  work_hour: number;
  rate: number;
  regular_price: number;
  discount: number;
  vat: number;
  service_charge: number;
  final_price: number;
  refund_amount: number;
  workers: OrderDetailsWorker[];
  payment: OrderDetailsPaymentType;
  refund: OrderDetailsRefundType | null;
}

export interface OrderDetailsWorker {
  id: number;
  worker_id: number;
  status: string;
  is_backup: boolean;
  payment_id: number;
  payment_account_no: string;
  payment_created_at: string;
  payment_method: string;
  worker_name: string;
  worker_phone: string;
  worker_image: string;
  commission: number;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export type ListResponse<T> = {
  list: T[];
  count: number;
};

export interface CustomerPaymentListItem {
  id: number;
  order_id: number;
  payment_method: string;
  amount: number;
  tx_id: string;
  remarks: string;
  status: string;
  created_at: string;
  updated_at: string;
  meta_info: string;
  customer_id: number;
  order_status: string;
  order_final_price: number;
}

export type BalanceReportType = {
  order_value: number;
  refund: number;
  compensation: number;
  service_charge: number;
  discount: number;
  vat: number;
  adjustment: number;
  worker_commission: number;
  worker_payment: number;
  customer_payment: number;
};

export interface ActivityLogType {
  id: number;
  user_id: number;
  user_email: string;
  msg: string;
  type: string;
  created_at: string;
  req_info?: string;
}

export interface CustomerListItemType {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  badge: string;
  created_at: string;
  paid: number;
  order_value: number;
  due: number;
}

export const orderColors = {
  Canceled: "red",
  Completed: "green",
  Rejected: "red",
};
