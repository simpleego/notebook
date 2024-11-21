function loadMenu() {
  // 서버로 부터 상품 정보를
  // 가져와서 화면에 표시
}
function showMenu() {
  alert("모카커피 선택");
}

// 주문상품 리스트
orders = {
  아메리카노: { amount: 1, price: 0, total_price: 0 },
  라떼: { amount: 1, price: 0, total_price: 0 },
  모카: { amount: 1, price: 0, total_price: 0 },
};

// 주문상품 리스트 접근 방법 : orders['아메리카노']['amount']

coffee_index = { 아메리카노: 0, 라떼: 1, 모카: 2 };
coffee_id = { 아메리카노: "americano", 라떼: "latte", 모카: "moka" };

btnAmericanoClicked = false;
btnLatteClicked = false;
btnMokaClicked = false;

// 버튼 객체 생성
const btnAmericano = document.querySelector("#btnAmericano");
const btnLatte = document.querySelector("#btnLatte");
const btnMoka = document.querySelector("#btnMoka");

// 아메리카노 메뉴 처리
btnAmericano.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnAmericanoClicked) {
    btnAmericanoClicked = true;
    // orderAmericano(e, menu, price);
    orderCoffees(e, menu, price);
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

// 라떼 메뉴 처리
btnLatte.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnLatteClicked) {
    // orderLatte(e, menu, price);
    orderCoffees(e, menu, price);
    btnLatteClicked = true;
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

// 모카 메뉴 처리
btnMoka.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnMokaClicked) {
    // orderMoka(e, menu, price);
    orderCoffees(e, menu, price);
    btnMokaClicked = true;
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

function orderPreProcess(e) {
  menu = e.target.parentElement.querySelector(".name").innerHTML;
  price = e.target.parentElement.querySelector(".price").innerHTML;
  console.log("menu", menu);
  console.log("price", price);
  orderTitle = document.querySelector("#orderTitle");
  orderTitle.style.display = "block";

  cart = document.querySelector("#cart");
  cart.style.display = "block";

  price = price.replace(",", "");
}

// 커피 주문 통합 함수
function orderCoffees(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = commaFormat(price * amount);
  const cancel = "cancel_" + coffee_id[menu];
  const upButton = coffee_id[menu]+"up";
  const downButton = coffee_id[menu]+"down";

  // 장바구니 상품 태그
  item = `
    <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
        수량 : <button id="${upButton}">+</button>
        <span id="amount">${amount}</span>
        <button id="${downButton}">-</button>
        금액 : <input type="text" id="total_price" value=${total_price_} readonly>
    <button id="${cancel}">삭제</button>
`;

  const cartItem = document.querySelector("#cartItem");
  const orderItem = document.createElement("li");
  orderItem.innerHTML = item;
  document.getElementById("cartItem").appendChild(orderItem);

  const up_button = document.querySelector("#"+upButton);
  console.log("up_button", up_button);
  up_button.addEventListener("click", function (e) {
    // amount 값을 증가
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });

  const down_button = document.querySelector("#"+downButton);
  down_button.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });
  totalPayment();

  // 주문 삭제 버튼 기능
  const cancelOrderButton = document.querySelector("#" + cancel);
  cancelOrderButton.addEventListener("click", function (event) {
    // 아메리카로 주문 취소
    cancelOrder(event, menu);
  });
}

function orderAmericano(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = commaFormat(price * amount);
  const cancel = "cancel_" + coffee_id[menu];

  // 장바구니 상품 태그
  item = `
    <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
        수량 : <button id="up">+</button>
        <span id="amount">${amount}</span>
        <button id="down">-</button>
        금액 : <input type="text" id="total_price" value=${total_price_} readonly>
    <button id="${cancel}">삭제</button>
`;

  const cartItem = document.querySelector("#cartItem");
  const orderItem = document.createElement("li");
  orderItem.innerHTML = item;
  document.getElementById("cartItem").appendChild(orderItem);

  const up_button = document.querySelector("#up");
  console.log("up_button", up_button);
  up_button.addEventListener("click", function (e) {
    // amount 값을 증가
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });

  const down_button = document.querySelector("#down");
  down_button.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });
  totalPayment();

  // 주문 삭제 버튼 기능
  const cancelOrderButton = document.querySelector("#" + cancel);
  cancelOrderButton.addEventListener("click", function (event) {
    // 아메리카로 주문 취소
    cancelOrder(event, menu);
  });
}

