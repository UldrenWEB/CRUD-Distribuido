import extractJSON from "../utils/extractJSON.js";
import { PROTOS } from "../protos/index.js";
import GrpcClient from "../components/GrpcClient.js";

const hosts = extractJSON({ path: "../configs/hosts.json" });

export const selectMicro = new GrpcClient({
  protoBuffer: PROTOS({ type: "select" }),
  host: hosts["host_1"],
});

export const insertMicro = new GrpcClient({
  protoBuffer: PROTOS({ type: "insert" }),
  host: hosts["host_2"],
});

export const selectAllMicro = new GrpcClient({
  protoBuffer: PROTOS({ type: "selectAll" }),
  host: hosts["host_3"],
});

export const updateMicro = new GrpcClient({
  protoBuffer: PROTOS({ type: "update" }),
  host: hosts["host_4"],
});

export const deleteMicro = new GrpcClient({
  protoBuffer: PROTOS({ type: "delete" }),
  host: hosts["host_5"],
});
