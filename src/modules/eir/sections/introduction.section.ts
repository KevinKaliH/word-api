import { HeadingLevel, Paragraph, TextRun } from "docx";
import { Introduction_Value } from "../utils/introduction.utils";

export function introductionSection() {
  return [
    new Paragraph({
      text: "INTRODUCCIÓN",
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: Introduction_Value.split("\r\n\r\n").map(
        (i) => new TextRun({ text: i, break: 2 })
      ),
    }),
  ];
}
