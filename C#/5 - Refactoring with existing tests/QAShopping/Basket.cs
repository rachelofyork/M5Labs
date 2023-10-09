using System;

namespace QAShopping
{
    public static class Basket
    {
        public static string PrintBasket(dynamic basket)
        {
            const double VAT = 0.2;

            string basketOutput = getBasketPropertyValues(basket, VAT);
            return basketOutput;
        }

        private static string getBasketPropertyValues(dynamic basket, double VAT)
        {
            string basketOutput = "Item Name\t\t\tPrice\n";
            double total = 0;

            foreach (dynamic item in basket)
            {
                foreach (var property in item.GetType().GetProperties())
                {
                    switch (property.Name)
                    {
                        case "_name":
                            basketOutput = getNameProperty(basketOutput, item, property);
                            break;
                        case "_price":
                            double priceToAdd = calculateTotalPrice(item, property, VAT);
                            basketOutput += $"{priceToAdd:0.00}\n";
                            total += priceToAdd;
                            break;
                        case "_id":
                        case "_vat":
                        default:
                            break;
                    }
                }
            }
            basketOutput += $"\n\t\t\tTotal\t£{total:0.00}";
            return basketOutput;
        }

        private static double calculateTotalPrice(dynamic item, dynamic property, double VATrate)
        {
            double price = property.GetValue(item);
            bool vat = item.GetType().GetProperty("_vat").GetValue(item);
            double priceToAdd = vat ? Math.Round(price * (1+VATrate), 2) : price;
            return priceToAdd;
        }

        private static string getNameProperty(string basketOutput, dynamic item, dynamic property)
        {
            basketOutput += $"{property.GetValue(item)}";
            basketOutput += property.GetValue(item).Length < 16 ? "\t\t\t" : "\t\t";
            return basketOutput;
        }
    }
}
