'use strict';

module.exports = {
  Inventory: Inventory,
  Item: Item
};

function Inventory(items) {
  return {
    update: update
  };

  function update() {
    items.forEach(updateItem);
  }

  function updateItem(item) {
    item.sell_in -= 1;
    if(item.quality > 0) {
      if(item.sell_in >= 0) {
        item.quality -= 1;  
      } else {
        item.quality -= 2;  
      }
    }      
  }
}

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

