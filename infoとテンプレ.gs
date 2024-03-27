

// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch


// V2おすすめライブラリ
// https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/v2.md

//V2とV1.1の違い
// https://qiita.com/lily_itter/items/8756aeaa3403aed3f40e

// ライブラリ:TwitterWebService
// https://gist.github.com/M-Igashi/750ab08718687d11bff6322b8d6f5d90


// ライブラリ:TwitterClient
// https://github.com/belltreeSzk/TwitterClient/blob/master/Utility.gs


// GAS公式レファレンス
// https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app

// twittr公式レファレンス
// https://developer.twitter.com/ja/docs/authentication/api-reference
// 
// TwitterClientライブラリ認証など
// https://github.com/belltreeSzk/TwitterClient/blob/master/TwitterClient.gs

// auth1_github
// https://github.com/googleworkspace/apps-script-oauth1



// // twitterAPI基本info
// const consumerKey = 'コンシューマーキー'
// const consumerSecret = 'コンシューマーシークレット'
// const client = TwitterClient.getInstance(consumerKey, consumerSecret)

// // GASスプレ取得
// const spreadSheet1 = SpreadsheetApp.getActiveSpreadsheet();
// const sheet1 = spreadSheet1.getSheetByName("シートの名前");
// let lastRow = sheet1.getLastRow()

// // セルのKeyとValue
// let nameKey_range = sheet1.getRange(1,1);
// let nameValue = nameKey.getValue()
// sheet1.getRange(lastRow + 1,1).setValue(nameValue)




// getRangeは[1][1]がA1セル
// cellsは[0][0]がA1セル





// ??? == callbackURL
// 認証プロセス後にOAuthがリダイレクトできる宛先
// OAuthが指定されたURLを有効として認識するように、コールバックURLを識別することが重要



// tweet実行までの手順
// TwetterDeveloper公式サイトでプログラムを実行したいtwitterアカウントの”APIキーとAPISecretキー”をコピー
// ⇒consumerKeyとconsumerSecretにペースト
// generateToken_thenAuthorize()実行(Twitterで作ったアプリに登録するための callbackUrl を取得)
// generateToken_thenAuthorize()実行後、表示された”callbackUrl”をコピーして⇩⇩のURLからTwitterアプリにペースト
// （⇩URLの”Settings””の”User authentication settings”の”edit”の”CallbackUrl”にcallbackUrlをペースト）
// https://developer.twitter.com/en/portal/projects/1583989269877563392/apps/25814492/settings
// ""ページを閉じてください""後、”すでに認証されています”が出てくる（はず）
// ここまででうまくいかなかったら⇩の手順で設定が行われているか確認
// // こーるばっくURL設定⇒keyの再生成⇒Keyの再生成⇒reset()で認証解除⇒authorize()で再認証
// // ☆自分のアカウントでログインされているか確認
// postTweet ()実行！！


