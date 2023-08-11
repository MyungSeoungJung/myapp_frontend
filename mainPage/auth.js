function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(
            /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
            "\\$1"
          ) +
          "=([^;]*)"
      )
    );
    return matches
      ? decodeURIComponent(matches[1])
      : undefined;
  }
  
  // 인증토큰이 없으면 로그인페이지로 튕김
  (() => {
    const token = getCookie("token");
    console.log(token);
    if (!token) {
        alert("쿠키가 존재하지않습니다.")
      // 페이지를 이동시키는 window.location 객체의 속성
      window.location.href = "/index.html";
      // /폴더가 밖에 있어야되네
    }
  })();