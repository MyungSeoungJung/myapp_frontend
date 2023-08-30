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
const img = document.querySelector("#img");
const title = document.querySelector("#program_title");
const intro = document.querySelector("#program_intro");
const level = document.querySelector("#ProgramLevel");
const goal = document.querySelector("#programGoal");
const coach_name = document.querySelector("#coach_name");

(async () => {
  const usertext = document.querySelector("#username");
  const username = await fetch("http://localhost:8080/user/main", {
    headers: {
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const user_result = await username.json(); //
  console.log(user_result);
  // usertext.textContent = user_result.name + "님";
  usertext.innerHTML = `<a href="/user_page/user_page.html">${user_result.name}님 <i class="fa-solid fa-user"></i></a>`;

  // 프로그램 get
  const response = await fetch("http://localhost:8080/program/myExercise", {
    headers: {
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const result = await response.json(); //
  console.log(result);
  img.innerHTML = `<img width="auto" height="30" src="${result.programImg}">`;
  title.textContent = result.programTitle;
  intro.textContent = result.programIntro;
  level.textContent = result.programLevel;
  goal.textContent = result.programGoal;
  coach_name.textContent = result.coachName;
})();
