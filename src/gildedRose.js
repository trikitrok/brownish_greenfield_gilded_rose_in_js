'use strict';

module.exports.GildedRose = GildedRose;

function GildedRose() {
  
};

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}