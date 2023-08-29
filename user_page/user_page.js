// tr만들기
function createRow(no, content, title, createdTime, creatorId) {
  const tr = document.createElement("tr");

  tr.dataset.no = no;
  tr.dataset.creatorId = creatorId;

  // 일자값 변경
  const date = new Date(createdTime);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  tr.innerHTML = /*html*/ `
  <td>${title}</td>
  <td>${content}</td>
  <td>${formattedDate}</td>  
  <td></td>  
  <td> <button class ="modify">수정</button></td>  
  <td> <button class ="delete">삭제</button></td>  
  `;
  return tr;
}
const tbody = document.querySelector("#myPosts_body");

// getCookie 함수---------------------------------------
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

(async () => {
  const name = document.querySelector("#name");
  const age = document.querySelector("#age");
  const height = document.querySelector("#height");
  const weight = document.querySelector("#weight");
  const program = document.querySelector("#program");

  const response = await fetch("http://localhost:8080/user/main", {
    headers: {
      //getCookie함수 호출
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const result = await response.json(); //

  name.textContent = result.name;
  age.textContent = result.age;
  height.textContent = result.height;
  weight.textContent = result.weight;
  program.textContent = result.programName;

  // 유저가 작성한 포스트 가져오기
  const getPost = await fetch("http://localhost:8080/posts/myPost", {
    headers: {
      //getCookie함수 호출
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  });
  const result2 = await getPost.json();

  for (let item of result2) {
    tbody.append(
      createRow(
        item.no,
        item.content,
        item.title,
        item.createdTime,
        item.creatorId
      )
    );
  }
})(); // 즉시실행

const modify_btn = document.querySelectorAll(".modify");
const delete_btn = document.querySelectorAll(".delete");

// 버튼이 동적으로 생성되기때문에 DOM이 다 Loaded되고
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#myPosts_body");

  tbody.addEventListener("click", async (e) => {
    const target = e.target;

    // 클릭된 요소가 "delete" 클래스를 가지고 있는지 확인
    if (target.classList.contains("delete")) {
      e.preventDefault();
      const tr = target.parentElement.parentElement;
      const no = tr.dataset.no;

      const response = await fetch(
        `http://localhost:8080/posts/deletePost?no=${no}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            "content-type": "application/json",
          },
        }
      );
      tr.remove();
    }
  });
});
