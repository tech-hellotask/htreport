import { useEffect, useState, createContext, useContext } from "react";
import Parse from "parse";
import {
  Affix,
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Popover,
  Select,
  Space,
  Switch,
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  MinusCircleTwoTone,
  PlusOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaUsersCog } from "react-icons/fa";
import useUser from "../../hooks/useUser";

const Context = createContext({});

function Page({
  index,
  title,
  pageKey,
  components = [],
  users: pageUsers = [],
  roles: pageRoles = [],
}) {
  const [open, setOpen] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addKey, setAddKey] = useState("");
  const [editTitle, setEditTitle] = useState(title);
  const [editKey, setEditKey] = useState(pageKey);
  const [users, setUsers] = useState(pageUsers);
  const [roles, setRoles] = useState(pageRoles);
  const {
    editPage,
    addUsers,
    deletePage,
    addComponent,
    deleteComponent,
    allUsers,
    usersById,
    deleteUser,
    allRoles,
    addRoles,
    deleteRole,
  } = useContext(Context);

  return (
    <Draggable key={pageKey} draggableId={`${pageKey}-${index}`} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="page"
          >
            <div className="flex-between">
              <div className="title">{title}</div>
              <Space>
                <Popover content="Add new component">
                  <Button
                    icon={<PlusOutlined />}
                    shape="circle"
                    size="small"
                    onClick={() =>
                      setOpen((v) => (v === "add" ? false : "add"))
                    }
                  />
                </Popover>
                <Popover content="Edit page">
                  <Button
                    icon={<EditOutlined />}
                    shape="circle"
                    size="small"
                    onClick={() =>
                      setOpen((v) => (v === "edit" ? false : "edit"))
                    }
                  />
                </Popover>
                <Popover content="Edit Users">
                  <Button
                    icon={<UserOutlined />}
                    shape="circle"
                    size="small"
                    onClick={() =>
                      setOpen((v) => (v === "user" ? false : "user"))
                    }
                  />
                </Popover>
                <Popover content="Edit Roles">
                  <Button
                    icon={<FaUsersCog />}
                    shape="circle"
                    size="small"
                    onClick={() =>
                      setOpen((v) => (v === "role" ? false : "role"))
                    }
                  />
                </Popover>
                <Popconfirm
                  title="Are you sure you want to delete this item?"
                  onConfirm={() => deletePage(pageKey)}
                  okText="Yes"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    shape="circle"
                    size="small"
                    danger
                  />
                </Popconfirm>
              </Space>
            </div>

            {open === "add" && (
              <div className="add-new">
                <Space>
                  <Input
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    placeholder="Component Title"
                  />
                  <Input
                    value={addKey}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && !value.match(/^[a-zA-Z0-9_]+$/)) {
                        message.error(
                          "Only alphanumeric and underscore allowed"
                        );
                        return;
                      }
                      setAddKey(value);
                    }}
                    placeholder="Component Key"
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      addComponent({
                        page: pageKey,
                        value: { title: addTitle, key: addKey },
                      });
                      setAddKey("");
                      setAddTitle("");
                    }}
                  >
                    Add
                  </Button>
                </Space>
              </div>
            )}
            {open === "edit" && (
              <div className="add-new">
                <Space>
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Page Title"
                  />
                  <Input
                    value={editKey}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && !value.match(/^[a-zA-Z0-9_]+$/)) {
                        message.error(
                          "Only alphanumeric and underscore allowed"
                        );
                        return;
                      }
                      setEditKey(value);
                    }}
                    placeholder="Page Key"
                  />
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      editPage({
                        prevKey: pageKey,
                        title: editTitle,
                        key: editKey,
                      });
                      setOpen(false);
                    }}
                  >
                    Update
                  </Button>
                </Space>
              </div>
            )}
            {open === "user" && (
              <div className="add-new">
                <div className="flex-between">
                  <Select
                    showSearch
                    style={{ width: "calc(100% - 120px)" }}
                    mode="multiple"
                    placeholder="Select users"
                    value={users}
                    onChange={(value) => setUsers(value)}
                    filterOption={(input, option) => {
                      return (
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  >
                    {allUsers.map((user) => (
                      <Select.Option key={user.id} value={user.id}>
                        {`${user.get("name")} (${user.get("type")})`}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      addUsers({
                        page: pageKey,
                        users,
                      });
                      setOpen(false);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
            {open === "role" && (
              <div className="add-new">
                <div className="flex-between">
                  <Select
                    showSearch
                    style={{ width: "calc(100% - 120px)" }}
                    mode="multiple"
                    placeholder="Select roles"
                    value={roles}
                    onChange={(value) => setRoles(value)}
                    filterOption={(input, option) => {
                      return (
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  >
                    {allRoles.map((role) => (
                      <Select.Option
                        style={{ textTransform: "capitalize" }}
                        key={role}
                        value={role}
                      >
                        {role}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      addRoles({
                        page: pageKey,
                        roles,
                      });
                      setOpen(false);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}

            {open !== "user" && pageUsers.length > 0 && (
              <div className="users">
                {pageUsers.map((id) => {
                  return (
                    <div key={id} className="user">
                      <UserOutlined className="icon" /> {usersById[id]?.name}{" "}
                      <MinusCircleTwoTone
                        style={{ marginLeft: "10px" }}
                        onClick={() => deleteUser({ page: pageKey, user: id })}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {open !== "role" && pageRoles.length > 0 && (
              <div className="roles">
                {pageRoles.map((role) => {
                  return (
                    <div key={role} className="role">
                      {role}
                      <MinusCircleTwoTone
                        style={{ marginLeft: "10px" }}
                        onClick={() => deleteRole({ page: pageKey, role })}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {components.length > 0 && (
              <div className="components">
                {components.map(({ title, key }) => (
                  <Popover key={key} content={key}>
                    <div className="component">
                      <div>{title}</div>{" "}
                      <div style={{ marginLeft: "10px" }}>
                        <MinusCircleOutlined
                          onClick={() => {
                            deleteComponent({ page: pageKey, key });
                          }}
                        />
                      </div>
                    </div>
                  </Popover>
                ))}
              </div>
            )}
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  );
}

export default function RoleSettings() {
  const [madmin, setMadmin] = useState({
    object: null,
    pages: [],
  });
  const [pageTitle, setPageTitle] = useState("");
  const [pageKey, setPageKey] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [allRoles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const { fetchRoles } = useUser();

  const fetchMadminConfig = async () => {
    try {
      const res = await new Parse.Query("config")
        .equalTo("key", "madmin")
        .first();
      if (res) {
        const data = res.get("value") || {};
        setMadmin({
          object: res,
          pages: data.pages || [],
        });
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const savePages = async (object) => {
    try {
      await object.save();
      message.success("Saved!");
    } catch (err) {
      message.error(err.message);
    }
  };

  const updatePages = async (cb) => {
    try {
      const pages = cb(madmin.pages);
      const { object } = madmin;
      const value = object.get("value") || {};
      value.pages = pages;
      object.set("value", value);

      if (!editMode) {
        await savePages(object);
      }

      setMadmin((m) => ({ ...m, pages }));
      return pages;
    } catch (err) {
      message.error(err.message);
    }
  };

  const addPage = (value) => {
    updatePages((v) => [value, ...v]);
    setPageTitle("");
    setPageKey("");
  };

  const editPage = ({ prevKey, title, key }) => {
    updatePages((page) => {
      const index = page.findIndex((p) => p.key === prevKey);
      if (index !== -1) {
        page[index].title = title;
        page[index].key = key;
      }
      return [...page];
    });
  };

  const deletePage = (key) => {
    updatePages((page) => {
      const pages = page.filter((p) => p.key !== key);
      return [...pages];
    });
  };

  const addComponent = ({ page, value }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      console.log(index);
      if (index !== -1) {
        console.log(pages[index].components);
        pages[index].components = [...pages[index].components, value];
      }
      return [...pages];
    });
  };

  const deleteComponent = ({ page, key }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      if (index !== -1) {
        pages[index].components = pages[index].components.filter(
          (c) => c.key !== key
        );
      }
      return [...pages];
    });
  };

  const addUsers = ({ page, users }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      if (index !== -1) {
        pages[index].users = users;
      }
      return [...pages];
    });
  };

  const addRoles = ({ page, roles }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      if (index !== -1) {
        pages[index].roles = roles;
      }
      return [...pages];
    });
  };

  const deleteUser = ({ page, user }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      if (index !== -1) {
        pages[index].users = pages[index].users.filter((u) => u !== user);
      }
      return [...pages];
    });
  };

  const deleteRole = ({ page, role }) => {
    updatePages((pages) => {
      const index = pages.findIndex((p) => p.key === page);
      if (index !== -1) {
        pages[index].roles = pages[index].roles.filter((u) => u !== role);
      }
      return [...pages];
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await new Parse.Query(Parse.User)
        .select(["name", "type"])
        .notContainedIn("type", ["customer", "rider", "partner"])
        .limit(200)
        .find();
      setAllUsers(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  const onDragEnd = async ({ source, destination }) => {
    if (selectedRole) return;
    else if (!source || !destination) return;
    else if (source.index === destination.index) return;

    updatePages((pages) => {
      const src = pages[source.index];
      pages.splice(source.index, 1);
      pages.splice(destination.index, 0, src);
      return [...pages];
    });
  };

  useEffect(() => {
    fetchMadminConfig();
    fetchUsers();
    fetchRoles({}, (err, data) => {
      if (err) message.error(err);
      else {
        setRoles(data.map((r) => r.get("name")));
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        addPage,
        addUsers,
        editPage,
        deletePage,
        addComponent,
        deleteComponent,
        pages: madmin.pages,
        allUsers,
        allRoles,
        deleteUser,
        deleteRole,
        addRoles,
        usersById: allUsers.reduce((acc, user) => {
          acc[user.id] = user.toJSON();
          return acc;
        }, {}),
      }}
    >
      <Wrapper>
        <div>
          <Affix offsetTop={64}>
            <div className="add-new topbar flex-between">
              <Space>
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Page title"
                />
                <Input
                  value={pageKey}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && !value.match(/^[a-zA-Z0-9_]+$/)) {
                      message.error("Only alphanumeric and underscore allowed");
                      return;
                    }
                    setPageKey(value);
                  }}
                  placeholder="Page key"
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    addPage({
                      title: pageTitle,
                      key: pageKey,
                      components: [],
                      users: [],
                    });
                  }}
                >
                  Add
                </Button>
                <Space>
                  <label>Filter By Role</label>
                  <Select
                    allowClear
                    value={selectedRole}
                    onChange={(v) => setSelectedRole(v)}
                    placeholder="Filter By Role"
                    style={{ width: "200px" }}
                  >
                    {allRoles.map((role) => (
                      <Select.Option value={role}>{role}</Select.Option>
                    ))}
                  </Select>
                </Space>
              </Space>
              <Space>
                {editMode && (
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => {
                      savePages(madmin.object);
                    }}
                  >
                    Update
                  </Button>
                )}
                <Space>
                  <div>Edit Once</div>
                  <Switch onClick={setEditMode} checked={editMode}></Switch>
                </Space>
              </Space>
            </div>
          </Affix>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="drop">
              {(provided) => {
                return (
                  <Col
                    span={24}
                    lg={18}
                    xl={14}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable"
                  >
                    {madmin.pages.map(
                      (page, i) =>
                        (!selectedRole ||
                          page.roles?.includes(selectedRole)) && (
                          <Page
                            key={page.key}
                            index={i}
                            {...page}
                            pageKey={page.key}
                          />
                        )
                    )}

                    {provided.placeholder}
                  </Col>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </Wrapper>
    </Context.Provider>
  );
}

const Wrapper = styled.div`
  .add-new {
    margin-bottom: 10px;
    padding: 10px;

    &.topbar {
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }

  .page {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }

    .title {
      font-size: 16px;
      font-weight: 500;
    }

    .users {
      padding-left: 10px;
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;

      .user {
        background: #292929;
        padding: 3px 10px 3px 5px;
        margin-bottom: 5px;
        border-radius: 30px;
        margin-right: 5px;
        letter-spacing: 1px;
        font-size: 14px;
        color: #fff;

        .icon {
          margin-right: 5px;
          background: #fff;
          color: #292929;
          padding: 3px;
          border-radius: 50%;
        }
      }
    }

    .roles {
      padding-left: 10px;
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;

      .role {
        background: #faad14;
        padding: 2px 10px;
        margin-bottom: 5px;
        border-radius: 30px;
        margin-right: 5px;
        letter-spacing: 1px;
        font-size: 14px;
        text-transform: capitalize;
        font-weight: 500;

        .icon {
          margin-right: 5px;
          background: #fff;
          color: #292929;
          padding: 5px;
          border-radius: 50%;
        }
      }
    }

    .components {
      padding-left: 10px;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      .component {
        background: #f5f5f5;
        padding: 5px 10px;
        margin-bottom: 5px;
        border-radius: 5px;
        margin-right: 5px;
        display: flex;
      }
    }
  }
`;
