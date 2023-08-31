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
  total_bonus: number;
  total_adjustment: number;
  total_commission: number;
  payable: number;
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
}

export interface BonusType {
  id: number;
  worker_id: number;
  worker_pid: number;
  name: string;
  phone: string;
  amount: number;
  remarks: string;
  added_by: string;
  added_by_id: number;
  created_at: string;
  updated_at?: string;
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
  order_type?: string;
  payment_status?: string;
  status?: string;
  type: string;
  account_no?: string;
  note?: string;
  tx_id?: string;
  tx_type?: "debit" | "credit";
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
  total_bonus: number;
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

export interface OrderDetailsType {
  id: number;
  type: string;
  customer_id: number;
  service_id: number;
  service_name: string;
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
  refund: number;
  workers: OrderDetailsWorker[];
  payment: OrderDetailsPaymentType;
}

export interface OrderDetailsWorker {
  id: number;
  worker_id: number;
  worker: {
    id: number;
    name: string;
    phone: string;
    image: string;
  };
  commission_type: string;
  commission_amount: number;
  commission: number;
  due: number;
  status: string;
  updated_at?: string;
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
}

export type BalanceReportType = {
  order_value: number;
  refund: number;
  compensation: number;
  service_charge: number;
  discount: number;
  vat: number;
  adjustment: number;
  bonus: number;
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
