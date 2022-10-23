// //scp-jp.wdfiles.com/local--code/scpmetatitlesearch/4

//より柔軟な形でURLの文字コードを通常文字に戻す
function decodeURIExtension(target){
    /*この関数の
    参考:
    yukioc氏
    JavaScriptでURLをちょっと賢く解読する。 CodingFirst
    http://iyukki.blog56.fc2.com/blog-entry-120.html*/
        target=target.replace(/%(?:25)+([0-9A-F][0-9A-F])/g,function(whole,m1){
            return "%"+m1;
        });
        var utf8uri = new RegExp(
            "%[0-7][0-9A-F]|"+
            "%C[2-9A-F]%[89AB][0-9A-F]|%D[0-9A-F]%[89AB][0-9A-F]|"+
            "%E[0-F](?:%[89AB][0-9A-F]){2}|"+
            "%F[0-7](?:%[89AB][0-9A-F]){3}|"+
            "%F[89AB](?:%[89AB][0-9A-F]){4}|"+
            "%F[CD](?:%[89AB][0-9A-F]){5}","ig");
        target=target.replace(utf8uri,function(whole){
            return decodeURI(whole);
        });
        return target;
    }
     
    //正規表現における特殊文字にエスケープ文字をつけ無効化する
    function setEscapeCode(sentence){
        var escape = "\\";
        sentence=sentence.replace(/\.|\^|\?|\$|\[|\]|\*|\+|\\|\-|\:|\{|\}/g,  function(match) {
            return escape.charAt(0) + match;
        });
        return sentence;
    }
     
    //And検索にマッチする正規表現を作る
    function createRegexForAndSearch(ary){
        var andS = "^";
        for(var i = 0;i < ary.length;i++){
            andS += "(?=.*" + ary[i] + ")";
        }
        return new RegExp(andS);
    }
    
    
    /*EdgeもしくはIEかを取得*/
    function isMSBrowser(){
    var browser = getBrowser();
    return (browser != "safari" && browser != "chrome" && browser != "firefox")
    }
    
    
    
    /*ブラウザー取得*/
    function getBrowser() {
            var ua = navigator.userAgent;
            var result = 'unknown';
            if ( ua.indexOf('Edge') !== -1 ) {
            result = 'edge';
            } else if ( ua.indexOf('Chrome') !== -1 ) {
            result = 'chrome';
            } else if ( ua.indexOf('Safari') !== -1 ) {
            result = 'safari';
            }
            if ( ua.indexOf('Firefox') !== -1 ) {
            result = 'firefox';
            }
            if ( ua.indexOf('MSIE 8') !== -1 ) {
            result = 'ie8';
            } else if ( ua.indexOf('MSIE 9') !== -1 ) {
            result = 'ie9';
            } else if ( ua.indexOf('MSIE 10') !== -1 ) {
            result = 'ie10';
            } else if ( ua.indexOf('Trident') !== -1 ) {
            result = 'ie11';
            }
            return result;
        }