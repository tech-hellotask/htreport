import { Alert } from "antd";
import { CustomError, axiosErrorMsg } from "../utils/errors";

type ErrorAlertProps = {
  isError?: boolean;
  error: CustomError | null;
  style?: React.CSSProperties;
  margin?: boolean;
  closable?: boolean;
};

export function ErrorAlert({
  isError = true,
  error,
  style,
  margin = true,
  closable = true,
}: ErrorAlertProps) {
  if (isError) {
    return (
      <Alert
        message={axiosErrorMsg(error)}
        type="error"
        style={style ?? { marginBottom: margin ? "10px" : "0" }}
        closable={closable}
      />
    );
  }

  return null;
}
