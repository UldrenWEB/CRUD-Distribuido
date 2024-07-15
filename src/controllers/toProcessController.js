import extractJSON from "../utils/extractJSON.js";

const message = extractJSON({ path: "../configs/message.json" });

class ToProcessController {
  static executeMethod = async (req, res) => {
    try {
      const { objName, module, method, params } = req.body;

      if (!objName || !module || !method) {
        return res.status(400).json(message["error"].MissingParameters);
      }

      const objNameFormatted = objName.toLowerCase();

      let objImport = await import(`../BO/${module}/${objNameFormatted}.js`);
      let obj = new objImport.default();

      const result = params ? await obj[method](params) : await obj[method]();

      return res.json({
        message: message["success"].RequestSuccess,
        data: result,
      });
    } catch (error) {
      return res.status(500).json(message["error"].InvalidParameters);
    }
  };
}

export default ToProcessController;
