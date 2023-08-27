import { useState, createRef } from "react";
import { DatePicker, InputRef } from "antd";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
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

export const dateSearchProps = () => ({
  filterDropdown: ({ setSelectedKeys, confirm }) => (
    <div style={{ padding: 8 }}>
      <DatePicker.RangePicker
        style={{ width: "250px" }}
        format="YYYY-MM-DD"
        size="large"
        value={setSelectedKeys[0]}
        onChange={(dates) => {
          setSelectedKeys(dates ? dates.map((date) => date.toISOString()) : []);
          confirm();
        }}
      />
    </div>
  ),
  filterIcon: (filtered: boolean) => {
    return (
      <div
        style={{
          fontSize: "20px",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CalendarOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      </div>
    );
  },
  sorter: (a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
});
