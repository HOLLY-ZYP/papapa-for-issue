// const puppeteer = require('puppeteer');
// const iPhoneX = puppeteer.devices['iPhone X'];
// const queue = require('queue');
// // https://github.com/iamjoel/learn-by-test/blob/main/frontend/src/libs/puppeteer/index.e2e.spec.ts
// const quesList = require('./data');
// const CONCURRENCY = 5; // 并发数

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });

//   await exec(browser);

//   await browser.close();
// })();

// function exec(browser) {
//   const taskQueue = queue({
//     concurrency: CONCURRENCY,
//   });
//   // TODO: 并发多少个，就停了。。。
//   // quesList.slice(10).forEach(url => {
//   quesList.forEach((url) => {
//     taskQueue.push(() => {
//       screenshot(browser, url);
//     });
//   });

//   return new Promise((resolve) => {
//     taskQueue.on('end', () => {
//       resolve();
//     });

//     taskQueue.start();
//   });
// }

// async function screenshot(browser, url) {
//   const page = await browser.newPage();
//   await page.emulate(iPhoneX);
//   await page.goto(url);
//   const contentSelector = '.question-panel';
//   await page.waitFor(contentSelector);
//   const title = await page.$eval('h3', (elem) => elem.innerText);
//   const desElem = await page.$(contentSelector);
//   await page.evaluate(() => {
//     // 标题拿进来
//     const titleElem = document.querySelector('h3');
//     const contentElem = document.querySelector('.question-panel');
//     contentElem.insertBefore(titleElem, contentElem.firstChild);
//     // 删除不要的元素
//     const removeElem = document.querySelector('.action-btn-base');
//     removeElem.parentNode.removeChild(removeElem);
//     titleElem.removeChild(titleElem.querySelector('span'));
//   });

//   await desElem.screenshot({ path: `./output/${title}.png` });
//   await page.close();
// }

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({ path: 'example1.png' });

//   await browser.close();
// })();

//实现问题关闭时间爬取
//1.当前网页爬取  closed那行文字
//2.往后翻下一页
//3.爬取到的所有内容做时间转化
//4.计算平均值
//创建实例
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //打开issue被关闭页面
  await page.goto(
    'https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aclosed'
  );
  //筛选页面中的  <relative-time>  标签内容
  const elems = document.querySelectorAll('.opened-by a + relative-time');
  const times = [];
  for (let i = 0; i < elems.length; i++) {
    times.push(elems[i].innerHTML);
  }
  console.log(times);
  //翻页
  // await page.screenshot({ path: '1.png' });

  // await browser.close();
})();
