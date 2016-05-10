'use strict';

var GildedRose = require('../src/gildedRose.js'),
  Inventory = GildedRose.Inventory,
  Item = GildedRose.Item;

describe("GildedRose inventory at the end of each day", function() {
  it("the quality of a product decreases by 1", function() {
    var daysToBeSold = 5, quality = 10,
      item = new Item("A regular item", daysToBeSold, quality),
      inventory = Inventory([item]);

    inventory.update();

    expect(item.quality).toBe(quality - 1);
  });

  it("the days to be sold of a product decrease by 1", function() {
    var daysToBeSold = 4, notNeededQuality = null,
      item = new Item("A regular item", daysToBeSold, notNeededQuality),
      inventory = Inventory([item]);

    inventory.update();

    expect(item.sell_in).toBe(daysToBeSold - 1);
  });

  it("the Quality of an item is never negative", function() {
    var daysToBeSold = 8, quality = 0,
      item = new Item("A regular item", daysToBeSold, quality),
      inventory = Inventory([item]);

    inventory.update();   

    expect(item.quality).toBe(0);
  });

  it("once the sell by date has passed, Quality degrades twice as fast", function() {
    var daysToBeSold = 0, quality = 4,
      item = new Item("A regular item", daysToBeSold, quality),
      inventory = Inventory([item]);

    inventory.update();

    expect(item.quality).toBe(quality - 2);
  });

  it("'Aged Brie' increases in Quality by one the older it gets", function() {
    var daysToBeSold = 7, quality = 4,
      item = new Item("Aged Brie", daysToBeSold, quality),
      inventory = Inventory([item]);

    inventory.update();

    expect(item.quality).toBe(quality + 1);
  });
});