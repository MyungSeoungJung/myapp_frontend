const complete = document.querySelector("#complete") // 회원가입 완료 버튼
const Goal = document.querySelectorAll(".Goal div");  //다이어트 목적
const sex = document.querySelectorAll(".sex div"); //성별
const userInfo = document.querySelectorAll(".name input");
const activity = document.querySelectorAll(".activity select")
const level = document.querySelectorAll(".level select")

// ------------------------------------------------회원 이름 키 나이 몸무게
const username = userInfo[0];
const password = userInfo[1];
const age = userInfo[2];
const phone = userInfo[3];
const height = userInfo[4];
const weight = userInfo[5];


// ------------------------------------------------회원 성별
let usersex = "";  //회원 성별 저장
let clickedgoal = null; // 현재 선택된 div
sex.forEach(item => {
item.addEventListener("click", (e) => {
if(e.target === sex[0]){
    usersex = "남성";
}else{
    usersex = "여성";
}

//    null 체크       && 사용자가 clicked한 성별이 item과 다르면 clicked클래스 지우기
 if (clickedgoal !== null && clickedgoal !== item) {
    clickedgoal.classList.remove('clicked');
 }
 item.classList.toggle('clicked'); //clicked있으면 지우고 없으면 추가
 //item 사용자가 선택한 성별 값 clicked에 할당
 clickedgoal = item; 
           
console.log(usersex);
}) //이벤트
}); //foreach문

let userActivity = "";
// 드롭 다운 선택 활동량 / 난이도 수준
activity.forEach(item => {
item.addEventListener("change",(e) => {
    e.preventDefault
  userActivity =  parseFloat(e.target.value);
  console.log(userActivity);
})
});

let userLevel = ""
level.forEach(item => {
    item.addEventListener("change",(e) => {
        e.preventDefault();
        userLevel = e.target.value;
        console.log(userLevel);
    })
    });


// ------------------------------------------------회원 운동목적
let usergoal = ""; //회원 목적 저장 변수 
let GoalCal = "";
clickedsex = null;
const dietDropBox = document.querySelector("#diet");
const bulkDropBox = document.querySelector("#bulk");
dietDropBox.style.display = "none"
bulkDropBox.style.display = "none"
 Goal.forEach(item => {
 item.addEventListener("click", (e) => {
e.preventDefault();
    if(e.target == Goal[0]){
        usergoal = "다이어트";
        dietDropBox.style.display = "block";
        dietDropBox.addEventListener("change",()=> {
            GoalCal = dietDropBox.value;
        })
        dietDropBox.addEventListener("mouseleave",()=>{
            dietDropBox.style.display = "none";
        })
     
    }else if (e.target == Goal[1]){
        usergoal = "근력운동";
        bulkDropBox.style.display = "block";
        bulkDropBox.addEventListener("change",()=> {
            GoalCal = bulkDropBox.value;
        })
        bulkDropBox.addEventListener("mouseleave",()=>{
            bulkDropBox.style.display = "none";
            GoalCal = bulkDropBox.value;
        })
     
    }
    if(clickedsex != null && clickedsex !== item){
    clickedsex.classList.remove('clicked');
    }
item.classList.toggle('clicked');
clickedsex = item;
console.log(usergoal); 
console.log(GoalCal);

}); //다이어트 item foreach문
}); // 다이어트 목적 클릭이벤트








// 회원 인적사항 제출
complete.addEventListener("click", async() =>{
const response = await fetch("http://localhost:8080/user/signup",
{
    method: "POST",
    headers : {
     "content-type": "application/json",
    },
    body: JSON.stringify({
        name : username.value,
        password : password.value,
        age : age.value,
        sex : usersex,
        phone : phone.value,
        height : height.value,
        weight : weight.value,
        activity : userActivity,
        goalCal :GoalCal,
        userChoiceGoal : usergoal,
        userChoiceLevel : userLevel,
    })
}
);
// if (response.status === 201) {
//     // 이동하고자 하는 페이지 URL로 변경해주세요.
//     window.location.href = "http://127.0.0.1:5500/SPRING/myCoach.html/signUpchoiceProgram/choiceProgram.html";
// } else {
//     // 실패한 경우 처리
//     alert("회원가입 실패");
// }
}); //회원가입 클릭 버튼시 제출

