import * as docx from "docx";
import * as fs from "fs";
import { historicalSection } from "./sections/description-building.section";
import { header } from "./sections/header";
import { determinateAreasKCalSection } from "./sections/kcal-work.section";

export default class EirDocx {
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
          children: [
            historicalSection(this.data),
            ...determinateAreasKCalSection(this.data),
          ],
        },
        // {
        //   properties: {
        //     page: { size: { orientation: "landscape" } },
        //   },
        //   children: [...determinateAreasKCalSection(this.data)],
        // },
      ],
    });

    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
    });

    const b64string = await docx.Packer.toBase64String(doc);
    return b64string;
  }
}
