import GrpcServer from "../components/GrpcServer.js";
import { PROTOS } from "../protos/index.js";
import extractJSON from "../utils/extractJSON.js";

const hosts = extractJSON({ path: "../configs/hosts.json" });

class MicroserviceServer {
  constructor({ protoType, hostType }) {
    this.protoType = protoType;
    this.hostConfig = hosts[hostType];
    this.services = {};
    this.protoPath = PROTOS({ type: protoType });
  }

  addService(packageName, serviceName, methods) {
    if (!this.services[packageName]) {
      this.services[packageName] = {};
    }
    this.services[packageName][serviceName] = methods;
  }

  start() {
    const server = new GrpcServer({
      protoBuffer: this.protoPath,
      host: this.hostConfig,
    });

    Object.keys(this.services).forEach((packageName) => {
      Object.keys(this.services[packageName]).forEach((serviceName) => {
        server.addService(
          packageName,
          serviceName,
          this.services[packageName][serviceName]
        );
      });
    });

    server.start();
  }
}

export default MicroserviceServer;