function orderLatte(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = commaFormat(price * amount);
  const cancel = "cancel_" + coffee_id[menu];

  // 장바구니 상품 태그
  item = `
    <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
        수량 : <button id="latteUp">+</button>
        <span id="amount">${amount}</span>
        <button id="latteDown">-</button>
        금액 : <input type="text" id="total_price" value=${total_price_} readonly>
    <button id="${cancel}">삭제</button>
  `;

  const cartItem = document.querySelector("#cartItem");
  //const orderItem = document.createElement( 'li' )
  const item1 = document.createElement("li");
  item1.innerHTML = item;
  document.getElementById("cartItem").appendChild(item1);

  const up_button_latte = document.querySelector("#latteUp");
  up_button_latte.addEventListener("click", function (e) {
    // amount 값을 증가
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });

  const down_button_latte = document.querySelector("#latteDown");
  down_button_latte.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });
  totalPayment();

  // 주문 삭제 버튼 기능
  const cancelOrderButton = document.querySelector("#" + cancel);
  cancelOrderButton.addEventListener("click", function (event) {
    cancelOrder(event, menu);
  });
}

function orderMoka(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = commaFormat(price * amount);
  const cancel = "cancel_" + coffee_id[menu];

  // 장바구니 상품 태그
  item = `
    <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
        수량 : <button id="mokaUp">+</button>
        <span id="amount">${amount}</span>
        <button id="mokaDown">-</button>
        금액 : <input type="text" id="total_price" value=${total_price_} readonly>
    <button id="${cancel}">삭제</button>
  `;

  const cartItem = document.querySelector("#cartItem");
  //const orderItem = document.createElement( 'li' )
  const item1 = document.createElement("li");
  item1.innerHTML = item;
  document.getElementById("cartItem").appendChild(item1);

  const up_button_moka = document.querySelector("#mokaUp");
  up_button_moka.addEventListener("click", function (e) {
    // amount 값을 증가
    console.log("--->" + orders[menu]["amount"]);
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });

  const down_button_moka = document.querySelector("#mokaDown");
  down_button_moka.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value =
      commaFormat(total_price_);
    totalPayment();
  });

  totalPayment();

  // 주문 삭제 버튼 기능
  // - 삭제버튼이 생성돈 이후에 이벤트 등록이 가능하고
  //   각각의 버튼마다 고유한 이벤트를 등록해야 함으로 id를 기반으로
  //   이벤트를 등록처리한다.
  const cancelOrderButton = document.querySelector("#" + cancel);
  cancelOrderButton.addEventListener("click", function (event) {
    cancelOrder(event, menu);
  });
}

//  주문 취소 기능
//  1) 해당 주문항목을 목록에서 삭제하는 방법
//  2) 주문수량을 0으로 초기화 하는 방법
function cancelOrder(event, menu) {
  liElement = event.target.parentElement;
  liElement = document.querySelector("#menu").innerText;
  //liElement = liElement.substring(0,liElement.indexOf('('))

  if (confirm("주문 취소할까요?")) {
    event.target.parentElement.remove();
    // 주문버튼 기능 초기화
    switch (menu) {
      case "아메리카노":
        btnAmericanoClicked = false;
        break;
      case "라떼":
        btnLatteClicked = false;
        break;
      case "모카":
        btnMokaClicked = false;
        break;
    }
  }
}

let totalPrice = 0;
function totalPayment() {
  totalPrice = 0;
  const totalPayment = document.querySelectorAll("#total_price");
  totalPayment.forEach((element) => {
    totalPrice += Number(commaRemove(element.value));
  });
  console.log(totalPrice);
  document.querySelector("#totalPayment").innerHTML = commaFormat(totalPrice);
}

function commaFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function commaRemove(x) {
  return x.replace(/,/g, "");
}

const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelector("#btn_payment");

btnOpenModal.addEventListener("click", (event) => {
  modal.style.display = "flex";  

  total_payment = document.querySelector("#totalPayment").innerHTML;
  console.log('total_payment:'+total_payment)

  pay = `<p>결재금액 : <span id="total_pay">${total_payment}</span>원</p>`

  const modal_body = document.querySelector(".modal_body")
  const payment = document.createElement( "div" )
  payment.innerHTML = pay
  modal_body.appendChild(payment);
});
