var userTerminalData = (function () {
    var os, ua = navigator.userAgent;

    if (ua.match(/Win(dows )?NT 10\.0/)) {
        os = "Windows 10";                // Windows 10 の処理
    } else if (ua.match(/Win(dows )?NT 6\.3/)) {
        os = "Windows 8.1";                // Windows 8.1 の処理
    } else if (ua.match(/Win(dows )?NT 6\.2/)) {
        os = "Windows 8";                // Windows 8 の処理
    } else if (ua.match(/Win(dows )?NT 6\.1/)) {
        os = "Windows 7";                // Windows 7 の処理
    } else if (ua.match(/Win(dows )?NT 6\.0/)) {
        os = "Windows Vista";                // Windows Vista の処理
    } else if (ua.match(/Win(dows )?NT 5\.2/)) {
        os = "Windows Server 2003";            // Windows Server 2003 の処理
    } else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {
        os = "Windows XP";                // Windows XP の処理
    } else if (ua.match(/Win(dows)? (9x 4\.90|ME)/)) {
        os = "Windows ME";                // Windows ME の処理
    } else if (ua.match(/Win(dows )?(NT 5\.0|2000)/)) {
        os = "Windows 2000";                // Windows 2000 の処理
    } else if (ua.match(/Win(dows )?98/)) {
        os = "Windows 98";                // Windows 98 の処理
    } else if (ua.match(/Win(dows )?NT( 4\.0)?/)) {
        os = "Windows NT";                // Windows NT の処理
    } else if (ua.match(/Win(dows )?95/)) {
        os = "Windows 95";                // Windows 95 の処理
    } else if (ua.match(/Windows Phone/)) {
        os = "Windows Phone";                // Windows Phone (Windows 10 Mobile) の処理
    } else if (ua.match(/iPhone|iPad/)) {
        os = "iOS";                    // iOS (iPhone, iPod touch, iPad) の処理
    } else if (ua.match(/Mac|PPC/)) {
        os = "Mac OS";                    // Macintosh の処理
    } else if (ua.match(/Android ([\.\d]+)/)) {
        os = "Android " + RegExp.$1;            // Android の処理
    } else if (ua.match(/Linux/)) {
        os = "Linux";                    // Linux の処理
    } else if (ua.match(/^.*\s([A-Za-z]+BSD)/)) {
        os = RegExp.$1;                    // BSD 系の処理
    } else if (ua.match(/SunOS/)) {
        os = "Solaris";                    // Solaris の処理
    } else {
        os = "N/A";                    // 上記以外 OS の処理
    }
    var smartPhone = false;
    smartPhone = ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0);

    var browser = 'unknown';
    if (ua.indexOf('Edge') !== -1) {
        browser = 'edge';
    } else if (ua.indexOf('Chrome') !== -1) {
        browser = 'chrome';
    } else if (ua.indexOf('Safari') !== -1) {
        browser = 'safari';
    }
    if (ua.indexOf('Firefox') !== -1) {
        browser = 'firefox';
    }
    if (ua.indexOf('MSIE 8') !== -1) {
        browser = 'ie8';
    } else if (ua.indexOf('MSIE 9') !== -1) {
        browser = 'ie9';
    } else if (ua.indexOf('MSIE 10') !== -1) {
        browser = 'ie10';
    } else if (ua.indexOf('Trident') !== -1) {
        browser = 'ie11';
    }
    return {
        Os: os,
        SmartPhone: smartPhone,
        Browser: browser
    };
})();