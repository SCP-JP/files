/*検索選択肢の生成用オブジェクト*/
// <表示>:<タグ>

var SearchTags = {
    Category: {
        "SCP-JP": "_scp-jp",
        "GoIF-JP": "_goi-format-jp",
        "Tale-JP": "_tale-jp",
        "翻訳 (英語)": "_en",
        "翻訳 (その他)": "_ru,_ko,_cn,_fr,_pl,_es,_th,_de,_it,_ua,_pt-br,_cz,_zh-tr,_vn,_otherlang",
        "その他": "_others",
        "未定義": "_null"
    },

    /*ジャンル設定*/
    Genre: {
        "A類": "_category-a",
        "B類": "_category-b",
        "ジョーク": "_joke",
        "アダルト": "_adult",
        "既存記事改稿": "_reforming-g",
        "イベント": "_event",
        "短編": "_short",
        "中編": "_medium",
        "長編": "_long",
        "事前知識不要": "_ignorant",
        "フォーマットスクリュー": "_formatscrew",
        "シリーズ-JP": "_series-jp",
        "シリーズ-Other": "_series-other",
        "世界観用語-JP": "_worldview-jp",
        "世界観用語-Other": "_worldview-other",
        "アクション": "_action",
        "SF": "_sf",
        "オカルト/都市伝説": "_occult",
        "感動系": "_excitement",
        "ギャグ/コミカル": "_comical",
        "シリアス": "_serious",
        "シュール": "_sur",
        "ダーク": "_dark",
        "人間ドラマ/恋愛": "_drama",
        "ホラー/サスペンス": "_horror",
        "メタフィクション": "_metafiction",
        "歴史": "_history"
    },

    /*ステータス設定*/
    State: {
        "作業中": "-_criticism-in,-_reforming,-_criticism-end",
        "批評中": "_criticism-in",
        "批評中断": "_reforming",
        "批評終了": "_criticism-end"
    }
}

/*ジャンル、カテゴリ選択用要素格納*/
var SettingAreaObj = {
    Category: [],
    Genre: [],
    State: []
}

/*ジャンルカテゴリ選択用クラス格納*/
var SelectedClassNames = {
    Category: {
        Base: "CategoryBase",
        Default: "CDefault",
        Selected: "CSelected"
    },
    Genre: {
        Base: "GenreBase",
        Default: "GDefault",
        Or: "GOrSelected",
        And: "GSelected"
    },
    State: {
        Base: "StateBase",
        Default: "SDefault",
        Selected: "SSelected"
    }
}

var searchForm;



