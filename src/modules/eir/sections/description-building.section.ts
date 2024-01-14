import * as docx from "docx";
import { FormatTextValue, getValue } from "../../../utils/json.util";
import {
  DOUBLE_SALT,
  HISTORICAL_TITLES,
  ONE_SALT,
} from "../../../utils/titles";

export function historicalSection(dataObject: any) {
  const textsTemplate: docx.ParagraphChild[] = [];
  let valueText = getValue("Antecedentes", dataObject) as string;

  const mission = getValue("Mision", dataObject);
  const vision = getValue("Vision", dataObject);
  if (mission) valueText = valueText.concat(DOUBLE_SALT + mission);
  if (vision) valueText = valueText.concat(DOUBLE_SALT + vision);

  //line salt and return cursor

  let isBeforeTitle = false;
  const arrayContent: FormatTextValue[] = [];

  //two next line
  const splitText = valueText.replace(/(?<!\r)\n/g, " ").split(DOUBLE_SALT);
  for (const two of splitText) {
    if (two.length == 0) continue;

    if (HISTORICAL_TITLES.includes(two.trim())) {
      arrayContent.push({
        text: two,
        break: isBeforeTitle ? 1 : 2,
        bold: true,
      });
    } else {
      // one next line
      two.split(ONE_SALT).forEach((one, indexOne) => {
        if (one.length > 0)
          arrayContent.push({ text: one, break: indexOne == 0 ? 2 : 1 });
      });
    }

    isBeforeTitle = HISTORICAL_TITLES.includes(two);
  }

  arrayContent.forEach((element) => {
    textsTemplate.push(new docx.TextRun({ ...element }));
  });

  return new docx.Paragraph({
    children: textsTemplate,
  });
}
