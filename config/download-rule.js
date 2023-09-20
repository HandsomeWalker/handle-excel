/**
 * liEl: (res, el) => res.$("ul.zsj-fr-main>li") 一级页面 列表元素
 *
 * title: (res, el) => res.$(el).children("a").text() 一级页面 标题文字
 *
 * titleUrl: (res, el) => res.$(el).children("a").attr("href") 一级页面 标题url
 *
 * time: (res, el) => res.$(el).children("span").text() 一级页面 时间文字
 *
 * titleReg: /食品安全抽检/g 一级页面 标题过滤
 *
 * fileName: "监督抽检不合格产品信息" 二级页面 附件文字
 *
 * ggh: (title) => title.match(/（.+）/).[0].slice(1).replace(/.$/, "") 二级页面 公告号文字
 */
export default [
  {
    province: "河北省",
    url: "http://scjg.hebei.gov.cn/node/939",
    handle: {
      liEl: (res) => res.$(".zkmmr_tl1_item"),
      time: (res, el) => res.$(el).find(".zkmmr_tl1_item_date").text(),
      titleReg: /食品安全监督抽检/,
      fileName: "食品抽检不合格",
      ggh: (title, res) =>
        res
          .$(".image_text_message_span.le:contains('发文字号：')")
          .text()
          .replace(/发文字号：/, "")
          .replace(/[\s\f\n\r\t\v]+/g, ""),
    },
  },
  {
    province: "山西省",
    url: "https://scjgj.shanxi.gov.cn/trs-search/trssearch/openSearch/getZwgkList?keywords=食品安全监督抽检&pageNum=1&siteId=22&position=1&sort=time&suitability=1",
  },
  { province: "吉林省", url: "http://scjg.jl.gov.cn/jianguan/spcj/" },
  {
    province: "辽宁省",
    url: "http://scjg.ln.gov.cn/fw/wyk/tbtg/spcj/",
    handle: {
      liEl: (res) => res.$("ul.gov_gllist2>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
    },
  },
  {
    province: "黑龙江省",
    url: "http://amr.hlj.gov.cn/amr/c103775/public_list.shtml",
    handle: {
      liEl: (res, el) => res.$("ul#list>li"),
      titleReg: /食品不合格/,
      fileName: "不合格产品",
    },
  },
  {
    province: "陕西省",
    url: "http://snamr.shaanxi.gov.cn/ShiPinZhuanLan_list2.jsp?urltype=tree.TreeTempUrl&wbtreeid=1309",
  },
  {
    province: "甘肃省",
    url: "http://scjg.gansu.gov.cn/scjg/c110156/xxgk_list2.shtml",
    // handle: {
    //   liEl: (res) => res.$("#newsList"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   time: (res, el) => res.$(el).find(".zkmmr_tl1_item_date").text(),
    //   titleReg: /食品抽检情况的通告/,
    //   fileName: "抽检不合格",
    // },
  },
  {
    province: "青海省",
    url: "http://scjgj.qinghai.gov.cn/Article/ArticlePageSJJ?ParentSectionName=%E9%A3%9F%E5%93%81%E6%8A%BD%E6%A3%80%E4%BF%A1%E6%81%AF&section_id=666C81E4-9E71-4405-98D1-A89BE67C661C&page=1&pagesize=15",
    handle: {
      liEl: (res) => res.$("ul.now>li"),
      titleReg: /不符合食品安全标准的食品情况通告/,
      fileName: "不符合食品安全标准",
    },
  },
  {
    province: "山东省",
    url: "http://amr.shandong.gov.cn/col/col76551/index.html?number=SD089001",
    // handle: {
    //   liEl: (res) => res.$(".default_pgContainer li"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   time: (res, el) => res.$(el).children("a>.time").text(),
    //   titleReg: /食品不合格情况的通告/,
    // },
  },
  {
    province: "福建省",
    url: "http://scjgj.fujian.gov.cn/zw/zfjd/ccjc/",
    handle: {
      liEl: (res) => res.$(".gl ul>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
      time: (res, el) =>
        res
          .$(el)
          .children("span")
          .text()
          .replace(/[\s\f\n\r\t\v]+/g, ""),
      ggh: (title) => title.match(/\d\d\d\d年第\d+期/g)?.[0],
      titleReg: /食品安全监督抽检信息通告/,
      fileName: "抽检不合格产品信息表",
    },
  },
  {
    province: "浙江省",
    url: "http://zjamr.zj.gov.cn/col/col1229003248/index.html",
    // handle: {
    //   liEl: (res) => res.$("#NewsLists>table tr"),
    //   time: (res, el) => res.$(el).children("td:last").text(),
    //   titleReg: /食品安全监督抽检信息通告/,
    // },
  },
  {
    province: "河南省",
    url: "https://scjg.henan.gov.cn/zw/zfxxgk/xxgkml/zyhyhd/",
    handle: {
      liEl: (res) => res.$(".zfxxgk_zdgkc>ul>li"),
      time: (res, el) => res.$(el).children("b").text(),
      titleReg: /食品不合格情况的通告/,
    },
  },
  {
    province: "湖北省",
    url: "https://scjg.hubei.gov.cn/bmdt/jggz/cjgg/",
    // handle: {
    //   liEl: (res) => res.$("#share>li"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   time: (res, el) =>
    //     res.$(el).children(".calendar").children(":last-child").text() +
    //     "-" +
    //     res.$(el).children(".calendar>em").text(),
    //   titleReg: /食品安全监督抽检信息公告/,
    // },
  },
  {
    province: "湖南省",
    url: "http://amr.hunan.gov.cn/amr/ztx/ssjygkx/spcj/index.html",
    handle: {
      liEl: (res) => res.$(".listPage-r-li>ul>li"),
      time: (res, el) => res.$(el).children("small").text(),
      ggh: (title) => title.match(/\d\d\d\d年第\d+期/g)?.[0],
      titleReg: /食品安全抽样检验情况的通告/,
      fileName: "抽样检验不合格",
    },
  },
  {
    province: "江西省",
    url: "http://amr.jiangxi.gov.cn/col/col22521/index.html",
    // handle: {
    //   liEl: (res) => res.$(".common-list-items ul li"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   titleReg: /食品不合格情况通告/,
    // },
  },
  {
    province: "江苏省",
    url: "http://scjgj.jiangsu.gov.cn/col/col78970/index.html",
    // handle: {
    //   liEl: (res) => res.$(".fdzdgknr-lb"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   titleReg: /抽检不合格情况/,
    //   fileName: "不合格产品",
    // },
  },
  {
    province: "安徽省",
    url: "https://amr.ah.gov.cn/public/column/5248926?type=4&action=list&nav=&sub=&catId=29785052",
    handle: {
      liEl: (res) => res.$(".clearfix.xxgk_nav_list>li"),
      fileName: "产品不合格",
    },
  },
  {
    province: "广东省",
    url: "http://amr.gd.gov.cn/zwgk/zdlyxxgk/cjjc/spcj/index.html",
    handle: {
      liEl: (res) => res.$("ul.news_list2>li"),
      titleReg: /食品不合格情况的通告/,
      fileName: ".zip",
    },
  },
  {
    province: "海南省",
    url: "https://amr.hainan.gov.cn/zw/spcjxx/",
    handle: {
      liEl: (res) => res.$(".gly-r-nr2 ul>li"),
      time: (res, el) => res.$(el).children("em").text(),
      ggh: (title) => title.match(/\d\d\d\d年第\d+期/g)?.[0],
      titleReg: /不合格食品情况的通告/,
    },
  },
  {
    province: "四川省",
    url: "http://scjgj.sc.gov.cn/scjgj/c104536/ccxx.shtml",
    handle: {
      liEl: (res) => res.$(".list_container>ul>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
      time: (res, el) => res.$(el).find("span").text(),
      titleReg: /抽检不合格情况的通告/,
      fileName: "-不合格-",
    },
  },
  {
    province: "贵州省",
    url: "http://amr.guizhou.gov.cn/zwgk/xxgkml/zdlyxx/sjspcjtg/",
    handle: {
      liEl: (res) => res.$(".bd ul>li"),
      titleReg: /抽检不合格情况的通告/,
    },
  },
  {
    province: "云南省",
    url: "http://amr.yn.gov.cn/gsgg1/gg.htm",
    // handle: {
    //   liEl: (res) => res.$("ul.news-list>li"),
    //   title: (res, el) => res.$(el).children("a").attr("title"),
    //   titleReg: /食品安全监督抽检信息通告/,
    // },
  },
  {
    province: "北京市",
    url: "http://scjgj.beijing.gov.cn/zwxx/gs/spzlgs/",
    handle: {
      liEl: (res) => res.$(".public_list_team ul>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
      time: (res, el) =>
        res
          .$(el)
          .children("span")
          .text()
          .replace(/[\s\f\n\r\t\v]+/g, ""),
      titleReg: /食品安全监督抽检信息的公告/,
    },
  },
  {
    province: "上海市",
    url: "http://scjgj.sh.gov.cn/922/index.html",
    handle: {
      liEl: (res) => res.$(".table_list tr[class*='table_list_tr']"),
      time: (res, el) => res.$(el).children("td").eq(3).text(),
      ggh: (title) => title.match(/\d\d\d\d年第\d+期/g)?.[0],
      fileName: "（不合格）",
    },
  },
  {
    province: "天津市",
    url: "http://scjg.tj.gov.cn/tjsscjdglwyh_52651/zwgk/zfxxgk1/fdzdgknr/index_15958.html?keyword=%E9%A3%9F%E5%93%81&pos=0",
  },
  {
    province: "重庆市",
    url: "https://scjgj.cq.gov.cn/zfxxgk_225/fdzdgknr/jdcj/spaq_1/jcjgxx/",
    handle: {
      liEl: (res, el) => res.$("ul.zsj-fr-main>li"),
    },
  },
  {
    province: "新疆维吾尔自治区",
    url: "http://scjgj.xinjiang.gov.cn/xjaic/qtsj/common_list1578453299909.shtml",
    handle: {
      liEl: (res) => res.$("#list-data>ul.list>li"),
      titleReg: /食品安全监督抽检信息通告/,
    },
  },
  {
    province: "宁夏回族自治区",
    url: "http://scjg.nx.gov.cn/tslm/spjg/spaqcjxxgs/",
    handle: {
      liEl: (res) => res.$(".right_li_con>ul a"),
      title: (res, el) => res.$(el).find(".nr").text(),
      titleUrl: (res, el) => res.$(el).attr("href"),
      time: (res, el) =>
        res
          .$(el)
          .find(".sj")
          .text()
          .replace(/[\s\f\n\r\t\v]+/g, ""),
      ggh: (title, res) =>
        res
          .$(".content h3")
          .text()
          .match(/[（(]第.+期[)）]/)?.[0]
          .slice(1)
          .replace(/.$/, ""),
      titleReg: /食品安全监督抽检信息/,
      fileName: "抽检产品信息",
    },
  },
  {
    province: "内蒙古自治区",
    url: "http://amr.nmg.gov.cn/zw/tzgg/",
    handle: {
      liEl: (res) => res.$(".top_right_con>ul>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
      time: (res, el) =>
        res
          .$(el)
          .children("span")
          .text()
          .replace(/[\s\f\n\r\t\v]+/g, ""),
      ggh: (title, res) =>
        res.$(".view").children("p").eq(0).text().replace(/\s/g, ""),
      titleReg: /食品抽检情况/,
      fileName: "附件2",
    },
  },
  {
    province: "广西壮族自治区",
    url: "http://scjdglj.gxzf.gov.cn/zwgk/fdzdgk/zdxx/spaq/",
    handle: {
      liEl: (res) => res.$("#morelist ul.more-list>li"),
      title: (res, el) => res.$(el).children("a").attr("title"),
      ggh: (title) => title.match(/\d\d\d\d年第\d+期/g)?.[0],
      titleReg: /食品安全监督抽检信息通告/,
    },
  },
  {
    province: "深圳市",
    url: "http://amr.sz.gov.cn/xxgk/qt/ztlm/zdlygk/sygk/spzl_zd/index.html",
    // handle: {
    //   liEl: (res) => res.$(".server_box ul>li"),
    //   title: (res, el) => res.$(el).find("a>h3").text(),
    //   time: (res, el) => res.$(el).find("a>p").text().match(/\d\d\d\d-\d\d-\d\d/g)?.[0],
    //   ggh: (title) => title.match(/\d\d\d\d年第.+期/g)?.[0],
    //   titleReg: /食品安全抽样检验情况通告/,
    //   fileName: "抽检结果明细表",
    // },
  },
];
