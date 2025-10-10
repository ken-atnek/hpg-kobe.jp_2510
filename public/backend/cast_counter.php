<?php
/*=======================================
* 女の子アクセスカウンター
* URL: public/backend/cast_counter.php
* Referenced in: /CastProfile.tsx
*  Created: 2025-10-08
*  Last updated: 2025-10-08
* ======================================= */
# CORS設定（開発環境用）
#header('Access-Control-Allow-Origin: http://localhost:3000');
#header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
#header('Access-Control-Allow-Headers: Content-Type');
# OPTIONSリクエストの場合は早期終了
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	exit(0);
}
#デバッグ用ログ(エラーログ設定)
#$log_dir = dirname(__FILE__) . '/log';
#$log_file = $log_dir . '/' . date('Y-m-d') . '_cast.log';
#ini_set('log_errors', 1);
#ini_set('error_log', $log_file);
#-------------------------------------------#
require(__DIR__ . '/../../dbload_func8.php'); //ベースfunc(Load,Get系)
#-------------------------------------------#
#POSTチェック
$cast_id = !isset($_REQUEST['cid']) ? '' : $_REQUEST['cid'];
#ログトップ
#error_log("cast_counter.php called: cid={$cast_id}");

#リクエストパラメータがない場合はエラーレスポンス
if (!$cast_id) {
	http_response_code(400);
	echo 'Error: Missing required parameter (cid)';
	exit;
}

#DBカウントアップ
$result_count = count_up_db($cast_id, 1);

#レスポンス返却
header('Content-Type: text/plain');
echo $result_count !== '*' ? $result_count : '0';
exit;
