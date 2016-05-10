'use strict';

var DegradableItems = require('./degradableItems.js');

module.exports = {
  Inventory: Inventory,
  Item: Item
};

function Inventory(items) {
  return {
    update: function () {
      var degradableItems = DegradableItems.createFrom(items);
      degradableItems.update();
    }
  };
}

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

