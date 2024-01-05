import prompts from "prompts";

const kilogramPlates = [
  { weight: 25, color: "RED" },
  { weight: 20, color: "BLUE" },
  { weight: 15, color: "YELLOW" },
  { weight: 10, color: "GREEN" },
  { weight: 5, color: "WHITE" },
  { weight: 2.5, color: "BLACK/COLLARS" },
  { weight: 1.25, color: "SILVER" },
];

const poundPlates = [
  { weight: 45 },
  { weight: 35 },
  { weight: 25 },
  { weight: 10 },
  { weight: 5 },
  { weight: 2.5 },
];

(async () => {
  const response = await prompts({
    type: "select",
    name: "metric",
    message: "kg or lbs",
    choices: [
      { title: "kg", value: "kg" },
      { title: "lbs", value: "lbs" },
    ],
  });

  if (response.metric === "kg") {
    const kgResponse = await prompts({
      type: "number",
      name: "weight",
      message: "input weight in increments of 1.25",
      validate: (value) =>
        value % 1.25 === 0 ? true : "Enter a valid number please",
    });
    //Do kg calculation
    let weightWithoutBar = kgResponse.weight - 20;

    let pointer = 0;
    const result = [];
    while (weightWithoutBar > 0 && pointer < kilogramPlates.length) {
      if (weightWithoutBar - kilogramPlates[pointer].weight * 2 >= 0) {
        weightWithoutBar =
          weightWithoutBar - kilogramPlates[pointer].weight * 2;
        result.push(kilogramPlates[pointer].color);
      } else {
        pointer++;
      }
    }
    console.log("Each side of the bar should contain: " + result.join(" "));
  } else {
    const lbsResponse = await prompts({
      type: "number",
      name: "weight",
      message: "input weight in increments of 2.5",
      validate: (value) =>
        value % 2.5 === 0 ? true : "Enter a valid number please",
    });
    let weightWithoutBar = lbsResponse.weight - 45;

    let pointer = 0;
    const result = [];
    while (weightWithoutBar > 0 && pointer < poundPlates.length) {
      if (weightWithoutBar - poundPlates[pointer].weight * 2 >= 0) {
        weightWithoutBar = weightWithoutBar - poundPlates[pointer].weight * 2;
        result.push(poundPlates[pointer].weight);
      } else {
        pointer++;
      }
    }
    console.log("Each side of the bar should contain: " + result.join(" "));
  }
})();
