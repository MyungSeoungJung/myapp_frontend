const write_btn = document.querySelector("#write_btn");
const modal_box = document.querySelector("#modal_box_container");
const modal_title = document.querySelector("#modal_title");
const modal_textarea = document.querySelector("#modal_textarea");
const x_box = document.querySelector(".fa-solid");
const modal_wrtie_btn = document.querySelector("#modal_wrtie_btn");
modal_box.style.display = "none";
const tbody = document.querySelector("tbody");
// x박스 클릭시 모달창 닫기
x_box.addEventListener("click", () => {
  modal_box.style.display = "none";
});

// 게시글 작성 클릭시 모달창 보이게
write_btn.addEventListener("click", async () => {
  modal_box.style.display = "block";
});
// tr만들기
function createRow(no, content, title, userName, createdTime, creatorId) {
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
  <td>${userName}</td>  
  <td>${formattedDate}</td>  
  `;
  return tr;
}

// 게시물 추가
modal_wrtie_btn.addEventListener("click", async () => {
  modal_box.style.display = "none";
  const response = await fetch("http://localhost:8080/posts/addPost", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: modal_title.value,
      content: modal_textarea.value,
    }),
  });
  result = await response.json();
  const { data } = result;

  // 일자값 변경
  const date = new Date(data.createdTime);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  tbody.append(
    createRow(
      data.no,
      data.content,
      data.title,
      data.userName,
      formattedDate,
      data.creatorId
    )
  );
});

// 게시물 가져오기
(async () => {
  const response = await fetch("http://localhost:8080/posts/getPost");

  result = await response.json();
  const ul = document.querySelector("ul");
  for (let item of result) {
    tbody.append(
      createRow(
        item.no,
        item.content,
        item.title,
        item.userName,
        item.createdTime,
        item.creatorId
      )
    );
  }
})();
