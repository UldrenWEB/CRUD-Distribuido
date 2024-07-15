import { DBComponent } from "../components/DBComponent.js";
import extractJSON from "../utils/extractJSON.js";

const sentences = extractJSON({ path: "../configs/sentences.json" });
const configPG = extractJSON({ path: "../configs/pg.json" });

const dbcomponent = new DBComponent(configPG).setSentences(sentences);

export default dbcomponent;
