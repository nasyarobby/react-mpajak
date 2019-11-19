export default function Terbilang(props) {
  let value = props.value;
  try {
    if (Number(value)) {
      let text = parse(value);
      let suffix = text.trim() === "" ? "" : " " + props.suffix;
      let output = text + suffix;
      if (props.uppercase) output = output.toUpperCase();
      return output;
    }
    return "";
  } catch (e) {
    console.log(e.message);
    return "Tidak Valid";
  }
}

function parse(number) {
  let numAsString = String(number);
  if (numAsString.length % 3 === 1) {
    numAsString = "  " + numAsString;
  } else if (numAsString.length % 3 === 2) {
    numAsString = " " + numAsString;
  }
  return wholeParse(numAsString.match(/.{3}/g).map(e => groupParse(Number(e))))
    .flat()
    .join(" ")
    .replace(/se /g, "se")
    .replace(/satu ratus/g, "seratus");
}

function wholeParse(input) {
  let groups = ["triliun", "miliar", "juta", "ribu"];
  groups = groups.slice(groups.length - input.length + 1);
  let data = [];
  for (let i = 0; i < input.length; i++) {
    if (groups[i] === "ribu" && input[i].length === 1 && input[i][0] === "satu")
      data.push("se");
    else data.push(input[i]);
    if (groups[i] && input[i][0]) data.push(groups[i]);
  }
  return data;
}
function groupParse(number, data = []) {
  if (number > 999 || number < 0)
    throw Error("Pecahan grup bilangan tidak sah.");

  if (number > 99) {
    let num = Math.floor(number / 100);
    let remainder = number % 100;
    data.push(text(num) + " ratus");
    return groupParse(remainder, data);
  } else if (number > 19) {
    let num = Math.floor(number / 10);
    let remainder = number % 10;
    data.push(text(num) + " puluh");
    return groupParse(remainder, data);
  } else if (number > 11) {
    let base = number - 10;
    data.push(text(base) + " belas");
    return data;
  } else {
    data.push(text(number));
    return data;
  }
}

function text(num) {
  let words = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas"
  ];
  return words[num];
}
