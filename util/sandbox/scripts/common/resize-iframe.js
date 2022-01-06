var ctrlLineWidth = {
    value: "",
    actualValue: "",
    baseFontSize: 16,
    baseActualFontSize: 0,
    translateSize: 100,
    targetFontSize: 0,
    targetId: "",
    targetElement: undefined,
    ctrlFontSize: (function () {
    }),
    overValue: undefined,
    setup: undefined
}

//フォントサイズ調整実行
ctrlLineWidth.ctrlFontSize = function () {
    //デフォルト設定付与
    ctrlLineWidth.actualValue = ctrlLineWidth.value;
    ctrlLineWidth.targetElement.innerHTML = ctrlLineWidth.actualValue;
    ctrlLineWidth.targetElement.style.fontSize = ctrlLineWidth.baseActualFontSize + "px";
    var actualFont = ctrlLineWidth.baseActualFontSize;
    var stringWidth = strLength(ctrlLineWidth.actualValue) * actualFont;
    var pageWidth = window.innerWidth;
    //文章横幅がWindowを超過していた場合
    if (stringWidth > pageWidth) {
        //超過時に内容を変えるメソッドが用意されていた場合
        if (ctrlLineWidth.overValue) {
            ctrlLineWidth.actualValue = ctrlLineWidth.overValue();
            ctrlLineWidth.targetElement.innerHTML = ctrlLineWidth.actualValue;
            stringWidth = strLength(ctrlLineWidth.actualValue) * actualFont;
            if (ctrlLineWidth.overValue) {
                changeFontSize();
            }
            return;
        }
        changeFontSize();
    }

    //適切なフォントサイズを計算し、付与
    function changeFontSize() {
        var smartsize = Math.floor(pageWidth / strLength(ctrlLineWidth.actualValue));
        ctrlLineWidth.targetElement.style.fontSize = smartsize + "px";

    }

    //全角/半角を区別してカウントする
    function strLength(strSrc) {
        len = 0;
        strSrc = escape(strSrc);
        for (i = 0; i < strSrc.length; i++, len++) {
            if (strSrc.charAt(i) == "%") {
                if (strSrc.charAt(++i) == "u") {
                    i += 3;
                    len++;
                }
                i++;
            }
        }
        len = Math.ceil(len.toString() / 2);
        return len;
    }

}

//フォントサイズ調整及びイベント紐付け
ctrlLineWidth.setup = function () {
    if (ctrlLineWidth.targetId.lenth == 0) {
        return;
    }
    ctrlLineWidth.targetElement = document.getElementById(ctrlLineWidth.targetId);
    ctrlLineWidth.baseActualFontSize = Math.floor(ctrlLineWidth.baseFontSize * (ctrlLineWidth.translateSize / 100));
    ctrlLineWidth.ctrlFontSize();
    window.addEventListener('resize', function (event) {
        ctrlLineWidth.ctrlFontSize();
    });

};