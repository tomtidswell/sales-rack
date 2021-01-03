function parsePrice(text='') {
    const price = text.replace('£','')
    return parseFloat(price)
}

module.exports = {parsePrice}
