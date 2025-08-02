//Editted for SCP by Nanimono_Demonai
/*
Copyright (c) 2016 by Nanimono_Demonai (http://ja.scp-wiki.net/nanimono-demonai-s-personnel-file)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//orig http://codepen.io/atunnecliffe/pen/siqjd?editors=0010
/*
Copyright (c) 2016 by Andrew Tunnecliffe (http://codepen.io/atunnecliffe/pen/siqjd)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


$(function () {
	//ブート画像
	var logosrc = "./info.gif";

	//導火線
	var SparkPlug = new $.Deferred;
	//導火線につなぐよ
	SparkPlug.promise()
		.then(Boot(logosrc, 3000)) //引数は画像url,表示時間
		.then(BootLoader(10, 50, 220, 1000)) //点を打つ数, 一点あたりの時間,時間の揺れ,表示時間
		.then(mseg(50)) //表示時間
		.then(startDaemon(500, 100, 100, 1000)) //Welcime表示時間, デーモン起動時間,起動時間の揺れ,表示時間
		.then(startAA(50, 3000)) //一行あたりの秒数,表示時間
		.then(startLogin(500, 80, 40, 1000)); //反射神経時間, タイプ速度,タイプ速度の揺れ,表示時間

	$("#error").hide();
	//画面クリックで発火
	$('.power-button').click(function () {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			dead();
		}
		else {
			$(this).addClass('on');
			SparkPlug.resolve();
			return false;
		}
	});


	//ブルースクリーン受付
	function dead() {
		$("#load").hide();
		$("#container").css("background", "#0000AA");
		$("#error").css("display", "inline");
	};
});

//ブート
function Boot(logo, delay) {
	return function () {
		//遅延処理
		var d = new $.Deferred;

		//ブート画像
		var BiosLogo = new Image();
		BiosLogo.src = logo;

		$(BiosLogo).bind("load", function () {
			//画像読み込み完了時の処理
			//BIOSロゴを表示
			$("#logo").html($(BiosLogo));
			//BIOSオプション
			$("#term-fl").text("<F10>Setup <ESC> Menu").addClass("flick");
			$("#term-fr").text("<F11>System Recovery").addClass("flick");

			//処理完了はここ
			setTimeout(function () {
				d.resolve()
			}, delay);

		});

		//Deferredの戻り値はこれ。
		return d.promise();
	}
}

//ブートローダー
function BootLoader(count, time, rand, delay) {
	return function () {
		//遅延処理
		var d = new $.Deferred;
		//ターミナルを全画面表示
		$("#load").html("<div id=\"term\"></div>");

		var i = 0;

		//点々を打つよー
		function dotrun() {
			if (i < count) {
				i++
				$('#term').append(".")
				setTimeout(dotrun, Math.floor(Math.random() * rand) + time);
			} else {
				$('#term').append("<br>")
				//解決
				setTimeout(function () {
					d.resolve()
				}, delay);
			}
		};

		setTimeout(dotrun, Math.floor(Math.random() * rand) + time);

		//Deferredの戻り値はこれ。
		return d.promise();
	}
}

//msegフィードバッカー
function mseg(delay) {
	return function () {
		var d = new $.Deferred;
		//ターミナルをクリア
		$("#load").html("<div id=\"term\"></div>");

		var count = 0;
		var time = 0;
		var i = 0;
		//フィードバッカー
		(function feedbacker() {
			$('#term').append("[    " + count / 1000 + "] " + output[i] + "<br>");
			if (time % 2 == 0) {
				i++;
				$('#term').append("[    " + count / 1000 + "] " + output[i] + "<br>");
			}
			if (time == 3) {
				i++;
				$('#term').append("[    " + count / 1000 + "] " + output[i] + "<br>");
				i++;
				$('#term').append("[    " + count / 1000 + "] " + output[i] + "<br>");
				i++;
				$('#term').append("[    " + count / 1000 + "] " + output[i] + "<br>");
			}
			//スクロールを回す(get(0)を入れる意味はわからん）
			$('#container').scrollTop($('#container')[0].scrollHeight);
			i++;
			time = Math.floor(Math.random() * 4) + 1;
			count += time;
			setTimeout(
				function () {
					if (i < output.length - 2)
						feedbacker();
					else {
						$('#term').append("<br>Initialising...<br>");
						$('#container').scrollTop($('#container')[0].scrollHeight);
						//解決
						setTimeout(function () {
							d.resolve()
						}, delay);
					}
				}, time);
		})();
		//Deferredの戻り値はこれ。
		return d.promise();
	}
}

//デーモン起動
function startDaemon(welcomTime, time, rand, delay) {
	return function () {
		var d = new $.Deferred;

		var i = 1;
		//ターミナルをクリア
		$("#load").html("<div id=\"term\"></div>");
		//フォントサイズ変更
		$("#term").css("font-size", "1em").addClass("flick");
		//ウェルカム表示
		$('#term').append("<div style=\"text-align:center;\">" + daemonlist[0] + "</div><br>");


		//デーモン起動
		setTimeout(daemon, welcomTime);

		//青字のオッケー出力するやつ
		function writeOK() {
			$('#term').append("<div style=\"text-align:right;\">[ <span style=\"color:#0f0;\">OK</span> ]</div><br>");
			$("#term").css("font-size", "1em");
			setTimeout(daemon, Math.floor(Math.random() * rand) + time);
		}

		//デーモン起動
		function daemon() {

			if (typeof (daemonlist[i]) == "number") {
				//オッケー出力
				i++;
				setTimeout(writeOK, 500);
			} else {
				//テキスト出力
				$('#term').append(daemonlist[i] + "<br>");
				//スクロールを回す(get(0)を入れる意味はわからん）
				$('#container').scrollTop($('#container')[0].scrollHeight);
				i++;

				setTimeout(
					function () {
						if (i < daemonlist.length - 2)
							daemon();
						else {
							$('#term').append("<br>Loging Initialising...<br>");
							$('#container').scrollTop($('#container')[0].scrollHeight);

							//解決
							setTimeout(function () {
								d.resolve()
							}, delay);

						}
					}, Math.floor(Math.random() * rand) + time);
			}
		}

		//Deferredの戻り値はこれ。
		return d.promise();

	}
}

function startAA(time, delay) {
	return function () {
		var d = new $.Deferred;

		$("#load").html("<div id=\"term\"><div id=\"ascii\"></div></div>");
		$("#ascii").addClass("flick");
		var i = 0;
		(function aa() {
			$('#ascii').append(SCPaa[i] + "<br>");
			i++;
			setTimeout(
				function () {
					if (i < SCPaa.length - 2)
						aa();
					else {
						//解決
						setTimeout(function () {
							d.resolve()
						}, delay);
					}
				}, time);
		})();
		//Deferredの戻り値はこれ。
		return d.promise();

	}
}

function startLogin(react, typetime, typerand, delay) {
	return function () {
		$("#load").html("<div id=\"term\"><br>Please Login<br><br>User:    </div>");
		var phase = 0;
		var com = LoginCOM;
		var type = "";
		var comtext;
		var actionID = 0;
		var i = 0;
		var j = 0;
		var countTime = 0;

		setTimeout(Logining, Math.floor(Math.random() * react) + typetime + react * 2);

		function Logining() {
			if (i > com.length - 1) {
				switch (phase) {
					case 0:
						i = 0;
						com = wadjetCOM;
						type = "evrt_mann.scipnet: ~ evrt_mann $ "
						phase++;

						break;
					case 1:
						i = 0;
						com = rootCOM;
						type = "root.scipnet:/ # "
						phase++;

						break;
					case 2:
						$("#term").append("<br><span id=\"time\">0</span>s");
						setTimeout(timer, 1000);
						//解決
						setTimeout(function () {
							d.resolve()
						}, delay);
						return;
				}

			}

			if (typeof (com[i]) == "number") {
				actionID = com[i];
				i++;
				comtext = com[i];
				j = 0;
				switch (actionID) {
					case 0:
						break;
					case 1:
						$("#term").append("<br>" + type);
						break;
					case 2:
						$("#term").append("<br>" + comtext + "    ");
						i++;
						comtext = com[i];
						break;
				}
				setTimeout(typing, react);
				i++;
			} else {
				$("#term").append("<br>" + com[i]);
				i++;
				setTimeout(Logining, react);
			}
		}

		function typing() {
			$('#term').append(comtext[j]);
			j++;
			setTimeout(
				function () {
					if (j < comtext.length)
						typing();
					else {
						setTimeout(Logining, react);
					}
				}, Math.floor(Math.random() * typerand) + typetime);
		}


		function timer() {
			countTime++;
			$("#time").text(countTime);
			setTimeout(timer, 1000);
			if (countTime > 20 * 60) {
				$("#load").hide();
				$("#container").css("background", "#0000AA");
				$("#error").css("display", "inline");
			}
		}
	}
}
