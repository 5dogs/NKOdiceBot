
const sheetCli = sprSh.getSheetByName("しとcli");
const sheetComm = sprSh.getSheetByName("しとコメ");
let lastRow_sheetCli = sheetCli.getLastRow()

// APIリクエストを送信
function forReply(msg, tweetId) {
  const res = getTwitterService().fetch(
    "https://api.twitter.com/2/tweets", {
    'method': 'post',
    'contentType': 'application/json',
    // 'muteHttpExceptions' : true ,
    'payload': JSON.stringify({
      "text": msg,
      "reply": { "in_reply_to_tweet_id": tweetId }
    })
  }
  );
  Logger.log(res)
  return res
}

// 完結関数
function postScore_to_me() {
  const wordForScoring = sheetMy.getRange(lastRow_sheetMy, 1).getValue()
  const [caliculatedScore, totalScore] = caliculateScore(wordForScoring)
  Logger.log(totalScore)

  const tweetId = sheetMy.getRange(lastRow_sheetMy, 3).getValue()
  const score = sheetMy.getRange(lastRow_sheetMy, 4).getValue()
  if (!(tweetId === "")) {
    if (score === "") {
      forReply(totalScore, tweetId)
    } else {
      Logger.log("C列とD列が両方埋まってる罪により死刑")
    }
  } else {
    Logger.log("C列とD列が両方埋まってない罪により死刑")
  }
  logScoreToMe_onSheet1(caliculatedScore)
}

function logScoreToMe_onSheet1(caliculatedScore) {
  const nowTime = new Date();
  sheetMy.getRange(lastRow_sheetMy, 4).setValue(caliculatedScore)
  sheetMy.getRange(lastRow_sheetMy, 5).setValue(nowTime)
}


const bearer_token = "AAAAAAAAAAAAAAAAAAAAABviggEAAAAA%2B3yXV1BWy3VanAQeu2UDjvWGnd8%3DYFZv0ZV2h1DSkSTxJMGRqEaErtlMyGGYV4P46UUzIXE4sKpUwk"
function getClientMention() {
  const latestMentionId = sheetCli.getRange(sheetCli.getLastRow(), 3).getValue()
  Logger.log(latestMentionId)
  const res = getTwitterService().fetch(
    "https://api.twitter.com/2/users/1558676073050566656/mentions" +
    "?tweet.fields=author_id,created_at" +
    // entities.mentions.username//referenced_tweets.i// "&"+
    "&since_id=" + latestMentionId +
    "&max_results=100", {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + bearer_token
    }
  }
  )
  Logger.log(res)
  logClientMention_onsheetCli(res)
}



function logClientMention_onsheetCli(res) {
  const parsedRes = JSON.parse(res)


  Logger.log(parsedRes)

  const reversedThreads_data = parsedRes.data.reverse()
  // Logger.log(parsedRes.data.id)⇦nullな理由：
  // dataは一個だけど、idは複数⇒forEachで取り出さねばならん

  Logger.log(reversedThreads_data)

  reversedThreads_data.forEach(function (data) {
    Logger.log(data.text)

    if (data.text === "@NKOdiceBot ダイスをふる" || data.text === "@NKOdiceBot roll a dice") {
      sheetCli.appendRow(
        [, data.text, data.id, data.author_id, data.created_at]
      )
      Logger.log("0廃止！")

    } else {
      sheetComm.appendRow(
        [, data.text, data.id, data.author_id, data.created_at, "応援あざす"]
      )
    }
  })

}


// 完結関数
function replyWord_to_client() {
  const latest_clientInfo = sheetCli.getLastRow()
  for (let i = 1; i < latest_clientInfo + 1; i++) {
    let repliedWord = sheetCli.getRange(i, 6).getValue()
    if (!(repliedWord === "")) {
      Logger.log("次(下のセル)をチェックする")
    } else {
      Logger.log("⇩こいつにリプする")

      const tweetId = sheetCli.getRange(i, 3).getValue()
      Logger.log(tweetId)
      const msg = generateFiveLetters()

      logReplyWordToClient_onsheetCli(msg, i, forReply(msg, tweetId))
    }
  }
}

function logReplyWordToClient_onsheetCli(msg, i, res) {
  const parsedRes = JSON.parse(res)
  Logger.log(parsedRes.data.id)
  sheetCli.getRange(i, 6).setValue(msg)
  sheetCli.getRange(i, 7).setValue(parsedRes.data.id)
}


