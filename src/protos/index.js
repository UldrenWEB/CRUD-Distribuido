import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROTOS = ({ type }) => {
  const obj = {
    select: "select.proto",
    insert: "insert.proto",
    selectAll: "selectAll.proto",
    update: "update.proto",
    delete: "delete.proto",
  };

  if (!obj[type]) throw new Error("El tipo de proto no existe");

  const thepath = path.join(__dirname, obj[type]);
  return thepath;
};
