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
// 내가 작성한 게시판 가져오기
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
// 삭제 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#myPosts_body");

  tbody.addEventListener("click", async (e) => {
    e.preventDefault();

    const target = e.target;

    // 클릭된 요소가 "delete" 클래스를 가지고 있는지 확인
    if (target.classList.contains("delete")) {
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

// x박스 클릭시 모달창 닫기
const x_box = document.querySelector(".fa-solid");
const modal_box = document.querySelector("#modal_box_container");
const modal_wrtie_btn = document.querySelector("#modal_wrtie_btn");
x_box.addEventListener("click", () => {
  modal_box.style.display = "none";
});
modal_box.style.display = "none";

// 수정 버튼 클릭시 모달박스 띄우기
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#myPosts_body");
  tbody.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("modify")) {
      modal_box.style.display = "block";
    }
    const target = e.target;
    const tr = target.parentElement.parentElement;
    const no = tr.dataset.no; // 게시물 넘버
    const td = tr.querySelectorAll("td"); //게시물 td 접근
    const modal_title = document.querySelector("#modal_title");
    const modal_textarea = document.querySelector("#modal_textarea");

    modal_title.value = td[0].textContent;
    modal_textarea.value = td[1].textContent;

    // 작성버튼 클릭시 서버 보내기
    modal_wrtie_btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:8080/posts/modifyPost?no=${no}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title: modal_title.value,
            content: modal_textarea.value,
          }),
        }
      );
      td[0].textContent = modal_title.value;
      td[1].textContent = modal_textarea.value;
      modal_box.style.display = "none";
    });
  });
});
