import extractJSON from "../utils/extractJSON.js";
import db from "../instance/iDBComponent.js";
import MicroserviceServer from "../components/MicroserviceServer.js";

const message = extractJSON({ path: "../configs/message.json" });

const server = new MicroserviceServer({
  protoType: "selectAll",
  hostType: "host_3",
});

const selectAllProducts = async (_call, callback) => {
  try {
    const result = await db.dbExecute({
      key: "select_all_product",
    });
    const replies = { replies: result };
    callback(null, replies);
  } catch (error) {
    callback(new Error(message["error"].RequestDBError));
  }
};

const init = () => {
  server.addService("selectAll", "SelectAll", {
    SelectAllProducts: selectAllProducts,
  });

  server.start();
};

init();
