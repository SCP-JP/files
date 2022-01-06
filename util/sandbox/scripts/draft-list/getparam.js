/*
下書き一覧でパラメータを解析するスクリプト
 */
//親ページのURLを解析する
var PageSetting = new Object();
PageSetting.getParent = true;
PageSetting.currentParam = decodeURIExtension(document.referrer);
if (!PageSetting.currentParam) {
    PageSetting.currentParam = "http://scp-jp-sandbox3.wikidot.com/draft-list";
}
PageSetting.myPage = (function () {
    var tmpURL = PageSetting.currentParam.split("http://").join("").split("/");
    return "http://" + tmpURL[0] + "/" + tmpURL[1];
})();
PageSetting.currentParam = PageSetting.currentParam.split(PageSetting.myPage).join("");
PageSetting.OrderParam = "";
if (PageSetting.currentParam.indexOf("/order/") >= 0) {
    PageSetting.OrderParam = PageSetting.currentParam.substring(PageSetting.currentParam.indexOf("/order/"), PageSetting.currentParam.length);
}
//親ページのURLを解析する
var PageSetting = new Object();
PageSetting.currentParam = decodeURIExtension(document.referrer);
if (!PageSetting.currentParam) {
    PageSetting.currentParam = "http://scp-jp-sandbox3.wikidot.com/draft-list";
    PageSetting.getParent = false;
}
PageSetting.myPage = (function () {
    var tmpURL = PageSetting.currentParam.split("http://").join("").split("/");
    return "http://" + tmpURL[0] + "/" + tmpURL[1];
})();
PageSetting.currentParam = PageSetting.currentParam.split(PageSetting.myPage).join("");
PageSetting.OrderParam = "";
if (PageSetting.currentParam.indexOf("/order/") >= 0) {
    PageSetting.OrderParam = PageSetting.currentParam.substring(PageSetting.currentParam.indexOf("/order/"), PageSetting.currentParam.length);
}
PageSetting.TagsParam = "";
if (PageSetting.currentParam.indexOf("/tag/") >= 0) {
    var tmpCurrentParam = PageSetting.currentParam;
    if (PageSetting.OrderParam.length > 0) {
        tmpCurrentParam = tmpCurrentParam.split(PageSetting.OrderParam).join("");
    }
    PageSetting.TagsParam = tmpCurrentParam;
    if (PageSetting.TagsParam.charAt(PageSetting.TagsParam.length - 1) == "/") {
        PageSetting.TagsParam = PageSetting.TagsParam.substring(0, PageSetting.TagsParam.length - 1);
    }
}