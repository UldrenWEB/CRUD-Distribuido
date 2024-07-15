import {
  deleteMicro,
  insertMicro,
  selectAllMicro,
  selectMicro,
  updateMicro,
} from "../../instance/iClientsGrpc.js";

class Products {
  constructor() {}

  insertProduct = ({ product_de, product_pr, product_sk, product_st }) => {
    return new Promise((resolve, reject) => {
      const callback = (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.message);
      };

      insertMicro.executeMethod({
        callback,
        packageName: "insert",
        service: "Insert",
        method: "InsertProduct",
        params: {
          product_de,
          product_pr,
          product_sk,
          product_st,
        },
      });
    });
  };

  selectProduct = ({ description }) => {
    return new Promise((resolve, reject) => {
      const callback = (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.replies);
      };

      selectMicro.executeMethod({
        callback,
        packageName: "select",
        service: "Select",
        method: "SelectProduct",
        params: {
          description,
        },
      });
    });
  };

  selectAllProduct = () => {
    return new Promise((resolve, reject) => {
      const callback = (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.replies);
      };
      selectAllMicro.executeMethod({
        callback,
        packageName: "selectAll",
        service: "SelectAll",
        method: "SelectAllProducts",
        params: [],
      });
    });
  };

  //Se tienen que pasar todos los parametros
  //TODO: Arreglar que si no se pasa y es null algun campo que tome el del registro original sin alterarlo
  updateProduct = ({
    product_de,
    product_pr,
    product_sk,
    product_st,
    product_id,
  }) => {
    return new Promise((resolve, reject) => {
      const callback = (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.message);
      };

      updateMicro.executeMethod({
        callback,
        packageName: "update",
        service: "Update",
        method: "UpdateProduct",
        params: {
          product_de,
          product_pr,
          product_sk,
          product_st,
          product_id,
        },
      });
    });
  };

  deleteProduct = ({ id }) => {
    return new Promise((resolve, reject) => {
      const callback = (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.message);
      };

      deleteMicro.executeMethod({
        callback,
        packageName: "delete",
        service: "Delete",
        method: "DeleteProduct",
        params: {
          id,
        },
      });
    });
  };
}

export default Products;
