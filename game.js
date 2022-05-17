var correctSum = 0
var wrongSum = 0

var initNumMin = 0
var initNumMax = 0

var totalQuestionCount = 0
var curQuestionCount = 0

var randomList = new Array()

var userAnsList = []

var correctAlert = document.getElementById("correctAlert")
var wrongAlert = document.getElementById("wrongAlert")

var enterBtn = document.getElementById("enterBtn")
var startBtn = document.getElementById("startBtn")
var reStartBtn = document.getElementById("reStartBtn")

var questionDisplay = document.getElementById("question")
var correctSumDisplay = document.getElementById('correctSum')
var wrongSumDisplay = document.getElementById('wrongSum')

var userAns = document.getElementById("userAns")

reStartBtn.style.display = "none"
correctAlert.style.display = "none"
wrongAlert.style.display = "none"

document.getElementById("userAns").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enterBtn.click();
    }
});

hiragana = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"]
hiragana_ans = {
    "あ": 'a', "い": 'i', "う": 'u', "え": 'e', "お": 'o',
    "か": 'ka', "き": 'ki', "く": 'ku', "け": 'ke', "こ": 'ko',
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n"
}

// listExampleTable(hiragana)

// function listExampleTable(hiragana) {

//     indexTr = document.getElementsByTagName("tr")[0]
//     wordTr = document.getElementsByTagName("tr")[1]

//     for (i = 0; i < hiragana.length; i++) {
//         var newIndexTd = document.createElement('td');
//         var newWordTd = document.createElement('td');
//         newWordTd.innerHTML = hiragana[i]
//         newIndexTd.innerHTML = i + 1
//         indexTr.appendChild(newIndexTd);
//         wordTr.appendChild(newWordTd)
//     }
// }

function start() {
    var range = document.getElementById('range_1').value.split(';')

    initNumMax = parseInt(range[1], 10) - 1
    initNumMin = parseInt(range[0], 10) - 1
    totalQuestionCount = initNumMax - initNumMin + 1
    randomList = getRandomList(initNumMin, initNumMax)
    generateQuestion(totalQuestionCount)
}

function generateQuestion(totalQuestionCount) {
    if (curQuestionCount >= totalQuestionCount) {
        end()
        return
    }
    question = hiragana[randomList[curQuestionCount]]
    questionDisplay.innerHTML = question;
    curQuestionCount++
}

function end() {
    questionDisplay.innerHTML = '結束測驗 !!';
    enterBtn.disabled = true
    startBtn.style.display = "none"
    reStartBtn.style.display = "inline-block"
    console.log(userAnsList)
}

function checkAns() {

    correctAns = hiragana_ans[question]
    var revisedUserAns = userAns.value.replace(/\s/g, '')
    revisedUserAns = revisedUserAns.toLowerCase()
    if (correctAns == revisedUserAns) {
        correctSum += 1
        correctAlert.style.display = "block"
        wrongAlert.style.display = "none"
    }
    else {
        wrongSum += 1
        correctAlert.style.display = "none"
        wrongAlert.style.display = "block"
    }
    userAnsList.push( {
        Question: question,
        UserAns: userAns.value,
        CorrectAns: correctAns
    })
    userAns.value = "";
    correctSumDisplay.innerHTML = correctSum
    wrongSumDisplay.innerHTML = wrongSum

    generateQuestion(totalQuestionCount)
}

function getRandomList(min, max) {
    let arr = []
    for (var i = min; i <= max; i++) {
        arr.push(i)
    }

    let result = [];
    i = arr.length
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        result.push(arr[j]);
        arr.splice(j, 1);
    }
    return result;
}

function reStart(){
    correctSum = 0
    wrongSum = 0

    initNumMin = 0
    initNumMax = 0

    totalQuestionCount = 0
    curQuestionCount = 0

    correctSumDisplay.innerHTML = correctSum
    wrongSumDisplay.innerHTML = wrongSum
    enterBtn.disabled = false
    start()
}