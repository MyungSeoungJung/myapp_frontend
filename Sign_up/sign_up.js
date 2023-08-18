const complete = document.querySelector("#complete"); // 회원가입 완료 버튼
const Goal = document.querySelectorAll(".Goal div"); //다이어트 목적
const sex = document.querySelectorAll(".sex div"); //성별
const userInfo = document.querySelectorAll(".name input");
const activity = document.querySelectorAll(".activity select");
const level = document.querySelectorAll(".level select");
const recommend_program = document.querySelector("#recommend_program");
const recommend_program_container =
  document.querySelectorAll(".program_container");
const recommend_program_content = document.querySelector(
  "#recommend_program_content"
);
const program_wrapper = document.querySelector(".program_wrapper");
const recommend_program_btn = document.querySelector(
  "#recommend_program_button"
);

// 프로그램 element create
function creatProgram(
  id,
  img,
  programGoal,
  programIntro,
  programTitle,
  programLevel
) {
  const program_content = document.createElement("div");
  program_content.dataset.id = id;
  program_content.innerHTML = ` <div class="program_wrapper">
      <div class="program_container" data-program="${programGoal} data-level="${programLevel}"> 
       <div class="img"><img src="${img}"></div>
          <div class = "text">
            <div class="title">${programTitle}</div>
              <div class="content">${programIntro}</div>
               </div>
                 </div>
                   </div>
      `;
  return program_content;
}

// ------------------------------------------------회원 이름 키 나이 몸무게
const username = userInfo[0];
const password = userInfo[1];
const age = userInfo[2];
const phone = userInfo[3];
const height = userInfo[4];
const weight = userInfo[5];

// ------------------------------------------------회원 성별
let usersex = ""; //회원 성별 저장
let clickedgoal = null; // 현재 선택된 div
sex.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target === sex[0]) {
      usersex = "남성";
    } else {
      usersex = "여성";
    }

    //    null 체크       && 사용자가 clicked한 성별이 item과 다르면 clicked클래스 지우기
    if (clickedgoal !== null && clickedgoal !== item) {
      clickedgoal.classList.remove("clicked");
    }
    item.classList.toggle("clicked"); //clicked있으면 지우고 없으면 추가
    //item 사용자가 선택한 성별 값 clicked에 할당
    clickedgoal = item;

    console.log(usersex);
  }); //이벤트
}); //foreach문

let userActivity = "";
// 드롭 다운 선택 활동량 / 난이도 수준
activity.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    userActivity = parseFloat(e.target.value);
    console.log(userActivity);
  });
});

let userLevel = "";
level.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    userLevel = e.target.value;
    console.log(userLevel);
  });
});

// ------------------------------------------------회원 운동목적
let usergoal = ""; //회원 목적 저장 변수
let GoalCal = "";
clickedsex = null;
const dietDropBox = document.querySelector("#diet");
const bulkDropBox = document.querySelector("#bulk");
dietDropBox.style.display = "none";
bulkDropBox.style.display = "none";
Goal.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == Goal[0]) {
      usergoal = "다이어트";
      dietDropBox.style.display = "block";
      dietDropBox.addEventListener("change", () => {
        GoalCal = dietDropBox.value;
      });
      dietDropBox.addEventListener("mouseleave", () => {
        dietDropBox.style.display = "none";
      });
    } else if (e.target == Goal[1]) {
      usergoal = "근력운동";
      bulkDropBox.style.display = "block";
      bulkDropBox.addEventListener("change", () => {
        GoalCal = bulkDropBox.value;
      });
      bulkDropBox.addEventListener("mouseleave", () => {
        bulkDropBox.style.display = "none";
        GoalCal = bulkDropBox.value;
      });
    }
    if (clickedsex != null && clickedsex !== item) {
      clickedsex.classList.remove("clicked");
    }
    item.classList.toggle("clicked");
    clickedsex = item;
    console.log(usergoal);
    console.log(GoalCal);
  }); //다이어트 item foreach문
}); // 다이어트 목적 클릭이벤트

// 회원가입 제출 버튼 안 보이게 = 운동 추천 받기 버튼 클릭하면 보이게
complete.style.display = "none";
// -------------운동 추천 받기 클릭시 추천 프로그램 띄움-------------------
recommend_program.style.display = "none";
recommend_program_btn.addEventListener("click", async () => {
  recommend_program.style.display = "block";

  const response = await fetch(
    "http://localhost:8080/program/recommendProgram"
  );
  const result = await response.json();
  let count = 0;
  for (let item of result) {
    if (count >= 3) {
      break;
    }
    recommend_program_content.append(
      creatProgram(
        item.id,
        item.img,
        item.programGoal,
        item.programIntro,
        item.programTitle,
        item.programLevel
      )
    );
    count++;
  }
  complete.style.display = "block";
  recommend_program_btn = "hidden";
});

// 추천 운동프로그램 선택
let title = "";
recommend_program_content.addEventListener("click", (e) => {
  e.preventDefault();
  const programContainer = e.target.closest(".program_container");
  if (programContainer) {
    title = programContainer.querySelector(".title").textContent; //클릭시 클릭한 운동 프로그램 value 선택
    recommend_program_content.style.display = "none";

    const complete_alert = document.createElement("div"); // div만들어서 알림창 띄우기
    recommend_program.append(complete_alert);
    complete_alert.classList = "complete_alert";
    complete_alert.innerHTML = `
        <p>축하합니다! </p>
        <p>선택하신 운동 프로그램은 <strong>${title}</strong>입니다.</p>
        <p>사용자 정보 갱신을 위해 다시 로그인해주세요</p>
       <div> <button id ='complete_alert_button'> 로그인 페이지로 이동 </button> </div>`;
    const complete_alert_button = document.querySelector(
      "#complete_alert_button"
    );
    complete_alert_button.addEventListener("click", (e) => {
      //클릭하면 창 닫기
      e.preventDefault();
      recommend_program.style.display = "none";
    });
  } //if문
}); // 이벤트 리스너

// 회원 인적사항 제출
complete.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/user/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: username.value,
      password: password.value,
      age: age.value,
      sex: usersex,
      phone: phone.value,
      height: height.value,
      weight: weight.value,
      activity: userActivity,
      goalCal: GoalCal,
      userChoiceGoal: usergoal,
      userChoiceLevel: userLevel,
      programTitle: title,
    }),
  });
  if (response.status === 201) {
    window.location.href = "http://localhost:5500/index.html";
  } else {
    // 실패한 경우 처리
    alert("회원가입 실패");
  }
}); //회원가입 클릭 버튼시 제출
