import assert from "node:assert/strict";

export default function tag(
  templateStrings: TemplateStringsArray,
  ...substitutions: (string | string[])[]
): string {
  let output = "";

  for (const index of substitutions.keys()) {
    const templateString = templateStrings[index];
    output += templateString;

    const substitution = substitutions[index];
    if (Array.isArray(substitution))
      for (const substitutionPart of substitution) output += substitutionPart;
    else output += substitution;
  }

  output += templateStrings.at(-1);

  return output;
}

if (process.env.TEST === "@leafac/tagged-template") {
  assert.equal(
    tag`Leandro ${"Facchinetti"} & ${["Louie", " ", "Renner"]}`,
    `Leandro Facchinetti & Louie Renner`
  );
}
