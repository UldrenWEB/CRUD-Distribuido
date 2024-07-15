import extractJSON from "../utils/extractJSON.js";
import db from "../instance/iDBComponent.js";
import MicroserviceServer from "../components/MicroserviceServer.js";

const server = new MicroserviceServer({
  protoType: "select",
  hostType: "host_1",
});

const message = extractJSON({ path: "../configs/message.json" });
const selectProduct = async (call, callback) => {
  const param = call.request;

  try {
    const result = await db.dbExecute({
      key: "select_product",
      params: [param.description],
    });
    const replies = { replies: result };
    callback(null, replies);
  } catch (error) {
    callback(new Error(message["error"].RequestDBError));
  }
};

const init = () => {
  server.addService("select", "Select", {
    SelectProduct: selectProduct,
  });

  server.start();
};

init();
