"use strict";

import pkg from "pg";
const { Pool } = pkg;

export class DBComponent {
  constructor(config) {
    this.pool = new Pool(config);
    this.sentences = null;
  }

  #connect = async () => {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (err) {
      console.log("Hubo un error al conectarse: ", err);
      return false;
    }
  };

  setSentences = (sentences) => {
    this.sentences = sentences;
    return this;
  };

  executeQuery = async ({ key, params = undefined }) => {
    const client = await this.#connect();
    await client.query("BEGIN");

    try {
      const { rowCount } = await client.query(this.sentences[key], params);

      await client.query("COMMIT");
      client.release();

      return rowCount;
    } catch (error) {
      console.log(
        "Hubo un error al ejecutar la consulta Update, Delete or Insert",
        error
      );
      await client.query("ROLLBACK");
      client.release();

      return false;
    }
  };

  dbExecute = async ({ key, params = undefined }) => {
    const client = await this.#connect();
    try {
      const { rows } = await client.query(this.sentences[key], params);

      client.release();
      return rows;
    } catch (error) {
      console.log("Hubo un error al ejecutar la consulta", error);
      return false;
    }
  };

  endPool = async () => {
    try {
      await this.pool.end();
    } catch (error) {
      console.log(
        "Hubo un error al intentar cerrar el grupo de conexiones",
        error
      );
    }
  };
}