document.addEventListener("DOMContentLoaded", function () {
    searchForm = document.getElementById("searchsetting");
    setSelecters("Category");
    setSelecters("Genre");
    setSelecters("State");
    SearchTags["MinusCategory"] = new Object();
    var tmpValue = "";
    var minusValue = "";
    for (var i in SearchTags.Category) {
        tmpValue = SearchTags.Category[i].split(",");
        minusValue = "";
        for (var j = 0; j < tmpValue.length; j++) {
            minusValue += (((j > 0) ? "," : "") + "-" + tmpValue[j]);
        }
        SearchTags.MinusCategory[i] = minusValue;
    }

    //URLの状態からカスタム検索の状態を復帰させる
    if (PageSetting.TagsParam.length > 0) {
        var tmpParam = PageSetting.TagsParam;
        //カテゴリ復帰
        var tmpMinus = new Object();
        var categoryFlag = false;
        var targetClass;
        for (var i in SearchTags.MinusCategory) {
            tmpMinus[i] = SearchTags.MinusCategory[i];
        }
        for (var i in tmpMinus) {
            if (tmpParam.indexOf(tmpMinus[i]) >= 0) {
                categoryFlag = true;
                tmpParam = tmpParam.split(tmpMinus[i]).join("");
                delete tmpMinus[i];
            }
        }
        if (categoryFlag) {
            targetClass = SelectedClassNames.Category;
            for (var i = 0; i < SettingAreaObj.Category.length; i++) {
                for (var j in tmpMinus) {
                    if (SettingAreaObj.Category[i].innerHTML == j) {
                        SettingAreaObj.Category[i].removeAttribute("class");
                        SettingAreaObj.Category[i].setAttribute("class", targetClass.Base + " " + targetClass.Selected);
                        delete tmpMinus[j];
                    }
                }
            }
        }
        tmpMinus = undefined;//dispose

        //ジャンル復帰
        var tmpGenre = new Object();
        for (var i in SearchTags.Genre) {
            tmpGenre[i] = SearchTags.Genre[i];
        }
        targetClass = SelectedClassNames.Genre;
        var tmpParamArray = tmpParam.split(",");
        tmpParamArray[0] = tmpParamArray[0].split("/tag/").join("");
        for (var i = 0; i < tmpParamArray.length; i++) {
            for (var j in tmpGenre) {
                if (tmpParamArray[i] == tmpGenre[j]) {
                    restoreGenre(j, targetClass.Or);
                    delete tmpGenre[j];
                } else if (tmpParamArray[i] == ("%2b" + tmpGenre[j])) {
                    restoreGenre(j, targetClass.And);
                    delete tmpGenre[j];
                }

            }
        }
        //ステータス復帰
        var tmpState = new Object();
        var StateLoop = 0;    //ゴリ押し
        for (var i in SearchTags.State) {
            tmpState[i] = SearchTags.State[i];
        }
        targetClass = SelectedClassNames.State;
        for (var i = 0; i < tmpParamArray.length; i++) {
            for (var j in tmpState) {
                console.log(tmpState.length);
                if (tmpParamArray[i] == tmpState[j].split(",")[0]) {
                    console.log("同一: " + tmpParamArray[i]);
                    console.log(tmpState);
                    SettingAreaObj.State[StateLoop].setAttribute("class", targetClass.Base + " " + targetClass.Selected);
                }
                StateLoop++;
            }
        }
        console.log(tmpParamArray);
        tmpGenre = undefined;//dispose
        tmpParamArray = undefined;//dispose
        tmpParam = undefined;//dispose
    }

    function setSelecters(typeName) {
        var newSelecter;
        //カテゴリ選択欄生成
        var targetBase = document.getElementById(typeName + "Area");
        var classN = SelectedClassNames[typeName];
        var targetSetting = SearchTags[typeName];
        for (var i in targetSetting) {
            if (targetSetting[i] == "_null") continue;
            newSelecter = document.createElement("span");
            newSelecter.setAttribute("class", classN.Base + " " + classN.Default);
            newSelecter.setAttribute("onclick", "changeState(this,'" + typeName + "');");
            newSelecter.innerHTML = i;
            targetBase.appendChild(newSelecter);
            SettingAreaObj[typeName].push(newSelecter);

        }

    }

    function restoreGenre(keyName, applyClass) {
        for (var i = 0; i < SettingAreaObj.Genre.length; i++) {
            if (SettingAreaObj.Genre[i].innerHTML == keyName) {
                SettingAreaObj.Genre[i].removeAttribute("class");
                SettingAreaObj.Genre[i].setAttribute("class", SelectedClassNames.Genre.Base + " " + applyClass);
                break;
            }
        }
    }

});


