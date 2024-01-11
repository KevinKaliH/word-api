import * as docx from "docx";
import { getValue } from "../../../utils/json.util";

export function missionVisionSection(dataObject: any): any {
  const tempChildren: docx.ParagraphChild[] | undefined = [];
  const getVal = (pName: string) => getValue(pName, dataObject);

  function content(propertyName: string) {
    const val = getVal(propertyName);
    const children: docx.ParagraphChild[] = [];

    const temp = val.split("\n");

    const title = temp.shift()!;
    const textContent = temp.join("\n");

    children.push(new docx.TextRun({ text: title, bold: true }));
    children.push(new docx.TextRun({ text: textContent, break: 2 }));
    children.push(new docx.TextRun({ break: 2 }));
    return children;
  }

  return new docx.Paragraph({
    children: [...content("Mision"), ...content("Vision")],
  });
}
