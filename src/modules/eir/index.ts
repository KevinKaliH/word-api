import * as docx from "docx";
import * as fs from "fs";
import { historicalSection } from "./sections/description-building.section";
import { header } from "./sections/header";
import { determinateAreasKCalSection } from "./sections/kcal-work.section";
import { footer } from "./sections/footer";
import { areaRiskProbabilitySection } from "./sections/area-risk-probability.section";
import { introductionSection } from "./sections/introduction.section";
import { objectivesSection } from "./sections/objectives.section";
import { configNumbering } from "./utils/config-docx";

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
          footers: {
            default: footer(this.data),
          },
          properties: {
            type: docx.SectionType.CONTINUOUS,
          },
          children: [
            ...introductionSection(),
            ...objectivesSection(),
            ...historicalSection(this.data),
            ...determinateAreasKCalSection(this.data),
          ],
        },
        ...areaRiskProbabilitySection(this.data),
      ],
      numbering: configNumbering,
    });

    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
    });

    const b64string = await docx.Packer.toBase64String(doc);
    return b64string;
  }
}