function postScore_to_client() {
  const latest_clientInfo = sheetCli.getLastRow()
  for (let i = 1; i < latest_clientInfo + 1; i++) {
    let score = sheetCli.getRange(i, 8).getValue()
    if (!(score === "")) {
      Logger.log("次(下のセル)をチェックする")
    } else {
      Logger.log("⇩こいつにスコアをリプする")

      const tweetId = sheetCli.getRange(i, 7).getValue()
      const wordForScoring = sheetCli.getRange(i, 6).getValue()

      Logger.log(tweetId)

      const [caliculatedScore, totalScore] = caliculateScore(wordForScoring)
      const res = forReply(totalScore, tweetId)
      logScoreToCli_onSheet1(i, caliculatedScore, res)
    }
  }
}

function logScoreToCli_onSheet1(i, caliculatedScore, res) {

  const parsedRes = JSON.parse(res)
  const tweetId_score = parsedRes.data.id
  Logger.log(tweetId_score)

  sheetCli.getRange(i, 8).setValue(caliculatedScore)
  sheetCli.getRange(i, 9).setValue(tweetId_score)

}



function caliculateScore(wordForScoring) {
  let u = 0
  let m = 0
  let c = 0
  let each = [0, 0, 0, 0, 0, 0]
  let role = []

  const wordForScoring_array = Array.from(wordForScoring)
  for (let n = 0; n < wordForScoring_array.length; n++) {
    // ルールFACES
    if (wordForScoring[n] === 'う') {
      u = u + 500
      each[0] = each[0] + 1
    } else {
      if (wordForScoring[n] === 'ま') {
        m = m + 500
        each[1] = each[1] + 1
      } else {
        if (wordForScoring[n] === 'ち') {
          c = c + 500
          each[2] = each[2] + 1
        } else {
          if (wordForScoring[n] === 'ん') {
            u = u + 50
            m = m + 50
            c = c + 50
            each[3] = each[3] + 1
          } else {
            if (wordForScoring[n] === 'こ') {
              u = u + 100
              m = m + 100
              c = c + 100
              each[4] = each[4] + 1
            } else {
              if (wordForScoring[n] === 'お') {
                u = u + 300
                m = m + 300
                c = c + 300
                each[5] = each[5] + 1
              } else {
              }
            }
          }
        }
      }
    }
  }
  // ルールWORDS
  if (each[0] > 0 && each[2] > 0 && each[3] > 0) {
    role.push("うんち")
    u = u + 1000
  } if (each[0] > 0 && each[3] > 0 && each[4] > 0) {
    role.push("うんこ")
    u = u + 1000
  } if (each[1] > 0 && each[3] > 0 && each[4] > 0) {
    role.push("まんこ")
    m = m + 1000
  } if (each[1] > 0 && each[3] > 0 && each[4] > 0 && each[5] > 0) {
    role.push("おまんこ")
    m = m + 5000
  } if (each[2] > 0 && each[3] > 0 && each[4] > 0) {
    role.push("ちんこ")
    c = c + 1000
  } if (each[2] > 1 && each[3] > 1) {
    role.push("ちんちん")
    c = c + 3000
  } if (each[2] > 1 && each[3] > 1 && each[5] > 0) {
    role.push("おちんちん")
    c = c + 10000
  }
  // ルールTRIPILES
  if (each[0] > 2) {
    u = u * (each[0] - 1)
  } if (each[1] > 2) {
    m = m * (each[1] - 1)
  } if (each[2] > 2) {
    c = c * (each[2] - 1)
  } if (each[3] > 2) {
    u = u * -(each[3])
    m = m * -(each[3])
    c = c * -(each[3])
  } if (each[4] > 2) {
    u = u * (each[4] - 1.5)
    m = m * (each[4] - 1.5)
    c = c * (each[4] - 1.5)
  } if (each[5] > 2) {
    u = u * (each[5] - 1.5)
    m = m * (each[5] - 1.5)
    c = c * (each[5] - 1.5)
  }
  const syoubenTimes = 5 - (wordForScoring_array.length)
  u = u + syoubenTimes * (-500)
  m = m + syoubenTimes * (-500)
  c = c + syoubenTimes * (-500)
  const cS = u + m + c
  const tS = ("役：" + role.join(",") + "\nU : " + u + "\nM : " + m + "\nC : " + c + "\n\n合計スコア : " + cS)
  Logger.log(tS)
  return [cS, tS]
}

// ここ、とりまこの形(改善余地アリ)
async function getCM_replyWord_postScore() {
  try {
    await getClientMention()
    Utilities.sleep(3 * 1000)
    await replyWord_to_client()
    Utilities.sleep(3 * 1000)
    await postScore_to_client()
  } catch (error) {
    console.error('エラー発生:', error.message);
    console.error('詳細:', error);
  }
};


