// 로컬 스토리지에 저장된 ul 객체 가져오기
document.addEventListener("DOMContentLoaded", () => {
  const resultString = localStorage.getItem("result");
  if (resultString) {
    const result = JSON.parse(resultString);
    // 여기서 result를 활용하여 화면에 표시하거나 필요한 작업을 수행할 수 있습니다.
    console.log(result);
  }
});
