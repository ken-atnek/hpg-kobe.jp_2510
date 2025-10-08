<?php
/*=======================================
* ページアクセスカウンター
* URL:public/backend/page_counter.php
* Referenced in: /CastReviewForm.tsx,
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
#$log_file = $log_dir . '/' . date('Y-m-d') . '_counter.log';
#ini_set('log_errors', 1);
#ini_set('error_log', $log_file);
#ログトップ
#error_log("page_counter.php called: sid={$get_sid}, p={$get_pid}");
#POSTチェック
$get_sid = !isset($_REQUEST['sid']) ? '' : $_REQUEST['sid'];
$get_pid = !isset($_REQUEST['p']) ? '' : $_REQUEST['p'];
#リクエストパラメータがない場合はエラーレスポンス
if (!$get_sid || !$get_pid) {
	http_response_code(400);
	echo 'Error: Missing required parameters (sid, p)';
	exit;
}
#カウントアップ実行
$result_count = count_up_page($get_sid, $get_pid);
#レスポンス返却
header('Content-Type: text/plain');
echo $result_count !== '*' ? $result_count : '0';
exit;
#ページカウントアップファンクション（php内部からのコールも可能）
function count_up_page($get_sid, $get_pid)
{
	#shop_id保険
	$sid_match = array();
	if (preg_match('/kt\-(.+)/', $get_sid, $sid_match)) {
		if (isset($sid_match[1])) {
			$get_sid = $sid_match[1];
		}
	}
	#パラメータがそろってなければリターン
	if (!$get_sid || !$get_pid) {
		return;
	}
	#データディレクトリへのパス作成
	#HTMLからの呼び出し時（このスクリプトからの相対パス）
	$page_data_dir = '../data/' . $get_sid . '/cp_log/cgi-bin';
	#ディレクトリが存在しない場合は作成
	if (!is_dir($page_data_dir)) {
		mkdir($page_data_dir, 0755, true);
	}
	#各ファイルまでのパス作成
	$file_name_count = $page_data_dir . '/page.log';
	$file_name_ip    = $page_data_dir . '/ip.log';
	#ファイルが存在しない場合は作成
	if (!file_exists($file_name_count)) {
		touch($file_name_count);
	}
	if (!file_exists($file_name_ip)) {
		touch($file_name_ip);
	}
	#デバッグ用ファイル存在確認
	#error_log("Checking files: count={$file_name_count}, ip={$file_name_ip}");
	#error_log("Count file exists: " . (file_exists($file_name_count) ? 'YES' : 'NO'));
	#error_log("IP file exists: " . (file_exists($file_name_ip) ? 'YES' : 'NO'));
	#デバッグ用ファイル存在確認
	#----------------------------------------
	#IPアドレスゲット
	$chk_ip = $_SERVER["REMOTE_ADDR"];
	$chk_ip_str = $chk_ip . '<>' . $get_pid . '<>';
	#IPファイルの最終日付チェック
	if (file_exists($file_name_ip) && filesize($file_name_ip) > 0) {
		$file_date_ip   = filemtime($file_name_ip);
		$file_date_str  = date("Ymd", $file_date_ip);
	} else {
		$file_date_str = '';
	}
	$today_date_str = date("Ymd", time());
	#日付が変わっていたらファイルの中身をクリア
	if ($file_date_str != $today_date_str) {
		$fp_ip = fopen($file_name_ip, "w");
		fclose($fp_ip);
	}
	#本日のIPリストと照会（なければカウントアップ＆ログ追加）
	#IPリスト読み込み
	$fp_ip = fopen($file_name_ip, 'a+');
	flock($fp_ip, LOCK_EX);
	#照会（flag:新規IPならtrue,履歴あればfalse）
	$data = array();
	$flag = true;
	for ($i = 0; $i < 5000; $i++) {
		if (feof($fp_ip)) {
			break;
		}
		$line = fgets($fp_ip);
		#IP比較
		if ($chk_ip_str === rtrim($line)) {
			$flag = false;
			break;
		} else {
			$data[] = $line;
		}
	}
	#新規IPなら
	if ($flag) {
		array_push($data, $chk_ip_str . "\r\n");
		ftruncate($fp_ip, 0);
		rewind($fp_ip);
		foreach ($data as $value) {
			fwrite($fp_ip, $value);
		}
	}
	#ファイル書き込み・クローズ
	fflush($fp_ip);
	flock($fp_ip, LOCK_UN);
	fclose($fp_ip);
	#----------------------------------------
	#カウンタファイルへ追加
	$last_count = '*';
	if ($flag) {
		$logmax = 65;
		#Load log
		if (file_exists($file_name_count) && filesize($file_name_count) > 0) {
			$log_lines = file($file_name_count);
			$last = array_pop($log_lines);
		} else {
			$log_lines = array();
			$last = '';
		}
		# 2018/10/08(Mon)<>top:500,girls:326,schedule:225,system:11<>
		#日付とカウンタセットを分離
		if (!empty($last) && strpos($last, '<>') !== false) {
			$parts = explode('<>', $last);
			if (count($parts) >= 2) {
				$l_date = $parts[0];
				$l_count_set = $parts[1];
			} else {
				$l_date = '';
				$l_count_set = '';
			}
		} else {
			$l_date = '';
			$l_count_set = '';
		}
		#最新ログとの日付チェック
		$chk_date = date("Y/m/d(D)", time());
		if ($l_date == $chk_date && !empty($l_count_set)) {
			#カウンタセットをページセットに分離
			$count_set = array();
			$count_set = explode(',', $l_count_set);
			#ページセットを配列へ格納
			$page_set = array();
			foreach ($count_set as $cset) {
				if (strpos($cset, ':') !== false) {
					$parts = explode(':', $cset);
					if (count($parts) >= 2) {
						$c_pid = $parts[0];
						$c_count = $parts[1];
						$page_set[$c_pid] = $c_count;
					}
				}
			}
			#対象IDのカウントアップ
			if (isset($page_set[$get_pid])) {
				$page_set[$get_pid]++;
			} else {
				$page_set[$get_pid] = 1;
			}
			$last_count = $page_set[$get_pid];
			#新規行作成
			$page_set_arr = array();
			foreach ($page_set as $pkey => $pval) {
				$page_set_arr[] = $pkey . ':' . $pval;
			}
			$new_count_set = implode(',', $page_set_arr);
			$new_last      = $l_date . '<>' . $new_count_set . '<>' . "\r\n";
			$log_lines[]   = $new_last;
		} else {
			$last_count = 1;
			#追加のページセット作成
			$new_count_set = $get_pid . ':1';
			$new_last      = $chk_date . '<>' . $new_count_set . '<>' . "\r\n";
			$log_lines[]   = $last;
			$log_lines[]   = $new_last;
			while (count($log_lines) > $logmax) {
				array_shift($log_lines);
			}
		}
		#カウンタログ保存
		$imp_log_lines = implode('', $log_lines);
		$write_lines   = fopen($file_name_count, "w");
		flock($write_lines, LOCK_EX);
		fwrite($write_lines, $imp_log_lines);
		fflush($write_lines);
		flock($write_lines, LOCK_UN);
		fclose($write_lines);
	}
	#カウンタファイルへ追加-if-end
	return $last_count;
}
#function-end;
