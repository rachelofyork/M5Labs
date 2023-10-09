const chai = require("chai");
const should = chai.should();
const printBasket = require(`./ShoppingBasket`);

describe('Shopping Basket Tests', () => {
    it('should print a header row for the basket', () => {
        // Arrange
        const header = `Item Name\t\t\tPrice\n`;

        // Act
        const actual = printBasket([]);

        // Assert
        actual.should.contain(header);

    });

    describe('Item row tests', () => {

        let item1, item2, item3;
        let basket;

        beforeEach(() => {
            item1 = { _id: 1, _name: "Test", _price: 1, _vat: false };
            item2 = { _id: 2, _name: "Test name longer than 15", _price: 1, _vat: false };
            item3 = { _id: 3, _name: "Test", _price: 1, _vat: true }
            basket = [item1, item2, item3];
        })


        it('should print the item name', () => {
            // Arrange
            // Done in beforeEach

            // Act
            const actual = printBasket(basket);

            // Assert
            actual.should.contain(item1._name);
        });

        it('should print 3 tabs after the item name if its less than 16 in length', () => {
            // Arrange - done in beforeEach

            // Act
            const actual = printBasket(basket);

            // Assert
            actual.should.contain(`${item1._name}\t\t\t`);
        });

        it('should print 2 tabs after the item name if its 16 or in length', () => {
            // Arrange - done in beforeEach

            // Act
            const actual = printBasket(basket);

            // Assert
            actual.should.contain(`${item2._name}\t\t`);
        });

        describe('Price calculation and display tests', () => {

            const vatRate = 1.2;

            it('should not add the vat to the item price if _vat is false', () => {
                // Arrange - done in beforeEach

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain(item1._price.toFixed(2));

            });

            it('should add the vat to the item price only if _vat is true', () => {
                // Arrange - done in beforeEach

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain((item3._price * vatRate).toFixed(2));

            });

            it('should print the item prices fixed to 2 decimal places', () => {
                // Arrange - done in beforeEach

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain(item1._price.toFixed(2));
            });


            it('should print a newline char after the item prices', () => {
                // Arrange

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain(`${item1._price.toFixed(2)}\n`);
            });
        });

        it('should only print the name and price on a row', () => {
            // Arrange
            const item1Row = `Test\t\t\t1.00\n`;

            // Act
            const actual = printBasket(basket);

            // Assert
            actual.should.contain(item1Row);

        });

        describe('Total tests', () => {

            it('should print a newline and 3 tabs before the text "Total" and a tab after it', () => {
                // Arrange

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain(`\n\t\t\tTotal\t`);

            });


            it('should print a total of the basket', () => {
                // Arrange
                const vatRate = 1.2;
                const basketTotal = (item1._price + item2._price + (item3._price * vatRate)).toFixed(2);

                // Act
                const actual = printBasket(basket);

                // Assert
                actual.should.contain(`£${basketTotal}`);

            });
        });
    });
});