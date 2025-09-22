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
require(__DIR__ . '/../../dbload_func8.php'); //ベースfunc(Load,Get系)
#-------------------------------------------#
#フォームデータを受け取る
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$shop = isset($_POST["shop"]) ? trim($_POST["shop"]) : "";
	$cast_id = isset($_POST["cast_id"]) ? trim($_POST["cast_id"]) : "";
	$nickname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
	$email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
	$rating = isset($_POST["rating"]) ? trim($_POST["rating"]) : "";
	$comment = isset($_POST["comment"]) ? trim($_POST["comment"]) : "";
	#===========================================#
	#店舗ID判定
	$shop_id = '';
	switch ($shop) {
		case 'hot': {
				$shop_id = 'kb-hot';
			}
			break;
		case 'villa': {
				$shop_id = 'kb-villa';
			}
			break;
		default: {
				$shop_id = 'none';
			}
	}
	if (!$shop_id == 'none') {
		#何もしない
		echo json_encode(["success" => false, "error03" => "DB登録に失敗しました"]);
		exit();
	}
	#ショップ基本情報読み込み (配列へ)
	$shop_master = array();
	$shop_master = load_shop_data($shop_id);
	#===========================================#
	$shopName = $shop_master['shop_name'];
	#DBへ登録
	#登録SQL文
	$sql_str = "INSERT INTO t_review_master (r_gid,r_shop ,r_nick_name,r_comment,r_mail,r_value,r_status,r_insert_day,r_update_day) values (?,?,?,?,?,?,?,?,?)";
	#DB接続
	$db = db_connect();
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
	$rst_insert = $dbStm->execute(array($cast_id, $shop_id, $nickname, $comment, $email, $rating, 0));
	if ($rst_insert) {
		# echo json_encode(["success" => true, "message" => "DB登録成功！"]);
	} else {
		echo json_encode(["success" => false, "error04" => "DB登録に失敗しました"]);
		exit;
	}
	#===========================================#
	#キャスト名を取得
	$cast_data = load_girl_data($cast_id);
	$cast_name = $cast_data['name'];
	#===========================================#
	# ** メールの設定 **
	$to = "ken.atnek@gmail.com";
	// $to = "<宛先メールアドレス>";
	$to_name = $shopName;
	$send_date = date("Y/n/j-H:i", time());
	$from_name = $shopName . " 女の子レビュー投稿フォーム";
	$from_email = "review@hpg-kobe.jp";  //
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
	$mail_body .= str_replace("\r\n", "\n", $mail_body);

	# ** 宛先 **
	$to_name = mb_encode_mimeheader($to_name, 'ISO-2022-JP');
	$send_target = $to_name . ' <' . $to . '>';
	# ** 送信 **
	$result = mb_send_mail($send_target, $subject, $mail_body, $header_from, "-f$from_email");
	# ** エンコーディングを元に戻す **
	mb_internal_encoding($orgEncoding);

	// **送信結果を適切に出力**
	if ($result) {
		echo json_encode(["success" => true, "message" => "メール送信成功！"]);
	} else {
		echo json_encode(["success" => false, "error01" => "メール送信に失敗しました"]);
	}
} else {
	echo json_encode(["success" => false, "error02" => "無効なリクエスト"]);
}
