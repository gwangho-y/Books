## 챕터 1
함수형 프로그래밍이란?

- 부수효과 즉, 사이드 이팩트를 피하는 것이
- 부수효과 없이 순수함수만을 사용하는 프로그래밍

하지만 완전한 부수효과는 피할 수 없음.

**그럼 부수효과를 최대한 피할려면?**

- 액션 : 실행시점이나 횟수에 영향을 받는다
- 계산 : 입력 값을 계산해 출력 하는 것.
- 데이터 : 이벤트에 대한 사실.

세 가지를 사용해서 코드를 분리한다.

## 챕터 2

  타임라인, 플로우 차트로 이벤트의 흐름을 세분화 하면 액션, 계산, 데이터를 더 잘 나눌 수 있다. 프로그래밍의 전체적인 흐름을 구상한 후에 나누는 것이 좋은 코드로 나눌 수 있겠다는 생각이 듦.

  책에서 나온 예제 피자 만들기의 흐름을 나누는데, 시간 순서에 따라 나눔으로써 기본적으로 액션은 분리 할 수 있다.
  
## 챕터 3
액션 : 부수효과, 부수효과가 있는 함수, 순수하지 않은 함수

계산 : 순수함수, 수학함수

데이터 : 이벤트에 대한 사실

2장에서 본 것과 같이 기능의 흐름을 미리 작성해 놓으면 액션, 계산, 데이터를 쉽게 나눌 수 있다.

ex) 장보기 과정 예제

- 냉장고를 확인 한다 - 액션
- 현재 재고를 확인한다 - 액션
- 현재재고, 사야할재고 -  데이터
- 재고 빼고 더하기 - 계산

**이렇게 코드를 짬으로써 얻을 수 있는 이점?**

- 테스트를 하기가 용이해진다
- 코드의 분리가 쉬워진다.
- 유지보수가 편리해진다.

- 데이터
    - 이벤트에 대한 사실
    - 숫자, 문자, 배열로 구현
    - 복사를 함으로써 불변성을 유지할 수 있다.
    - 직렬화 - 저장 및 전송이 쉽다
    - 동일성 비교 - 데이터끼리 비교가 가능하다?
    - 해석 - 데이터는 그 자체로 의미가 있다. 모니터링이나 유저의 선호도처럼 해석가능
    - 쓸모 없는 데이터로 남지 않도록 주의
- 계산
    - 입력 값으로 출력을 만든다.
    - 함수로 구현
    - 테스트하기 쉽다
    - 분석이 쉽다?
    - 조합해서 더 큰 계산을 만들 수 있다.
    - 액션 처럼 시간 이나 실행 순서를 신경쓰지 않아도 되서 관리가 편하다
    - 액션과 동일하게 실행 전에는 어떤 일이 발생할지 알 수 없다.
- 액션
    - 액션은 전체 코드로 퍼진다.
    - 함수 안에 액션이 존재한다면 함수도 액션이 된다.
    - 계산과는 다르게 호출 시점이나, 호출 횟수에 의존한다. 계산은 인자와 결과에 의존
    - 외부 세계와 상호 작용하는 것으로 변경을 발생시킬 수 있다.
    - 액션의 내부에는 계산과 데이터만 가지게 하고, 최대한 바깥으로 빼서 외부에 주는 영향을 최소하 하는게 베스트

## 챕터 4
액션에서 계산을 빼는 법을 알 수 있어서 좋았다.

나오는 예제들에서는 우선 다른 팀과의 협업을 중시해서 코드를 계산으로 세분화하고 재사용 가능한 코드로 만드는 점이 인상적이었다.

- 액션과 계산 데이터 구분
    - 액션은 코드로 어떤건지 알 수 있었다
        - 함수 내부에서 전역 변수를 변경할 수 있다면 그 함수는 액션이다.
        - 액션은 외부에 관여하는 코드이기 때문이고, 실행 횟수나 실행 시점에 따라 외부가 어떻게 변할지 모르기 때문이다.
        - 암묵적 입력 - 함수 내부에서 전역 변수를 참조하는 것.
        - 암묵적 출력 - 함수 내부에서 전역 변수를 변경하는 것.
        - 암묵적 입, 출력은 외부에 영향을 줄 수 있으므로 피한다
    - 그렇다면 어떻게 계산으로 구분하는가?
        - 함수 내부에서 전역 변수를 참조하지 못 하게 한다.
        - 함수에서 전역 변수를 매개 변수로 받고 return으로 돌려준다.
        - 매개변수가 기본형이라면 값 복사가 일어나기 때문에 전역 변수의 값을 복사하는 것이기 때문에 전역변수에 영향을 미치지 않는다.
        - 매개변수가 참조형이라면 slice 같은 값 복사하면 되기 때문에 전역 참조 변수에 영향을 미치지 않는다.
        - 결론은 매개변수를 사용하고 값을 return하는 것으로 액션 → 계산으로 탈바꿈 가능

    - 계산 추출을 하는 방법
        1. 계산 코드를 찾아 빼낸다.
        2. 새 함수에 암묵적 입력과 출력을 찾는다.
        3. 암묵적 입력은 인자로 암묵적 출력은 리턴으로 바꾼다

           인자와 리턴 값은 바뀌지 않는 불변으로 하는게 중요하다.

           불변 아닌 변경이 되는거라면 액션과 다를바 없다

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

