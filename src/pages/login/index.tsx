import { Row, Col, message } from "antd";
import LoginForm, { LoginInputs } from "../../components/user/LoginForm";
import "./style.scss";
import { authLogin } from "../../store/auth";
import { useAppDispatch } from "../../store";

export default function Login() {
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginInputs) => {
    try {
      dispatch(authLogin(values));
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Row className="login-page" justify="center" align="middle">
      <h1 className="login-title">
        {" "}
        <span className="hello">Hello</span>
        <span className="task">Task</span>
      </h1>
      <Col span={24} md={12} lg={8} xl={8}>
        <LoginForm onFinish={onFinish} />
      </Col>
    </Row>
  );
}
