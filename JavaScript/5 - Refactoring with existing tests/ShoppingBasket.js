const printBasket = basket => {
    let basketOutput = `Item Name\t\t\tPrice\n`;
    let total = 0;
    for (const item of basket) {
        for (const property in item) {
            switch (property) {
                case `_name`:
                    basketOutput += `${item[property]}`;
                    basketOutput += item[property].length < 16 ? `\t\t\t` : `\t\t`
                    break;
                case `_price`:
                    const priceToAdd = item._vat ? (item[property] * 1.2).toFixed(2) : item[property].toFixed(2);
                    basketOutput += `${priceToAdd}\n`;
                    total += parseFloat(priceToAdd);
                    break;
                case `_id`:
                case `_vat`:
                default:
                    break;
            }
        }
    }
    basketOutput += `\n\t\t\tTotal\t£${total.toFixed(2)}`;
    return basketOutput;
}

const myBasket = [];

const item1 = { _id: 1, _name: "Baked Beans", _price: 0.85, _vat: false };
myBasket.push(item1);
console.log(printBasket(myBasket));

const item2 = { _id: 2, _name: "Battenburg Cake", _price: 1, _vat: true };
myBasket.push(item2);
console.log(printBasket(myBasket));

const item3 = { _id: 3, _name: "Granary Loaf", _price: 1.45, _vat: false };
myBasket.push(item3);
console.log(printBasket(myBasket));

const item4 = { _id: 4, _name: "Bottle of Red Wine", _price: 11.05, _vat: true };
myBasket.push(item4);
console.log(printBasket(myBasket));

module.exports = printBasket;