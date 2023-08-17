(async () => {
  const response = await fetch("http://localhost:8080/user/main", {
    headers: {
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const result = await response.json(); //
  console.log(result);

  username.textContent = result.name + "님";
})(); // 즉시실행

// 로그아웃-------------------------------------------------------------------------------------------------
const cookieName = "token";
const cookieDomain = "localhost";

// 쿠키 만료일을 현재 시간 이전으로 설정하여 쿠키 삭제
function expireCookie(cookieName, cookieDomain) {
  const pastDate = new Date(1970, 1, 1); // 과거 날짜로 설정
  const formattedDate = pastDate.toUTCString();

  // 만료일을 과거 날짜로 설정한 후, 쿠키를 설정
  document.cookie = `${cookieName}=; expires=${formattedDate}; path=/; domain=${cookieDomain}`;
}
// 로그아웃 버튼 클릭 시 쿠키 만료시키기
const logout = document.querySelector("#logout");
console.log(logout);
logout.addEventListener("click", function () {
  expireCookie(cookieName, cookieDomain);
  alert("로그아웃 완료");
  location.reload();
});
