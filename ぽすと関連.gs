
//tweetした五文字をスプレに記録する(その後のスコア計算のため)
function logWordTweetId_onSheetMy(joinedLetters,tweetId_str){
  const nowTime = new Date();
  sheetMy.appendRow(
    [joinedLetters,nowTime.toTimeString() +" / "+ nowTime.toDateString(),tweetId_str]
  )
}

// 完結関数
function postGeneratedFiveLetters(){
  const msg = generateFiveLetters()
  const res_parsed = JSON.parse(forPost(msg))
  const tweetId_str = res_parsed.data.id
  
  logWordTweetId_onSheetMy(msg,tweetId_str)

  // ⇩append使用NG!!!because最終行からget⇒最終行にsetしてるから
  sheetMy.getRange(lastRow_sheetMy +1,3).setValue(tweetId_str)
}
