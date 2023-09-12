import { Table } from "antd";
import { useState } from "react";

export default function useRowSelection<T>() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<T[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: T[]) => {
      setSelectedRowKeys(keys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return {
    rowSelection,
    selectedRowKeys,
  };
}
