import { Alert } from "antd";
import { CustomError, axiosErrorMsg } from "../utils/errors";

type ErrorAlertProps = {
  isError: boolean;
  error: CustomError | null;
  style?: React.CSSProperties;
  margin?: boolean;
};

export function ErrorAlert({
  isError,
  error,
  style,
  margin = false,
}: ErrorAlertProps) {
  if (isError) {
    return (
      <Alert
        message={axiosErrorMsg(error)}
        type="error"
        style={style ?? { marginBottom: margin ? "10px" : "0" }}
      />
    );
  }

  return null;
}