//カテゴリ及びジャンルを選択した時の表示切替
function changeState(elm, selectType) {
    //html要素のクラスを切り替える
    var oldClass = elm.getAttribute("class");
    elm.removeAttribute("class");
    var BaseClass = SelectedClassNames[selectType]["Base"] + " ";
    oldClass = oldClass.split(BaseClass).join("");
    switch (selectType) {
        case "Category":
            switch (oldClass) {
                case SelectedClassNames.Category.Default:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Category.Selected);

                    break;
                case BaseClass + SelectedClassNames.Category.Selected:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Category.Default);
                    break;
                default:
                    //万が一のバグ時救済
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Category.Default);
                    break;
            }
            break;
        case "Genre":
            switch (oldClass) {
                case SelectedClassNames.Genre.Default:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Genre.And);
                    break;
                case SelectedClassNames.Genre.And:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Genre.Or);
                    break;
                case SelectedClassNames.Genre.Or:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Genre.Default);
                    break;
                default:
                    //万が一のバグ時救済
                    elm.setAttribute("class", BaseClass + SelectedClassNames.Genre.Default);
                    break;
            }
            break;
        case "State":
            switch (oldClass) {
                case SelectedClassNames.State.Default:
                    for (var i in SettingAreaObj.State) {
                        SettingAreaObj.State[i].setAttribute("class", BaseClass + SelectedClassNames.State.Default);
                    }
                    elm.setAttribute("class", BaseClass + SelectedClassNames.State.Selected);

                    break;
                case BaseClass + SelectedClassNames.State.Selected:
                    elm.setAttribute("class", BaseClass + SelectedClassNames.State.Default);
                    break;
                default:
                    //万が一のバグ時救済
                    elm.setAttribute("class", BaseClass + SelectedClassNames.State.Default);
                    break;
            }
            break;
    }
}



function search() {
    var StateClass = "";
    var isSelectCategory = false;
    var BaseClass = "";
    var keyName = "";
    var tagParam = "";



    /*ジャンル検索設定*/
    BaseClass = SelectedClassNames.State.Base + " ";
    var andParam = "";
    for (var i = 0; i < SettingAreaObj.State.length; i++) {
        StateClass = (SettingAreaObj.State[i].getAttribute("class")).split(BaseClass).join("");
        keyName = SettingAreaObj.State[i].innerHTML;
        if (StateClass == SelectedClassNames.State.Selected) {
            andParam += SearchTags.State[keyName];
            break;
        }
    }
    console.log(andParam);
    BaseClass = SelectedClassNames.Genre.Base + " ";
    var orParam = "";
    var cunma = "";
    for (var i = 0; i < SettingAreaObj.Genre.length; i++) {  //ここでURLを生成している　OR/ANDの実装にはこの辺と後URL解析部分も必要
        StateClass = (SettingAreaObj.Genre[i].getAttribute("class")).split(BaseClass).join("");
        keyName = SettingAreaObj.Genre[i].innerHTML;
        switch (StateClass) {
            case SelectedClassNames.Genre.And:
                andParam += ("," + "%2b" + SearchTags.Genre[keyName]);

                break;
            case SelectedClassNames.Genre.Or:
                cunma = ((orParam.length > 0) ? "," : "");
                orParam += (cunma + SearchTags.Genre[keyName]);
                break;
        }
    }
    addTagParam(andParam);
    addTagParam(orParam);
    /*カテゴリ検索設定生成*/
    var CategoryClone = new Object();
    for (var i in SearchTags.Category) {
        CategoryClone[i] = SearchTags.Category[i];
    }

    BaseClass = SelectedClassNames.Category.Base + " ";

    for (var i = 0; i < SettingAreaObj.Category.length; i++) {
        StateClass = (SettingAreaObj.Category[i].getAttribute("class")).split(BaseClass).join("");
        if (StateClass == SelectedClassNames.Category.Selected) {
            keyName = SettingAreaObj.Category[i].innerHTML;
            isSelectCategory = true;
            delete CategoryClone[keyName];
        }
        keyName = "";
    }
    if (isSelectCategory) {
        var MinusValue = "";
        var MinusValueArray;
        for (var i in CategoryClone) {//categorycloneが大事そう　メモ
            addTagParam(SearchTags.MinusCategory[i]);
            //console.log(SearchTags.MinusCategory[i]);
            //console.log(i);
            MinusValue = "";
        }
    }

    if (tagParam.length > 0) {
        tagParam = "/tag/" + tagParam;
    }
    window.parent.location = PageSetting.myPage + tagParam + PageSetting.OrderParam;
    function addTagParam(addState) {
        if (addState.length <= 0) {
            return;
        }
        var cunma = ((tagParam.length > 0) ? "," : "");
        tagParam += (cunma + addState);
    }
}