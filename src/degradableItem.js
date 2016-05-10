module.exports = {
  create: create
};

function create(item) {
  if(item.name === "Aged Brie") {
    return AgedBrie(item);
  } else if(item.name === "Sulfuras") {
    return Sulfuras();
  } else if(item.name === "Backstage passes") {
    return BackstagePasses(item);
  }
  return RegularItem(item);
}

function DegradableItem(item) {
  return {
    age: age,
  };

  function age() {
     item.sell_in -= 1;
  }
}

function RegularItem(item) {
  return {
    update: update
  };

  function update() {
    DegradableItem(item).age();
    updateQuality();
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
    DegradableItem(item).age();
    updateQuality();
  }

  function updateQuality() {
    item.quality = Math.min(50, item.quality + 1);
  }
}

function Sulfuras() {
  return {
    update: function() {}
  };
}

function BackstagePasses(item) {
  return {
    update: update
  };

  function update() {
   DegradableItem(item).age();
    updateQuality();
  }

  function updateQuality() {
    if(item.sell_in > 10) {
      item.quality = item.quality + 1;
    } else if (10 >= item.sell_in && item.sell_in > 5) {
      item.quality = item.quality + 2;
    } else {
      item.quality = item.quality + 3;
    }
  }
}