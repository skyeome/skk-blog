import type { NotificationInstance } from "antd/es/notification/interface";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

export const checkImageValidation = (
  api: NotificationInstance,
  file?: File
): boolean => {
  if (file?.size === undefined) {
    api.error({ message: "파일이 없습니다." });
    return false;
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    api.error({ message: "파일이 너무 큽니다.(제한: 5MB)" });
    return false;
  }
  if (!file.type.includes("png") && !file.type.includes("jpeg")) {
    api.error({
      message: "파일 확장자가 올바르지 않습니다.(png, jpeg만 가능)",
    });
    return false;
  }

  return true;
};
