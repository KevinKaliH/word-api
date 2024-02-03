import * as docx from "docx";
import * as fs from "fs";

export default class EirDocx {
  private data: any = undefined;

  setData(data: any) {
    this.data = data;
  }

  async generate() {
    const doc = new docx.Document({});

    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
    });

    const b64string = await docx.Packer.toBase64String(doc);
    return b64string;
  }
}
