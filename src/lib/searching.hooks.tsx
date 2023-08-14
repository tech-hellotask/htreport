import { useState, createRef } from "react";
import { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterDropdown from "./FilterDropdown";
import { FilterDropdownProps } from "antd/es/table/interface";

export const useInputSearch = () => {
  const [state] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const searchInput = createRef<InputRef>();

  const onFilter = (value, record, dataIndex) => {
    return record[dataIndex]
      ? record[dataIndex]
          .toString()
          ?.toLowerCase()
          ?.includes(typeof value === "string" ? value.toLowerCase() : value)
      : "";
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <FilterDropdown
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
        searchInput={searchInput}
      />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return onFilter(value, record, dataIndex);
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.current.select();
        }, 100);
      }
    },
  });

  return {
    state,
    getColumnSearchProps,
  };
};
