const calorie = document.querySelector("#Calorie");
const macro_gram = document.querySelectorAll(".macro");
console.log(calorie);

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

(() => {
  const token = getCookie("token");
})();
// 매크로 계산식
(async () => {
  const response = await fetch("http://localhost:8080/user/main", {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  const user = await response.json(); //
  username.textContent = user.name + "님";
  console.log(user);
  let targetCal = "";
  let basicCal = "";
  // 일일 목표 칼로리
  if (user.sex == "남성") {
    let bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    basicCal = bmr * user.activity;
  } else if (user.sex == "여성") {
    let bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
    basicCal = bmr * user.activity;
  }
  // 일일 목표 칼로리
  if (user.userChoiceGoal == "근력증가") {
    targetCal = basicCal + user.goalCal;
  } else if (user.userChoiceGoal == "다이어트") {
    targetCal = basicCal - user.goalCal;
  }
  // 일일 권장 칼로리 삽입
  calorie.textContent = parseFloat(targetCal).toFixed(2) + "Kcal";

  // 탄수화물
  let carbohydrate = (targetCal * 0.5) / 4;
  console.log(carbohydrate);
  macro_gram[0].textContent = parseInt(carbohydrate) + "g";
  // 단백질
  let protein = (targetCal * 0.3) / 4;
  macro_gram[1].textContent = parseInt(protein) + "g";
  // 지방
  let fat = (targetCal * 0.2) / 8;
  macro_gram[2].textContent = parseInt(fat) + "g";
})(); // 즉시실행

// 스크롤 맨 아래 가야지만 프로그래스 바 실행
let animationTriggered = false;

// 스크롤 이벤트 리스너
window.addEventListener("scroll", function () {
  if (!animationTriggered && isScrolledToBottom()) {
    animateProgressBars();
    animationTriggered = true;
  }
});

// 페이지 맨 아래에 도달했는지 확인하는 함수
function isScrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// 애니메이션 실행 함수
function animateProgressBars() {
  const progressBarAni = document.querySelectorAll(".progressbar_ani");
  progressBarAni.forEach((item) => {
    item.style.animation = "progress 1s ease forwards";
  });
}
