
// 完結関数
// スプレのログを消す。月一で実行してる。
function deleteLog (){
  sheetMy.deleteRows(2,lastRow_sheetMy - 1)
}


function getMeInfo (){
  const res = getTwitterService().fetch(
    "https://api.twitter.com/2/users/me", {
      'method' : 'get',
    }
  )
  const q = JSON.parse(res)
  Logger.log(q)
  return q
  // idとったらプロパティストアに保存してもいいね
}