//getパラメータを取得して返す
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
	return vars;
}

//時間差から残り時間を「X 日 XX 時 XX 分 XX 秒」のテキストにして返す
function formatTimeInterval(start, end) {
	var INTERVAL_SECOND = 1000;
	var INTERVAL_MINUTE = 60 * INTERVAL_SECOND;
	var INTERVAL_HOUR = INTERVAL_MINUTE * 60;
	var INTERVAL_DAY = INTERVAL_HOUR * 24;
	var interval = Math.abs(end - start);
	var text = '';

	if (interval > INTERVAL_DAY) {
		text += Math.floor(interval / INTERVAL_DAY);
		text += ' 日 ';
		interval %= INTERVAL_DAY;
	}
	if (interval > INTERVAL_HOUR) {
		text += Math.floor(interval / INTERVAL_HOUR);
		text += ' 時間 ';
		interval %= INTERVAL_HOUR;
	}
	if (interval > INTERVAL_MINUTE) {
		text += Math.floor(interval / INTERVAL_MINUTE);
		text += ' 分 ';
		interval %= INTERVAL_MINUTE;
	}

	text += Math.floor(interval / INTERVAL_SECOND);
	text += ' 秒';

	return text;
};

var timestamp;
var message1;
var message2;

//毎秒のタイマー更新処理
function tick() {
	var now = new Date();
	var html = '';
	var color = 'red';
	var message = message1;
	if (timestamp.getTime() <= now.getTime()) {
		color = 'green';
		message = message2;
	}
	$("#message").css("color",color).html(message + ':');
	$("#cdtimer").html(formatTimeInterval(now.getTime(), timestamp.getTime()));
}

//初期処理
function initTimer() {
	var vars = getUrlVars();
	var now = new Date();
	var i;
	var html = '';
	switch (vars["type"]) {
		case '1':
			message1 = 'BAN期間終了まで残り';
			message2 = 'BAN解除からの経過時間';
		break;
		case '0':
			message1 = 'このページの削除まで残り';
			message2 = '削除猶予終了からの経過時間';
		break;
		default:
			message1 = '残り時間';
			message2 = '経過時間';
	}
	if (vars["timestamp"]) {
		timestamp = new Date(parseInt(vars["timestamp"]));
		tick();
		setInterval(tick, 1000);
		return;
	}
}