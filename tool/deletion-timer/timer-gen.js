//リンク生成、「特定の日時を指定するタイマー」
function generateDeletionLink() {
    var month = $("#genMonth").val();
    var day = $("#genDay").val();
    var year = $("#genYear").val();
    var hour = $("#genHour").val();
    var minute = $("#genMinute").val();
    var type = $("input:radio[name=type]:checked").val();
    var timestamp = new Date(year, month, day, hour, minute, 0, 0);
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

//タイマーの日時を指定時間後にセットする
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
    $("#genMonth").val(timestamp.getMonth());
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

//ページ表示時の初期処理
function initGenerators() {
    var now = new Date();
    var i;
    var html = "";

    for (i = 2014; i < 2024; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#genYear").html(html).val(now.getFullYear());
    html = "";

    for (i = 0; i < 12; i++) {
        html += '<option value="' + i + '">' + (i + 1) + "</option>";
    }
    $("#genMonth").html(html).val(now.getMonth());
    html = "";

    for (i = 1; i < 32; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#genDay").html(html).val(now.getDate());
    html = "";

    for (i = 0; i < 24; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#genHour").html(html).val(now.getHours());
    html = "";

    for (i = 0; i < 60; i++) {
        html += '<option value="' + i + '">' + (i < 10 ? "0" : "") + i +
            "</option>";
    }
    $("#genMinute").html(html).val(now.getMinutes());
    html = "";

    for (i = 0; i < 31; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftDay").html(html);
    html = "";

    for (i = 0; i < 24; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftHour").html(html);
    html = "";

    for (i = 0; i < 60; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftMinute").html(html);

    $("#batchDel").on("click", function () {
        batchDelete();
    });
}
