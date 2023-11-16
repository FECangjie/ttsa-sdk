export function log(...args: string[]) {
  const message = args.join(" ");
  console.log(message);
}

export function throwError(...args: (string | Error)[]) {
  const message = args.join(" ");
  console.error(message);
}

export function formatNumber(text: string) {
  let result = text;
  result = result.replace(/1\.(?!\d)/g, "一，");
  result = result.replace(/2\.(?!\d)/g, "二，");
  result = result.replace(/3\.(?!\d)/g, "三，");
  result = result.replace(/4\.(?!\d)/g, "四，");
  result = result.replace(/5\.(?!\d)/g, "五，");
  result = result.replace(/6\.(?!\d)/g, "六，");
  result = result.replace(/7\.(?!\d)/g, "七，");
  result = result.replace(/8\.(?!\d)/g, "八，");
  result = result.replace(/9\.(?!\d)/g, "九，");
  return result;
}

export function formatDate(text: string = "") {
  // let text = "08:00-22:00"
  const regex = /(\d{1,2}):(\d{1,2})\s?-\s?(\d{1,2}):(\d{1,2})/g;
  const times = text?.match(regex);
  times?.forEach(item => {
    
  })
  var match = text.split(':');
  console.log(match)
  if (match) {
    if (match[2] == "00") {
      match[2] = "";
    } else {
      match[2] = match[2] + "分";
    }
    if (match[4] == "00") {
      match[4] = "";
    } else {
      match[4] = match[4] + "分";
    }
    const result =
      match[1] + "点" + match[2] + "至" + match[3] + "点" + match[4];
    return result;
  }
  return "";
}
