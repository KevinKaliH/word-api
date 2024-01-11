import * as docx from "docx";
import { getValue } from "../../utils/json.util";
import * as fs from "fs";
import { missionVisionSection } from "./sections/mission-vision.section";
import { header } from "./sections/header";

export default class EirDocx {
  private sections: docx.ISectionOptions[] = [];
  private data: any = undefined;

  setData(data: any) {
    this.data = data;
  }

  async generate() {
    const doc = new docx.Document({
      sections: [
        {
          headers: {
            default: header(),
          },
          properties: {
            type: docx.SectionType.CONTINUOUS,
          },
          children: [missionVisionSection(this.data)],
        },
      ],
    });

    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
    });

    const b64string = await docx.Packer.toBase64String(doc);
    return b64string;
  }

  //mission, vision, valor
  private sMVV(val: string) {
    const children: docx.ParagraphChild[] = [];

    const temp = val.split("\n");

    const title = temp.shift()!;
    const textContent = temp.join("\n");

    children.push(new docx.TextRun({ text: title, bold: true }));
    children.push(new docx.TextRun({ text: textContent, break: 2 }));
    children.push(new docx.TextRun({ break: 2 }));
    return children;
  }

  private getVal(pName: string) {
    return getValue(pName, this.data);
  }
}
