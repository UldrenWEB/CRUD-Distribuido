import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import extractJSON from "../utils/extractJSON.js";

const config = extractJSON({ path: "../configs/grpc.json" });

class GrpcClient {
  constructor({ protoBuffer, host }) {
    this.packageDefinition;
    this.host = host;
    this.protoBuffer = protoBuffer;
    this.#loader();
  }

  #loader = () => {
    this.packageDefinition = protoLoader.loadSync(this.protoBuffer, config);
  };

  executeMethod = async ({
    packageName,
    service,
    method,
    params = {},
    callback,
  }) => {
    if (!this.packageDefinition) return false;

    const MyPackage = grpc.loadPackageDefinition(this.packageDefinition)[
      packageName
    ];
    const client = new MyPackage[service](
      this.host,
      grpc.credentials.createInsecure()
    );

    const result = client[method]({ ...params }, callback);

    return result;
  };
}

export default GrpcClient;
