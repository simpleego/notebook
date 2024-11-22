$(document).ready(function () {
  setTotalPrice();

  // document.querySelectorAll('element').forEach(function(element) {
  //     element.addEventListener('click', function(e) {
  //         // Your code here
  //     });
  // });
  //  자바스크립트 버전

  $(this).on("click", function (e) {
    if (e.target.className === "up") {
      // 클릭한 요소의 최상의 객체를 구한다.
      parents = $(e.target.parentElement).parents();
      let amount = e.target.parentElement.querySelector(".amount").innerHTML;
      let price = removeComma(parents[0].querySelector(".price").innerHTML);
      if (++amount <= 10)
        e.target.parentElement.querySelector(".amount").innerHTML = amount;

      amount = e.target.parentElement.querySelector(".amount").innerHTML;
      parents[0].querySelector(".total_price").innerHTML = insertComma(
        Number(amount) * Number(price)
      );
    }

    if (e.target.className === "down") {
      // 클릭한 요소의 최상의 객체를 구한다.
      parents = $(e.target.parentElement).parents();
      let amount = e.target.parentElement.querySelector(".amount").innerHTML;
      let price = removeComma(parents[0].querySelector(".price").innerHTML);
      if (--amount > 0)
        e.target.parentElement.querySelector(".amount").innerHTML = amount;

      amount = e.target.parentElement.querySelector(".amount").innerHTML;
      parents[0].querySelector(".total_price").innerHTML = insertComma(
        Number(amount) * Number(price)
      );
    }

    if (e.target.className === "cancel") {
        console.log('-------------->')
        ul_ = $(e.target.parentElement).closest("li").css("display","none");
        console.log(ul_)
        //$("#div1").remove();
        $(ul_.parentElement).remove();

    //   parents = $(e.target.parentElement).parentsUntil("div");
    //   console.log(parents);
    }
  });

  function setTotalPrice() {
    const coffees = document.querySelectorAll(".coffee");
    coffees.forEach((element) => {
      element.querySelector(".total_price").innerHTML = insertComma(
        element.querySelector(".price").innerHTML
      );
    });
  }

//   document.querySelectorAll(".cancel").forEach((element)=>{
//     element.addEventListener("click", (e) => {
//         console.log('-------------->')
//         ul_ = $("button").closest("li").html();
//         console.log(ul_)
//     })
//   });

  /* 콤마 추가 */
  function insertComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }
  /* 콤마 제거 */
  function removeComma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }
});
