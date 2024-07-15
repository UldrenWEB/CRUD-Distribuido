import extractJSON from "../utils/extractJSON.js";
import db from "../instance/iDBComponent.js";
import MicroserviceServer from "../components/MicroserviceServer.js";

const message = extractJSON({ path: "../configs/message.json" });

const server = new MicroserviceServer({
  protoType: "update",
  hostType: "host_4",
});

const updateProduct = async (call, callback) => {
  try {
    const param = call.request;

    const result = await db.executeQuery({
      key: "update_product",
      params: [
        param.product_de,
        param.product_pr,
        param.product_sk,
        param.product_st,
        param.product_id,
      ],
    });

    callback(null, {
      message:
        result <= 0
          ? "No se ha podido actualizar el producto"
          : "Producto actualizado con exito",
    });
  } catch (error) {
    callback(new Error(message["error"].RequestDBError));
  }
};

const init = () => {
  server.addService("update", "Update", {
    UpdateProduct: updateProduct,
  });

  server.start();
};

init();
