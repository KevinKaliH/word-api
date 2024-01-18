import { AlignmentType, INumberingOptions, LevelFormat } from "docx";

export const configNumbering: INumberingOptions = {
  config: [
    {
      reference: "myObjectiveNumbers",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.START,
        },
      ],
    },
  ],
};
