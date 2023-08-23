## 챕터 5
액션에서 암묵적 출력을 줄여가는 법을 배운다. 액션에서 암묵적 출력은 완전히 없앨 수는 없다.

### 비즈니스 요구사항과 설계 맞추기

1. 인자값을 요구사항과 맞추기
   `gets_free_shipping` 메서드의 원래 목적은 장바구니에 담긴 제품을 확인하는 것.
   합계와 가격으로 계산하고 있기 때문에 변경해준다.
2. 중복 코드를 제거하기
   `calc_total` 과 `gets_free_shipping` 에서 `total += item.price` 라는 중복된 코드를 제거

```javascript
// 변경 전
function gets_free_shipping(total, item_price) {}
// 변경 후
function gets_free_shipping(cart) {}
```
원래 설계 의도대로 장바구니의 제품을 확인 하는 인자로 변경



### 비즈니스 요구사항과 함수를 맞추기
설계를 변경했기 때문에 그에 따라 함수도 바꿔준다.

```javascript
// 변경 전
function gets_free_shipping(total, item_price) {
    return item_price + total >= 20
}

if (gets_free_shipping(shopping_cart_total, item.price))

//변경 후
    var new_cart = add_item(shopping_cart, item.name, item.price)
if (gets_free_shipping(new_cart))


    // 중략

    function gets_free_shipping(cart) {
        return calc_total(cart) >= 20
    }
```


### 암묵적 입출력은 적을수록 좋다
왜 ?
- 결론은 테스트, 재사용 하기가 용이하기 때문이다.
- 암묵적 입출력은 외부와 연결되어 있기 때문에 따로 때어내서 사용하기가 어렵다. 컴포넌트 분리가 안돼있다.
- 반면에 명시적 입출력으로된 코드는 그에 해당하는 인자들만 넣어서 사용하면 되므로 재사용과 테스트가 용이하다.
- 그렇기 때문에 계산은 테스트 하기가 쉽다.
- 액션을 계산으로 변경하지는 못 해도 암축적입출력을 줄여나가는 것만으로도 테스와 재사용이 편해진다.


### 암묵적 입출력을 더 줄이자
```javascript
// 변경 전
function update_shipping_icons() {
    var buttons = getbuy_buttons_dom()
    for (var i = o; i < buttons.length; i++) {
        var button = buttons[i]
        var item = button.item;
        var new_cart = add_item(shopping_cart, item.name, item.price)
        if (gets_free_shipping(new_cart))
            button.show_free_shipping_icon()
        else button.hide_free_shipping_icon()
    }
}

function calc_cart_total() {
    shopping_cart_total = calc_total(shopping_cart)
    set_cart_total_dom()
    update_shipping_icons()
    update_tax_dom()
}

// 변경 후
function update_shipping_icons(cart) {
    var buttons = getbuy_buttons_dom()
    for (var i = o; i < buttons.length; i++) {
        var button = buttons[i]
        var item = button.item;
        var new_cart = add_item(cart, item.name, item.price)
        if (gets_free_shipping(new_cart))
            button.show_free_shipping_icon()
        else button.hide_free_shipping_icon()
    }
}

function calc_cart_total() {
    shopping_cart_total = calc_total(shopping_cart)
    set_cart_total_dom()
    update_shipping_icons(shopping_cart)
    update_tax_dom()
}
```

#### 연습문제
암묵적 인자(전역 변수)를 명시적 인자(매개변수)로 최대한 바꾸기

`set_cart_total_dom` 와 `shopping_cart_total`가 제거된다.
```javascript
var shopping_cart = []
function add_item_to_cart(name, price) {
    shopping_cart = add_item(shopping_cart, name, price)
    calc_cart_total(shopping_cart)
    var total = calc_total(shopping_cart)
    set_cart_total_dom(shopping_cart)
    update_shipping_icons(shopping_cart)
    update_tax_dom(total)
}

function calc_cart_total(cart) {}

function update_shipping_icons(cart) {
    var buttons = getbuy_buttons_dom()
    for (var i = o; i < buttons.length; i++) {
        var button = buttons[i]
        var item = button.item;
        var new_cart = add_item(cart, item.name, item.price)
        if (gets_free_shipping(new_cart))
            button.show_free_shipping_icon()
        else button.hide_free_shipping_icon()
    }
}
function set_cart_total_dom(total) {}

function update_tax_dom(total) {set_tax_dom(calc_tax(total))}

function add_item(cart, name, price) {
    var new_cart = cart.slice();
    new_cart.push({
        name:name,
        price:price
    })
    return new_cart
}

function calc_total(cart) {
    var total = 0
    for (var i =0; i < cart.length; i++){
        var item = cart[i]
        total += item.price
    }
    return total
}
function gets_free_shipping(cart) {
    return calc_total(cart) >= 20
}

function calc_tax(amount) {
    return amount * 0.10
}
```

### 설계는 엉켜있는 코드를 푸는 것이다
- 함수를 사용하면 관심사 분리 가능
- 크고 복잡한 것보다 작게 분리된게 쉽게 조합해서 사용할 수 있다.

#### 엉킨코드를 푸는 것의 이점
- 재사용하기 쉽다
    - 함수가 작을수록 재사용하기 쉽다
- 유지보수하기 편하다
    - 코드가 작기 때문에 올바른지 판단하기 쉽다
- 테스트하기 쉽다
    - 한가지 일만 하기 때문에 테스트하기 쉽다

### 계산을 좀 더 세밀하게 분류
`add_item`은 제품을 추가하는 함수 같지만, 하는 일을 네부분 분류 가능
```javascript
function add_item(cart, name, price) {
    var new_cart = cart.slice(); // 배열 복사
    new_cart.push( // 복사본 객체에 item 추가
        { // item 객체 생성
            name:name,
            price:price
        }
    )
    return new_cart // 복사본 리턴
}
```
`add_item` 함수는 item을 생성하고 cart에 추가하는 함수지만,
item 객체 생성하는 코드를 분리할 수 있다. 생성자 함수로 분리한다.

```javascript
function make_cart_item(name, price) {
    return {
        name: name,
        price: price
    };
}

function add_item(cart , item) {
    var new_cart = cart.slice(); // 배열 복사
    new_cart.push(item)
    return new_cart // 복사본 리턴
}
```

### 카피온라이트 패턴을 빼내기
`add_item`의 역할은 여전히 배열을 복사하고 객체를 생성해서 push 하고 있다.
일반적인 이름으로 바꿔서 재사용하는 코드를 만든다.

```javascript
function add_item(cart, item) {
    return add_element_last(cart, item)
}
// 카피 온 라이트
function add_element_last(array, elem) {
    var new_array = array.slice()
    new_array.push(elem)
    return new_array
}
```

이렇게 하면 유틸 메서드를 만들 수 있다.

코드를 더 잘게 나눠서 테스트와 유지보수하기 쉬운 코드로 만들 수 있다.


### 정리
- 암묵적 입출력은 인자와 리턴 값으로 바꾼다.
- 설계는 엉켜있는 것을 푸는것. 잘게 쪼개는 것으로 다시 합쳐 사용하기 쉽다.
- 함수가 각각 하나의 일을 하도록 하면 쉽게 재구성 가능
