// リンク生成、「特定の日時を指定するタイマー」
function generateDeletionLink() {
    var month = $("#genMonth").val();
    var day = $("#genDay").val();
    var year = $("#genYear").val();
    var hour = $("#genHour").val();
    var minute = $("#genMinute").val();
    var type = $("input:radio[name=type]:checked").val();
    var timestamp = new Date(year, month - 1, day, hour, minute, 0, 0);
    var code = "";

    var url =
        "https://scp-jp.github.io/files/tool/deletion-timer/timer.html?timestamp=" +
        timestamp.getTime() + "&type=" + type;

    if ($("#notice").prop("checked")) {
        code += "この記事は評価が-3を下回った為、「低評価による削除」の対象となりました。<br />\n" +
            "この通知から**72時間後**までに、評価-2以上にならなければ削除となります。<br />\n" +
            "詳しくは[[[deletions-guide|こちら]]]を参照して、適切な対処を行ってください。<br />\n" +
            "<br />\n";
    }

    code += "[[iframe " + url + ' style="width: 400px; height: 50px;"]]';
    $("#code").html(code);
    $("iframe").prop("src", url);
    $("#generated").show();
}

// タイマーの日時を指定時間後にセットする
function setDeletionTimer() {
    var day = $("#aftDay").val();
    var hour = $("#aftHour").val();
    var minute = $("#aftMinute").val();
    var now = new Date();
    var timestamp = new Date(
        now.getTime() + (day * 24 * 60 * 60 * 1000) + (hour * 60 * 60 * 1000) +
            (minute * 60 * 1000),
    );

    $("#genYear").val(timestamp.getFullYear());
    $("#genMonth").val(timestamp.getMonth() + 1);
    $("#genDay").val(timestamp.getDate());
    $("#genHour").val(timestamp.getHours());
    $("#genMinute").val(timestamp.getMinutes());
    $("input:radio[name=type]:eq(0)").prop("checked", true);

    generateDeletionLink();
}

//削除通知一括設定
function batchDelete() {
    $("#aftDay").val(3);
    $("#aftHour").val(0);
    $("#aftMinute").val(0);
    $("#notice").prop("checked", true);

    setDeletionTimer();
}

// ページ表示時の初期処理
function initGenerators() {
    var now = new Date();
    generateYearOptions(now.getFullYear());
    generateMonthOptions();
    generateDayOptions(now.getFullYear(), now.getMonth() + 1);
    generateTimeOptions("#genHour", 24);
    generateTimeOptions("#genMinute", 60);
    generateTimeOptions("#aftDay", 31);
    generateTimeOptions("#aftHour", 24);
    generateTimeOptions("#aftMinute", 60);

    $("#genYear, #genMonth").change(function() {
        var year = $("#genYear").val();
        var month = $("#genMonth").val();
        generateDayOptions(year, month);
    });

    $("#batchDel").on("click", function () {
        batchDelete();
    });
}

// 年の選択肢を生成する関数
function generateYearOptions(currentYear) {
    var html = "";
    for (var i = currentYear - 1; i <= currentYear + 1; i++) {
        html += '<option value="' + i + '">' + i + '</option>';
    }
    $("#genYear").html(html).val(currentYear);
}

// 月の選択肢を生成する関数
function generateMonthOptions() {
    var html = "";
    for (var i = 1; i <= 12; i++) {
        html += '<option value="' + i + '">' + i + '</option>';
    }
    $("#genMonth").html(html);
}

// 日の選択肢を生成する関数
function generateDayOptions(year, month) {
    var dayCount = new Date(year, month, 0).getDate();
    var html = "";
    for (var i = 1; i <= dayCount; i++) {
        html += '<option value="' + i + '">' + i + '</option>';
    }
    $("#genDay").html(html);
}

// 時間の選択肢（時間、分、日）を生成する関数
function generateTimeOptions(selector, count) {
    var html = "";
    for (var i = 0; i < count; i++) {
        html += '<option value="' + i + '">' + i + '</option>';
    }
    $(selector).html(html);
}
