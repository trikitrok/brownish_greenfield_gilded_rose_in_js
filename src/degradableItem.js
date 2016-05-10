module.exports = {
  create: create
};

function create(item) {
  if(item.name == "Aged Brie") {
    return AgedBrie(item);
  }
  return RegularItem(item);
}

function RegularItem(item) {
  return {
    update: update
  };

  function update() {
    age();
    updateQuality();
  }

  function age() {
     item.sell_in -= 1;
  }

  function updateQuality() {
    if(item.sell_in >= 0) {
      decreaseQualityBy(1);  
    } else {
      decreaseQualityBy(2);  
    }
  }

  function decreaseQualityBy(value) {
    item.quality = Math.max(0, item.quality - value)
  }
}

function AgedBrie(item) {
  return {
    update: update
  };

  function update() {
    age();
    updateQuality();
  }

  function age() {
     item.sell_in -= 1;
  }

  function updateQuality() {
    item.quality = Math.min(50, item.quality + 1)
  }
}