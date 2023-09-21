import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  deleteRoleAccess,
  fetchRoles,
  getRoleComponents,
} from "../../net/role";
import { ErrorAlert } from "../../lib/Alerts";
import { RoleComponentType, RoleType } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { Col, Row, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateRoleComponent from "./CreateComponent";
import CreateRoleAccess from "./CreateAccess";

const groupByTag = (items: RoleComponentType[] | null) => {
  if (!items) {
    return [];
  }
  const group = items.reduce((acc, item) => {
    const { tag } = item;
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(item);
    return acc;
  }, {} as Record<string, RoleComponentType[]>);

  return Object.entries(group).map(([key, value]) => {
    const items = value.sort((a, b) => a.name.localeCompare(b.name));

    return {
      name: key,
      items,
    };
  });
};

export default function RoleSettings() {
  const query = useQuery<RoleComponentType[], CustomError>({
    queryKey: ["/role/component"],
    queryFn: getRoleComponents,
  });
  const roles = useQuery<RoleType[], CustomError>({
    queryKey: ["/role/list"],
    queryFn: fetchRoles,
  });
  const mutation = useMutation(deleteRoleAccess, {
    onSuccess: () => {
      query.refetch();
    },
  });

  if (query.isLoading) {
    return "Loading...";
  }

  if (query.isError) {
    <ErrorAlert error={query.error} />;
  }

  const section = groupByTag(query.data);

  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="flex-between topbar">
            <h2>Role Settings</h2>
            <Space>
              <CreateRoleComponent
                onCreate={() => {
                  query.refetch();
                }}
              />
            </Space>
          </div>
          <div className="sections">
            {section.map((section, i) => (
              <div className="section" key={i}>
                <div className="section-title flex-between">
                  <div>{section.name}</div>
                </div>
                <div className="section-items">
                  <Row gutter={[16, 16]}>
                    {section.items.map((item) => {
                      return (
                        <Col md={12} lg={8} xl={6} key={item.id}>
                          <div className="page">
                            <div className="flex-between">
                              <div className="page-title">{item.name}</div>
                              <CreateRoleAccess
                                roles={roles.data}
                                itemId={item.id}
                                onCreate={() => {
                                  query.refetch();
                                }}
                              />
                            </div>
                            <ul className="roles">
                              {item.access.map((access) => {
                                return (
                                  <li className="roles-item" key={access.id}>
                                    <div>{access.role}</div>
                                    <DeleteOutlined
                                      style={{
                                        color: "#ff4d4f",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        mutation.mutate(access.id);
                                      }}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .topbar {
    margin-bottom: 20px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .section {
    margin-bottom: 10px;
    &-title {
      text-transform: capitalize;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    &-items {
      .page {
        background: #fff;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

        &-title {
          font-weight: 600;
          margin-bottom: 10px;
        }

        .roles {
          padding: 10px 0;
          list-style: none;
          padding-left: 20px;

          &-item {
            background: #f5f5f5;
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            margin-bottom: 5px;
            width: 250px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
`;
