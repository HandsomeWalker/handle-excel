import crawl from './download-excel.js';
import walkExcel from './walk-excel.js';

const { argv } = process;
const execType = argv[2];

const time = /2023-04/;

async function main() {
  if (execType === 'downloadExcel') {
    crawl(time);
  } else if (execType === 'walkExcel') {
    walkExcel();
  } else {
    await crawl(time);
    walkExcel();
  }
}

main();
