import fs from 'fs';
import xlsx from 'node-xlsx';
import chalk from 'chalk';
import rule from '../config/rule.js';
import handleFieldSplit from './handle-field-split.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ignoreFieldSplitArr = [
  // '福建省市场监督管理局',
  // '山东省市场监督管理局'
];

// 获取表头，并整理excel表，只保留数据行
function getSheetTitleAndData(sheets) {
  let res = {
    data: []
  };
  const sheet = sheets[0];
  const { data: rows } = sheet;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!res.titles && row.length > 3 && !row.includes('')) {
      res.titles = row;
      continue;
    }
    if (res.titles) {
      res.data.push(row);
    }
  }
  return res;
}

// 是否命中字段映射
function isField(titles) {
  let res = {};
  for (const key in rule) {
    const fields = rule[key];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      if (title === key) {
        res[key] = i;
      }
      if (fields.includes(title)) {
        res[key] = i;
      }
    }
  }
  return res;
}

// 获取总表表头序号
function getIdx(dataMap) {
  let res = [];
  const arr = Object.keys(rule);
  for (const key in dataMap) {
    const getIdx = dataMap[key];
    res.push({ getIdx, putIdx: arr.indexOf(key) });
  }
  return res;
}

// 生成总表格式
function genStandardExcel(data, dataMap, rwly, ggrq, ggh) {
  let res = [];
  for (const row of data) {
    if (row.length === 0) {
      continue;
    }
    let arr = new Array(Object.keys(rule).length);
    const idxs = getIdx(dataMap);
    for (const idxObj of idxs) {
      arr[idxObj.putIdx] = row[idxObj.getIdx];
    }
    if (rwly && ggrq && ggh) {
      !arr[1] && (arr[1] = rwly.split('市场监')[0]);
      !arr[21] && (arr[21] = rwly);
      !arr[19] && (arr[19] = ggrq);
      !arr[18] && (arr[18] = ggh);
    }
    if (arr[12] === '/') {
      continue;
    }
    if (!ignoreFieldSplitArr.includes(rwly)) {
      // 处理不合格项字段拆分
      const temp = handleFieldSplit({
        '不合格项目': arr[12],
        '检验结果': arr[13],
        '标准值': arr[14]
      }, rwly);
      arr[12] = temp['不合格项目'];
      arr[13] = temp['检验结果'];
      arr[14] = temp['标准值'];
    }
    res.push(arr);
  }
  return res;
}

// 遍历excel文件
// 文件名为：任务来源_公告日期_公告号.xlsx，多个excel文件名字相同的情况下在最后加”_序号“
// 如：山西省市场监督管理局_2023-01-19_2023年第3批.xlsx
export default function walkExcel() {
  let data = [];
  const fileNames = fs.readdirSync(resolve(__dirname, '../sheets'));
  console.log(chalk.bgYellow.blue('标红的文件请手动处理'));
  for (const fileName of fileNames) {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.et')) {
      console.log(chalk.green(fileName));
    } else {
      console.log(chalk.red(fileName));
      continue;
    }
    const workSheetsFromFile = xlsx.parse(resolve(__dirname, `../sheets/${fileName}`));
    let temp = fileName.split('.')[0];
    temp = temp.split('_');
    const rwly = temp[0];
    const ggrq = temp[1];
    const ggh = temp[2];
    const titlesAndData = getSheetTitleAndData(workSheetsFromFile);
    if (rwly && ggrq && ggh) {
      data = [...data, ...genStandardExcel(titlesAndData.data, isField(titlesAndData.titles), rwly, ggrq, ggh)];
    } else {
      data = [...data, ...genStandardExcel(titlesAndData.data, isField(titlesAndData.titles))];
    }
  }
  data = [Object.keys(rule), ...data];
  const buffer = xlsx.build([{ name: 'sheet1', data }]);
  fs.writeFileSync('./sheets/总表.xlsx', buffer, { 'flag': 'w' });
}
