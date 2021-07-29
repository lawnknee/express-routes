const { NotFoundError } = require("./expressError");


/** Item class for storing items on a shopping list */

class Item {

  static itemsList = [];

  static _get(name) {
      
    for (let item of Item.itemsList) {
      if (item.name === name) {
          return item;
      }
    }
    throw new NotFoundError(`Sorry, ${name} is not on the shopping list.`);
  }

  /** Returns list of all items. */
  static all() {
    return Item.itemsList;
  }

  /** Find item by name; returns item or throws error. */
  static get(name) {
    return Item._get(name);
  }

  /** Add new item and return item. */
  static add(name, price) {
    let item = { name, price }
      Item.itemsList.push(item);
  }

  /** Modify item and returns it. Throws error if cannot find. */
  static modify(old_name, new_name, new_price) {
    Item._get(old_name);  // using just for side-effect of error

    // Refactor using .map() to modify one or more elements in an array
    for (let item of Item.itemsList) {
      if (item.name === old_name) {
        item.name = new_name;
        item.price = new_price;  
        return item;          
      }
    }
  }

  /** Delete item; returns {message: "Deleted"} or throws error if cannot find. */
  static delete(name) {
    Item._get(name);  // using just for side-effect of error

    let itemIndex;

    // Refactor using .filter()

    for (let i = 0; i < Item.itemsList.length; i++) {
      if (Item.itemsList[i].name === name) {
        itemIndex = i;
      }
    }

    Item.itemsList.splice(itemIndex, 1);

    return {message: "Deleted"};
  }
}

// const shoppingList = new Item();

Item.add('popsicle', 1.45);
Item.add('cheerios', 3.40);
Item.add('lettuce', 2.00);
Item.add('apple', 1.55);

// console.log('This is what item is', Item.itemsList);

// console.log(Item.all());

// console.log(Item.get('lettuce'));

// console.log(Item.get('icecream')); // error

// Item.modify('lettuce', 'green lettuce', 2.50);

// Item.delete('apple');
// console.log(Item.all());

// Item.delete('potato'); // error


// const items = Item.all();

// console.log(items);

module.exports = { 
  Item,
};