<?php
/*=======================================
* 女の子レビュー投稿フォーム
* URL:public/backend/send_review.php
* Referenced in: /CastReviewForm.tsx,
 * Created: 2025-09-22
 * Last updated: 2025-09-22
* ======================================= */
header("Access-Control-Allow-Origin: *"); // CORS対策
header("Content-Type: application/json");

#===========================================#
# 基本設定
#-------------------------------------------#
# デバッグ用ログファイル設定
#本日日付取得
$today = date("Ymd");
#ベースログファイルディレクトリ
$baseDir = __DIR__ . '/debug_log/';
#$baseDir = '../../debug_log/';
#今日の日付のディレクトリパス
$todayDir = $baseDir . $today . '/';
#ディレクトリが存在しない場合は作成
if (!is_dir($todayDir)) {
	@mkdir($todayDir, 0755, true);
}
$logFile = $todayDir . 'send_review.log';
# ログ出力関数
function debug_log($message)
{
	global $logFile;
	$timestamp = date('Y-m-d H:i:s');
	file_put_contents($logFile, "[{$timestamp}] {$message}" . PHP_EOL, FILE_APPEND | LOCK_EX);
}

# 処理開始ログ
debug_log("=== レビュー投稿処理開始 ===");
#-------------------------------------------#
require(__DIR__ . '/../../dbload_func8.php'); //ベースfunc(Load,Get系)
#-------------------------------------------#
#フォームデータを受け取る
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$shop = isset($_POST["shop_dir"]) ? trim($_POST["shop_dir"]) : "";
	$cast_id = isset($_POST["cast_id"]) ? trim($_POST["cast_id"]) : "";
	$nickname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
	$email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
	$rating = isset($_POST["rating"]) ? trim($_POST["rating"]) : "";
	$comment = isset($_POST["comment"]) ? mb_eregi_replace("(\n){1,}$", "", $_POST["comment"]) : "";

	// ** ログ出力: 受信データ **
	debug_log("=== レビュー投稿フォーム受信データ ===");
	debug_log("shop_dir: " . $shop);
	debug_log("cast_id: " . $cast_id);
	debug_log("nickname: " . $nickname);
	debug_log("email: " . $email);
	debug_log("rating: " . $rating);
	debug_log("comment: " . $comment);

	#===========================================#
	#店舗ID判定
	$shop_id = '';
	switch ($shop) {
		case 'hot': {
				$shop_id = 'kb-hot';
				debug_log("店舗判定: hot -> kb-hot");
			}
			break;
		case 'villa': {
				$shop_id = 'kb-villa';
				debug_log("店舗判定: villa -> kb-villa");
			}
			break;
		default: {
				$shop_id = 'none';
				debug_log("店舗判定: 不明 -> none");
			}
	}

	// ** 修正: 条件判定を正しく変更 **
	if ($shop_id == 'none') {
		debug_log("エラー: 無効な店舗ID");
		echo json_encode(["success" => false, "error03" => "無効な店舗です"]);
		exit();
	}

	debug_log("店舗ID確定: " . $shop_id);
	#ショップ基本情報読み込み (配列へ)
	$shop_master = array();
	$shop_master = load_shop_data($shop_id);
	debug_log("ショップ情報読み込み完了");
	#===========================================#
	$shopName = $shop_master['shop_name'];
	debug_log("ショップ名: " . $shopName);

	#DBへ登録
	debug_log("DB登録開始");
	#登録SQL文
	$sql_str = "INSERT INTO t_review_master (r_gid,r_shop ,r_nick_name,r_comment,r_mail,r_value,r_status,r_insert_day,r_update_day) values (?,?,?,?,?,?,?,?,?)";
	#DB接続
	try {
		$db = db_connect();
		debug_log("DB接続成功");
	} catch (Exception $e) {
		debug_log("DB接続エラー: " . $e->getMessage());
		echo json_encode(["success" => false, "error04" => "データベース接続に失敗しました"]);
		exit();
	}

	#プリペアドステートメントへセット
	$dbStm = $db->prepare($sql_str);
	#変数バインド
	$dbStm->bindValue(':gid', $cast_id);
	$dbStm->bindValue(':shop', $shop_id);
	$dbStm->bindValue(':nick_name', $nickname);
	$dbStm->bindValue(':comment', $comment);
	$dbStm->bindValue(':mail', $email);
	$dbStm->bindValue(':value', $rating);
	$dbStm->bindValue(':status', 0);
	$dbStm->bindValue(':insert_day', time());
	$dbStm->bindValue(':update_day', '');

	#SQL実行
	debug_log("SQL実行開始");
	$rst_insert = $dbStm->execute(array($cast_id, $shop_id, $nickname, $comment, $email, $rating, 0, time(), ''));
	if ($rst_insert) {
		debug_log("DB登録成功");
	} else {
		debug_log("DB登録失敗");
		echo json_encode(["success" => false, "error04" => "DB登録に失敗しました"]);
		exit;
	}
	#===========================================#
	#キャスト名を取得
	debug_log("キャスト情報取得開始: cast_id = " . $cast_id);
	try {
		$cast_data = load_girl_data($cast_id);
		$cast_name = $cast_data['name'];
		debug_log("キャスト名取得成功: " . $cast_name);
	} catch (Exception $e) {
		debug_log("キャスト情報取得エラー: " . $e->getMessage());
		$cast_name = "キャスト情報取得エラー";
	}
	#===========================================#
	# ** メールの設定 **
	debug_log("メール送信準備開始");
	#$to = "ken.atnek@gmail.com";
	$to = "shigetaka@a-fact.co.jp"; //テスト用
	// $to = "<宛先メールアドレス>";
	$to_name = $shopName;
	$send_date = date("Y/n/j-H:i", time());
	$from_name = $shopName . " 女の子レビュー投稿フォーム";
	$from_email = "review@hpg-kobe.jp";  //

	debug_log("メール宛先: " . $to);
	debug_log("送信者名: " . $from_name);
	# ** エンコーディング設定 **
	$orgEncoding = mb_internal_encoding();
	mb_language("uni");
	mb_internal_encoding('UTF-8');

	# **ヘッダー作成**
	$header_from = 'From: "' . mb_encode_mimeheader($from_name, 'ISO-2022-JP') . '" <' . $from_email . '>' . "\r\n";
	$header_from .= 'Reply-To: ' . $email;

	# ** メール本文 **
	$subject = '【' . $shopName . '】女の子へのレビューが投稿されました';
	$mail_body  = "レビュー投稿フォームより\n";
	$mail_body .= "--------------------\n";
	$mail_body .= "■ニックネーム\n{$nickname} 様\n";
	$mail_body .= "--------------------\n";
	$mail_body .= "◎メールアドレス\n{$email}\n";
	$mail_body .= "--------------------\n";
	$mail_body .= "◎レビュー対象キャスト\n{$cast_name}\n\n";
	$mail_body .= "【レビュー内容】\n{$comment}\n\n";
	$mail_body .= "--------------------\n";
	$mail_body .= "管理画面より内容をご確認頂き、レビューの承認を行ってください。\n";
	$mail_body .= "[管理画面URL]\n";
	$mail_body .= "http://hpg-kobe.kir.jp/cp8/\n";
	$mail_body .= "--------------------\n";
	$mail_body .= $send_date . "\n";

	# ** 改行コードを統一 **
	$mail_body = str_replace("\r\n", "\n", $mail_body);

	# ** 宛先 **
	$to_name = mb_encode_mimeheader($to_name, 'ISO-2022-JP');
	$send_target = $to_name . ' <' . $to . '>';
	# ** 送信 **
	debug_log("メール送信実行");
	$result = mb_send_mail($send_target, $subject, $mail_body, $header_from, "-f$from_email");
	# ** エンコーディングを元に戻す **
	mb_internal_encoding($orgEncoding);

	// **送信結果を適切に出力**
	if ($result) {
		debug_log("メール送信成功");
		debug_log("処理完了 - 成功レスポンス出力");
		echo json_encode(["success" => true, "message" => "メール送信成功！"]);
	} else {
		debug_log("メール送信失敗");
		echo json_encode(["success" => false, "error01" => "メール送信に失敗しました"]);
	}
} else {
	debug_log("無効なリクエストメソッド: " . $_SERVER["REQUEST_METHOD"]);
	echo json_encode(["success" => false, "error02" => "無効なリクエスト"]);
}
