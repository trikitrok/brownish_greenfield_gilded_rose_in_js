'use strict';

var GildedRose = require('../src/gildedRose.js'),
  Inventory = GildedRose.Inventory,
  Item = GildedRose.Item;

describe("GildedRose inventory", function() {
  it("at the end of each day the quality of a product decreases by 1", function() {
    var anyInitialQuality = 10,
      notNeededDaysToSell = null,
      item = new Item("A regular item", notNeededDaysToSell, anyInitialQuality),
      inventory = Inventory([item]);

    inventory.update();

    expect(item.quality).toBe(anyInitialQuality - 1);
  });
});