(async () => {
  const response = await fetch("http://localhost:8080/user/displayUserName", {
    headers: {
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const result = await response.json(); //
  console.log(result);
  username.innerHTML = `<a href="/user_page/user_page.html">${result.name}님 <i class="fa-solid fa-user"></i></a>`;
})(); // 즉시실행
