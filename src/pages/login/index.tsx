import { Row, Col } from "antd";
import LoginForm from "../../components/user/LoginForm";
import "./style.scss";

export default function Login() {
  return (
    <Row className="login-page" justify="center" align="middle">
      <h1 className="login-title">
        {" "}
        <span className="hello">Hello</span>
        <span className="task">Task</span>
      </h1>
      <Col span={24} md={12} lg={8} xl={8}>
        <LoginForm />
      </Col>
    </Row>
  );
}
