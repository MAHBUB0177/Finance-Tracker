import { message } from "antd";

export const successMessage = (response: string) => {
  message.success(response);
};

export const errorMessage = (response: string) => {
  message.error(response);
};
