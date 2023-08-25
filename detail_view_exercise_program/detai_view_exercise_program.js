document.addEventListener("DOMContentLoaded", async () => {
  const id = window.location.search;
  const response = await fetch(
    `http://localhost:8080/program/detailProgram${id}`
  );

  if (response) {
    const result = await response.json();
    // 여기서 result를 활용하여 화면에 표시하거나 필요한 작업을 수행할 수 있습니다.
    console.log(result);
    const img = document.querySelector("#img");
    const title = document.querySelector("#program_title");
    const intro = document.querySelector("#program_intro");
    const level = document.querySelector("#ProgramLevel");
    const goal = document.querySelector("#programGoal");
    const coach_name = document.querySelector("#coach_name");

    img.innerHTML = `<img width="auto" height="30" src="${result.programImg}">`;
    title.innerHTML = result.programTitle;
    intro.innerHTML = result.programIntro;
    level.innerHTML = result.programLevel;
    goal.innerHTML = result.programGoal;
    coach_name.innerHTML = result.coachName;
  }
});

function creatLi(userId, content, userName, userSex, userAge) {
  const li = document.createElement("li");
  li.dataset.no = userId;
  li.innerHTML = `
  <div class = "li_container">
  <div class ="li_top">
  <p class = "li_user_name">${userName}</p><p class = "li_user_sex">${userSex},&nbsp;${userAge}</p>
  </div>
  <div class = "li_content_wrapper">
  <p class = "li_content"> ${content}</p>
  </div>
  </div>
  `;
  return li;
}
const btn = document.querySelector("#submit");
const ul = document.querySelector("ul");

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
btn.addEventListener("click", async () => {
  const text_area = document.querySelector("#comment");
  const id = window.location.search;
  const response = await fetch(`http://localhost:8080/program/comments${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: text_area.value,
    }),
  });

  const result = await response.json();
  // const { data } = result;
  ul.prepend(
    creatLi(
      result.userId,
      result.content,
      result.userName,
      result.userSex,
      result.userAge
    )
  );
});

// 댓글 가져오기
(async () => {
  const id = window.location.search;
  const response = await fetch(`http://localhost:8080/program/getComment${id}`);

  const result = await response.json();

  // 댓글이 없는 경우 메시지 생성
  if (!result || result.length === 0) {
    const li_div = document.createElement("div");
    const comment_get = document.querySelector("#comment_get");
    li_div.innerHTML = `
      <p id = "comment_null">아직 작성된 댓글이 없습니다</p>
    `;
    comment_get.prepend(li_div);
  } else {
    // 댓글이 있는 경우 각 댓글 생성
    for (let item of result) {
      const li = creatLi(
        item.userId,
        item.content,
        item.userName,
        item.userSex,
        item.userAge
      );
      ul.prepend(li);
    }
  }
})();
