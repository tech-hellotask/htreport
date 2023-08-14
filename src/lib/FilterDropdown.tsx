import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const FilterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  searchInput,
}) => (
  <div style={{ padding: 8 }}>
    <Input
      ref={searchInput}
      placeholder={`Search`}
      value={selectedKeys[0]}
      onChange={(e) => {
        setSelectedKeys(e.target.value ? [e.target.value] : []);
      }}
      onPressEnter={() => confirm()}
      style={{ marginBottom: 8, display: "block" }}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => confirm()}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button
        onClick={() => {
          if (clearFilters) clearFilters();
        }}
        size="small"
        style={{ width: 90 }}
      >
        Reset
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          confirm({ closeDropdown: false });
        }}
      >
        Filter
      </Button>
    </Space>
  </div>
);

export default FilterDropdown;
