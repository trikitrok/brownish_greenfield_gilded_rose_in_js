'use strict';

var DegradableItems = require('./degradableItems.js');

module.exports = {
  withCatalog: function(items) {
    return GildedRose(items);
  },
  Item: Item
};

function GildedRose(items) {
  return {
    updateInventory: function() {
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
