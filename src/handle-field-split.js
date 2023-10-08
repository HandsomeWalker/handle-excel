// 判断是否属于竖线分隔符
function isSX(txt) {
  let res;
  if (txt.includes("║")) {
    res = "║";
  }
  if (txt.includes("‖")) {
    res = "‖";
  }
  if (txt.includes("||")) {
    res = "||";
  }
  return res;
}

// 统计；出现次数
function count(txt) {
  let res = 0;
  for (const item of txt) {
    if (item === "；") {
      res++;
    }
  }
  return res;
}
// 统计竖线分割出现次数
function countSX(txt) {
  let res = 0;
  let temp = "";
  for (const item of txt) {
    if (txt.includes("||")) {
      if (item === "|") {
        temp += item;
      } else if (temp === "||") {
        res++;
        temp = "";
      }
    } else if (isSX(item)) {
      res++;
    }
  }
  return res;
}

// 福建省特殊处理
function handleFJ(txt) {
  let res = txt.split("");
  let p = 0;
  const sxNum = countSX(txt);
  let temp = "";
  if (sxNum > 3) {
    res = txt.replace(/,/g, "；").split("");
  }
  for (let i = 0; i < res.length; i++) {
    const item = res[i];
    if (txt.includes("||")) {
      if (item === "|") {
        temp += item;
      } else if (temp === "||") {
        p++;
        temp = "";
        if (p % 3 === 2) {
          res.splice(i - 2, 2);
        }
      }
    } else if (isSX(item)) {
      p++;
      if (p % 3 === 2) {
        res.splice(i, 1);
      }
    }
  }
  return res.join("");
}
// 山东省特殊处理
function handleSD(txt) {}

function handle(txt) {
  let res = {
    不合格项目: "",
    检验结果: "",
    标准值: "",
  };
  txt = txt.split(isSX(txt));
  if (typeof txt === "string") {
    return { ...res, 不合格项目: txt };
  }
  res["不合格项目"] = txt[0];
  res["检验结果"] = txt[1];
  res["标准值"] = txt[2];
  return res;
}

export default function handleFieldSplit(item, rwly) {
  if (item["不合格项目"] && !item["检验结果"] && !item["标准值"]) {
    let txt = item["不合格项目"];
    let temp;
    if (rwly === "福建省市场监督管理局") {
      txt = handleFJ(txt);
    } else if (rwly === "山东省市场监督管理局") {
    }
    if (count(txt) > 1) {
      temp = [txt];
    } else {
      temp = txt.split("；");
    }
    temp = temp.map(handle);
    item["不合格项目"] = "";
    item["检验结果"] = "";
    item["标准值"] = "";
    temp.forEach((each) => {
      item["不合格项目"] += each["不合格项目"] + "；";
      item["检验结果"] += each["检验结果"] + "；";
      item["标准值"] += each["标准值"] + "；";
    });
    item["不合格项目"] = item["不合格项目"].replace(/；$/g, "");
    item["检验结果"] = item["检验结果"].replace(/；$/g, "");
    item["标准值"] = item["标准值"].replace(/；$/g, "");
  }
  return item;
}
