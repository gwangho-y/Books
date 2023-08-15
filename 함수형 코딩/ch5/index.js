var shopping_cart = []
function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price)
    shopping_cart = add_item(shopping_cart, item)
    calc_cart_total(shopping_cart)
    var total = calc_total(shopping_cart)
    set_cart_total_dom(shopping_cart)
    update_shipping_icons(shopping_cart)
    update_tax_dom(total)
}

function calc_cart_total(cart) {

}

function update_shipping_icons(cart) {
    var buttons = getbuy_buttons_dom()
    for (var i = 0; i < buttons.length; i++) {
       button_hide_show(is_shipping_free(cart, buttons[i].item))
    }
}

function make_new_cart(cart, item) { // 새 장바구니 만들기
    return add_item(cart, make_cart_item(item.name, item.price))
}

function is_shipping_free(cart, item) {
    return gets_free_shipping(make_new_cart(cart, item))
}

function button_hide_show(button , show_hide_true) {
    show_hide_true? button.show_free_shipping_icon() : button.hide_free_shipping_icon()
}


function set_cart_total_dom(total) {}

function update_tax_dom(total) {
    set_tax_dom(calc_tax(total))
}

function make_cart_item(name, price) {
    return {
        name: name,
        price: price
    };
}

function add_item(cart, item) {
    return add_element_last(cart, item)
}
// 카피 온 라이트
function add_element_last(array, elem) {
    var new_array = array.slice()
    new_array.push(elem)
    return new_array
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