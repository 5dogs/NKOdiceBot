// const youbi_array ={
//   0: "日曜日",
//   1: "月曜日",
//   2: "火曜日",
//   3: "水曜日",
//   4: "木曜日",
//   5: "金曜日",
//   6: "土曜日"
// };


const sprSh = SpreadsheetApp.getActiveSpreadsheet();

const sheetMy = sprSh.getSheetByName("しとmy");
let lastRow_sheetMy = sheetMy.getLastRow()
// ⇧（letのグローバル宣言について）例:関数A,Bにわたる一連の実行の間に
// Aの時とBの時でlasiRow1の値が変化(再代入)するならばletを使う

const letters = ['う',  'ま',  'ち',  'ん',  'こ',  'お',  '',];
function generateFiveLetters(){
  let rolledWord_array = [];
  for (let i = 0; i<5 ; i++){
    nmbData = Math.floor(Math.random()*letters.length);
    rolledWord_array.push(letters[nmbData])
  }
  const jw = rolledWord_array.join("");
  return jw
}



//msg

function forPost(msg = "testMessage") {
  const res = getTwitterService().fetch(
    "https://api.twitter.com/2/tweets", {
      'method' : 'post',
      'contentType' : 'application/json',
      'payload' : JSON.stringify({
      "text": msg,
      })
    }
  )
  const parsedRes = JSON.parse(res)
  Logger.log(parsedRes.data)
  Logger.log(parsedRes.data.id)
  return res
}



