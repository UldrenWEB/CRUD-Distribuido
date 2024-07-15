import extractJSON from "../utils/extractJSON.js";
import db from "../instance/iDBComponent.js";
import MicroserviceServer from "../components/MicroserviceServer.js";

const message = extractJSON({ path: "../configs/message.json" });

const server = new MicroserviceServer({
  protoType: "delete",
  hostType: "host_5",
});

const deleteProduct = async (call, callback) => {
  const param = call.request;
  try {
    const result = await db.executeQuery({
      key: "delete_product",
      params: [param.id],
    });

    callback(null, {
      message:
        result <= 0
          ? "No se ha borrado el producto"
          : "Se ha borrado correctamente el producto",
    });
  } catch (error) {
    callback(new Error(message["error"].RequestDBError));
  }
};

const init = () => {
  server.addService("delete", "Delete", {
    DeleteProduct: deleteProduct,
  });

  server.start();
};

init();
