const getValue = (propertyName: string, object: any): any | null =>
  propertyName in object && object[propertyName];

export { getValue };

export class FormatTextValue {
  text: string = "";
  bold?: boolean;
  break: number = 1;
}

export function concatTextAfterString(
  value: string,
  afterWord: string,
  valueInsert: string
) {
  let indexInsert = afterWord.length;
  return value.slice(0, indexInsert) + valueInsert + value.slice(indexInsert);
}
