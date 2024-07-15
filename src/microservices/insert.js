import extractJSON from "../utils/extractJSON.js";
import db from "../instance/iDBComponent.js";
import MicroserviceServer from "../components/MicroserviceServer.js";

const message = extractJSON({ path: "../configs/message.json" });

const server = new MicroserviceServer({
  protoType: "insert",
  hostType: "host_2",
});

const insertProduct = async (call, callback) => {
  const param = call.request;

  try {
    const result = await db.executeQuery({
      key: "insert_product",
      params: [
        param.product_de,
        param.product_pr,
        param.product_sk,
        param.product_st,
      ],
    });

    callback(null, {
      message:
        result <= 0
          ? "No se ha podido insertar"
          : "Producto agregado con exito",
    });
  } catch (error) {
    callback(new Error(message["error"].RequestDBError));
  }
};

const init = () => {
  server.addService("insert", "Insert", {
    InsertProduct: insertProduct,
  });

  server.start();
};

init();
