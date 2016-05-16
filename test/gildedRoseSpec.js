'use strict';

var GildedRose = require('../src/gildedRose.js'),
  Item = GildedRose.Item;

describe("The Gilded Rose updates its inventory at the end of each day", function() {
  it("The quality of a regular item decreases by 1", function() {
    var daysToBeSold = 5, quality = 10,
      item = new Item("A regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality - 1);
  });

  it("The days to be sold of any item decrease by 1", function() {
    var daysToBeSold = 4, notNeededQuality = null,
      item = new Item("A regular item", daysToBeSold, notNeededQuality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.sell_in).toBe(daysToBeSold - 1);
  });

  it("The Quality of an item is never negative", function() {
    var daysToBeSold = 8, quality = 0,
      item = new Item("A regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();   

    expect(item.quality).toBe(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    var daysToBeSold = 0, quality = 4,
      item = new Item("A regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality - 2);
  });

  it("'Aged Brie' increases in Quality by one the older it gets", function() {
    var daysToBeSold = 7, quality = 4,
      item = new Item("Aged Brie", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 1);
  });

  it("'Aged Brie' Quality is never more than 50", function() {
    var daysToBeSold = 2, quality = 50,
      item = new Item("Aged Brie", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
  })

  it("'Sulfuras' never has to be sold or decreases in Quality", function() {
    var daysToBeSold = "anything", quality = 80,
      item = new Item("Sulfuras", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
    expect(item.sell_in).toBe(daysToBeSold);
  })

  it("'Backstage passes' quality increases by 1, when there are more than 10 days to the concert", function() {
    var daysToBeSold = 12, quality = 5,
      item = new Item("Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 1);
  });

  it("'Backstage passes' quality increases by 2, between 10 and 5 days before to the concert", function() {
    var daysToBeSold = 7, quality = 5,
      item = new Item("Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 2);
  });

  it("'Backstage passes' quality increases by 3, 5 days or less before the concert", function() {
    var daysToBeSold = 1, quality = 5,
      item = new Item("Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 3);
  });

  it("'Backstage passes' quality drops to 0 after the concert", function() {
    var daysToBeSold = 0, quality = 5,
      item = new Item("Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(0);
  });

  it("'Backstage passes' quality is never more than 50", function() {
    var daysToBeSold = 10, quality = 50,
      item = new Item("Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
  });

  it("The quality of a conjured regular item decreases by 2", function() {
    var daysToBeSold = 5, quality = 10,
      item = new Item("A conjured regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality - 2);
  });

  it("The days to be sold of a Conjured item decrease by 1", function() {
    var daysToBeSold = 4, notNeededQuality = null,
      item = new Item("A conjured regular item", daysToBeSold, notNeededQuality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.sell_in).toBe(daysToBeSold - 1);
  });

  it("The Quality of a conjured item is never negative", function() {
    var daysToBeSold = 8, quality = 0,
      item = new Item("A conjured regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();   

    expect(item.quality).toBe(0);
  });

  it("Once the sell by date has passed, Quality of conjured items also degrades twice as fast", function() {
    var daysToBeSold = 0, quality = 4,
      item = new Item("A conjured regular item", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality - 4);
  });

  it("'Conjured Aged Brie' increases in Quality by 2 the older it gets", function() {
    var daysToBeSold = 7, quality = 4,
      item = new Item("Conjured Aged Brie", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 2);
  });

  it("'Conjured Aged Brie' Quality is never more than 50", function() {
    var daysToBeSold = 2, quality = 50,
      item = new Item("Conjured Aged Brie", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
  })

  it("'Conjured Sulfuras' never has to be sold or decreases in Quality", function() {
    var daysToBeSold = "anything", quality = 80,
      item = new Item("Conjured Sulfuras", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
    expect(item.sell_in).toBe(daysToBeSold);
  })

  it("'Conjured Backstage passes' quality increases by 2, when there are more than 10 days to the concert", function() {
    var daysToBeSold = 12, quality = 5,
      item = new Item("Conjured Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 2);
  });

  it("'Conjured Backstage passes' quality increases by 4, between 10 and 5 days before to the concert", function() {
    var daysToBeSold = 7, quality = 5,
      item = new Item("Conjured Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 4);
  });

  it("'Conjured Backstage passes' quality increases by 6, 5 days or less before the concert", function() {
    var daysToBeSold = 1, quality = 5,
      item = new Item("Conjured Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality + 6);
  });

  it("'Conjured Backstage passes' quality drops to 0 after the concert", function() {
    var daysToBeSold = 0, quality = 5,
      item = new Item("Conjured Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(0);
  });

  it("'Conjured Backstage passes' quality is never more than 50", function() {
    var daysToBeSold = 10, quality = 50,
      item = new Item("Conjured Backstage passes", daysToBeSold, quality),
      gildedRose = GildedRose.withCatalog([item]);

    gildedRose.updateInventory();

    expect(item.quality).toBe(quality);
  });
});