```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="http://code.jquery.com/jquery.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>

    <!-- <script src="https://unpkg.com/underscore@1.13.4/underscore-umd-min.js"></script> -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js">
    </script>
</head>
<style>
    .box {
        border: 1px solid black;
        width: 600px;
        height: 100px;
        margin: 3px;
    }

    #title {
        width: 80px;
        height: 10px;
        text-align: center;
        margin: 0;
        padding: 0;
        position: relative;
        bottom: 10px;
        left: 20px;
        background-color: white;
    }
</style>

<body>
    <div class="jumbotron" style="text-align: center">
        <h1>가전 제품</h1>
        <p>마루설아</p>
    </div>
    <div class="container">
        <div class="inputBox">
            <label>제품명</label> <input type="text" id="name" value="킥보드" /><br />
            <label>가격</label> <input type="text" id="price" value="130" /><br />
            <input type="button" id="saveBtn" value="Add" />
        </div>
        <div class="listBox">

        </div>
    </div>

    <script type="text/template" id="tableTemplate">
        <table class="table table-striped">
            <thead>
                <th>번호</th>
                <th>제품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>장바구니 담기</th>
            </thead>
            <tbody>
                <%
                    productList.forEach(function(item){
                %>                  
                <tr>
                    <td><%=item.no%></td>
                    <td><%=item.name%></td>
                    <td><%=item.price%></td>
                    <td>
                        <select name="ea" id="ea">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </td>
                    <td><a onclick='appendCart(this)' class="btn btn-primary" href="#">장바구니에 저장</a></td>
                </tr>
            <% }); %>
            </tbody>
        </table>

        <div class="box">
            <div id="title">
                장바구니
            </div>
            <div id="item">
                <span> <span>
            </div>
        </div>
        <div id="total">
            총합계 : <span> - </span>
        </div>
    </script>

    <script>

        var sum = 0;

        function appendCart(btn) {
            var $row = $(btn).parent().parent();
            var eaVal = $row.find("select[name=ea]").val();
            var noVal = $row.find("td:nth(0)").text();
            var nameVal = $row.find("td:nth(1)").text();
            var priceVal = parseInt($row.find("td:nth(2)").text());
            var cart = $('#item > span').append(nameVal + "(" + eaVal + "개)    ");

            sum += Number(eaVal) * Number(priceVal);
            console.log(sum);
            var total = $("#total > span").html(sum);


            var cartList = {};
            var cartSelect = {
                item: nameVal,
                price: sum
            };

            cartList.push(cartSelect);
            localStorage.setItem("cartList", JSON.stringify());
        }

        function getTopNo(lis) {
            var topNo = -1;

            lis.forEach(function (item) {
                if (item.no > topNo) {
                    topNo = item.no;
                }
            });

            return topNo;
        }

        if (!localStorage.getItem("productList")) {
            var list = [
                { "no": 1, "name": "냉장고", "price": 300 },
                { "no": 2, "name": "세탁기", "price": 200 },
                { "no": 3, "name": "오디오", "price": 100 },
                { "no": 4, "name": "테레비", "price": 150 },
                { "no": 5, "name": "압력솥", "price": 50 },
                { "no": 6, "name": "에어콘", "price": 100 },
                { "no": 7, "name": "건조기", "price": 100 },
                { "no": 8, "name": "전자랜지", "price": 20 },
                { "no": 9, "name": "에어프라이기", "price": 30 }
            ];



            localStorage.setItem("productList", JSON.stringify(list));
            localStorage.setItem("topNo", "" + getTopNo(list));
        };

        $('#saveBtn').on('click', function (e) {
            var rowItem = {
                no: Number(localStorage.getItem("topNo")) + 1,
                name: $('#name').val(),
                price: $('#price').val()
            }

            var newList = JSON.parse(localStorage.getItem("productList"));
            newList.push(rowItem);
            console.log(newList);
            localStorage.setItem("topNo", "" + getTopNo(newList));
            localStorage.setItem("productList", JSON.stringify(newList));


            loadData();
        });

        function loadData() {
            var productList = JSON.parse(localStorage.getItem("productList"));
            var compiled = _.template($('#tableTemplate').html());
            var html = compiled({ productList: productList });
            $('div.listBox').html(html);
        }

        $(function () {
            loadData();
        });
    </script>
</body>

</html>
```
