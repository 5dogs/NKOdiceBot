

function getTwitterService() {
  return OAuth1.createService('twitter')
    // OAuth1.0の認証で利用する値をセット
    .setAccessTokenUrl("https://api.twitter.com/oauth/access_token")
    .setRequestTokenUrl("https://api.twitter.com/oauth/request_token")
    .setAuthorizationUrl("https://api.twitter.com/oauth/authorize")
    .setConsumerKey("Q7v1nW7W7arRtdoEndAHtp37E")
    .setConsumerSecret("So4hvQ32DFjIJvmyo8OnRhM5dsMAITPq35vLxOvbX73D7DEJAU")
    // 認証後に実行するコールバック関数の指定
    .setCallbackFunction('authCallback')
    // 生成したトークンをGASのプロパティストアに保存（永続化）
    .setPropertyStore(PropertiesService.getUserProperties());
}



function generateToken_thenAuthorize() {
  const ui = SpreadsheetApp.getUi();
  const twitterService = getTwitterService();
  if (!twitterService.hasAccess()) {
    // トークンを生成し、認証ページのURLを返します。getした情報をもってauthorize
    const authorizationUrl = twitterService.authorize(); 
    // ⇩⇩イラン説
    const template = HtmlService.createTemplate('<a href="<?= authorizationUrl ?>" target="_blank">Authorize Link</a>');
    template.authorizationUrl = authorizationUrl;
    // ⇧しかもコレ逆説
    ui.showModalDialog(template.evaluate(), 'OAuth1.0認証用だにょ');
    // ⇧⇧イラン説
    Logger.log(authorizationUrl +'  <===OAuth1.0認証用だにょーん')
  } else {
    Logger.log("OAuth1.0認証はすでに許可されているにょ---")
    Logger.log("あとui.alert推してあげて---")
    ui.alert("OAuth1.0認証はすでに許可されているにょ多分");
  }
}

function authCallback(request) {
  if (getTwitterService().handleCallback(request)) {
    return HtmlService.createHtmlOutput('認証が許可されました。/ authorized!');
  } else {
    return HtmlService.createHtmlOutput('認証が拒否されました。/ desied( ﾉД`)ｼｸｼｸ…)');
  }
}

function clearService(){
  OAuth1.createService('twitter')
    .setPropertyStore(PropertiesService.getUserProperties())
    .reset();
}






// んこダイス
// @NKOdiceBot
// @tonarinokyaku8=>@NKOdiceBotに変えたときに再認証⇒APItoken取得し直した！
// Ishi1516
// PJ名：だびだびだばだば
// APIキー：
// Q7v1nW7W7arRtdoEndAHtp37E
// APISecretキー：
// So4hvQ32DFjIJvmyo8OnRhM5dsMAITPq35vLxOvbX73D7DEJAU
// 使用ライブラリ：TwitterClient (OAuth1を含んでるんだ実は）
//1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s
// https://github.com/googleworkspace/apps-script-oauth1
//
// https://developer.twitter.com/en/portal/projects/1583989269877563392/apps/25814492/settings
