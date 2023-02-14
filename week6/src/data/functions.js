function getHowPriceLess(origin_price, price) {
    return origin_price - price;
}

function getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)ella-diving-token\s*=\s*([^;]*).*$)|^.*$/, "$1");
}

export { getHowPriceLess, getToken };
