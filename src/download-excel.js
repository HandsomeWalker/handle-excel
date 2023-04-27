import Crawler from "crawler";
import chalk from "chalk";
import nodeUrl, { fileURLToPath } from "node:url";
import util from "util";
import fs from "fs";
import downloadRule from "../config/download-rule.js";
import { resolve } from "path";
import { dirname } from "node:path";

const writeFile = util.promisify(fs.writeFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
let failProvinces = [];

const crawler = new Crawler({
  rateLimit: 500,
  maxConnections: 10,
  forceUTF8: false,
  // jquery: {
  //   name: 'cheerio',
  //   options: {
  //     normalizeWhitespace: true,
  //     xmlMode: true
  //   }
  // },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  },
});

function request(config) {
  return new Promise((resolve) => {
    crawler.queue({
      encoding: config.encoding,
      jquery: config.jquery,
      uri: config.url,
      callback(err, res, done) {
        if (err) {
          failProvinces.push({ province: config.province, err });
          done();
          resolve();
        } else {
          resolve(res);
          done();
        }
      },
    });
  });
}

export default async function crawl(timeReg) {
  console.log(`开始爬取${timeReg}数据`);
  let rules = downloadRule;
  // 测试
  // rules = downloadRule.filter((item) => item.province === "深圳市");
  for (const item of rules) {
    const handle = item?.handle;
    if (!handle) {
      console.log(chalk.bgYellow.blue("跳过下载：") + chalk.red(item.province));
      continue;
    }
    console.log(chalk.bgYellow.blue("当前处理：") + chalk.green(item.province));
    const {
      liEl,
      title = (res, el) => res?.$(el).find("a").text(),
      titleUrl = (res, el) => res?.$(el).find("a").attr("href"),
      time = (res, el) => res?.$(el).find("span").text(),
      titleReg = /食品安全抽检/,
      fileName = "抽检不合格",
      ggh = (title, res) =>
        title
          .match(/（.+）/)?.[0]
          .slice(1)
          .replace(/.$/, ""),
    } = handle;
    const res0 = await request(item);
    // 测试
    // console.log(res0.body)
    // console.log(liEl(res0).length)
    const lis = liEl(res0).filter((index, el) => {
      // console.log(title(res0, el), time(res0, el))
      return titleReg.test(title(res0, el)) && timeReg.test(time(res0, el));
    });
    // console.log(lis.length)
    for (let i = 0; i < lis.length; i++) {
      let el = lis[i];
      const url = nodeUrl.resolve(item.url, titleUrl(res0, el));
      const titleText = title(res0, el);
      const timeText = time(res0, el);
      const res1 = await request({ url, province: item.province + "_2级页面" });
      const gghText = ggh(titleText, res1);
      const as = res1?.$(`a:contains('${fileName}')`);
      for (let j = 0; j < as.length; j++) {
        el = as[j];
        const downloadUrl = nodeUrl.resolve(url, res1?.$(el).attr("href"));
        const extName = res1?.$(el).attr("href").match(/\.\w+/g)?.pop();
        const res2 = await request({
          url: encodeURI(downloadUrl),
          province: item.province + "_下载",
          encoding: null,
          jquery: false,
        });
        await writeFile(
          resolve(
            __dirname,
            `../sheets/${item.province}市场监督管理局_${timeText}_${gghText}_${i}${j}${extName}`
          ),
          res2.body
        );
      }
    }
    if (lis.length === 0) {
      console.log(chalk.bgYellow.blue(`*****${item.province}没爬到数据*****`));
    }
  }
  console.log(chalk.bgYellow.blue("网络错误的省份："));
  console.log(failProvinces);
}
