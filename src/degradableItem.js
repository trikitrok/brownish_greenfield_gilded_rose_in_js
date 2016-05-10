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
    increaseQualityBy: increaseQualityBy
  };

  function age() {
     item.sell_in -= 1;
  }

  function increaseQualityBy(amount) {
    item.quality = Math.min(50, item.quality + amount);
  }
}

function RegularItem(item) {
  return {
    update: function update() {
      DegradableItem(item).age();
      updateQuality();
    }
  };

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
    update: function () {
      DegradableItem(item).age();
      DegradableItem(item).increaseQualityBy(1);
    }
  };
}

function Sulfuras() {
  return {
    update: function() {}
  };
}

function BackstagePasses(item) {
  return {
    update: function update() {
      DegradableItem(item).age();
      updateQuality();
    }
  };
 
  function updateQuality() {
    var degradableItem = DegradableItem(item);
    if(item.sell_in > 10) {
      degradableItem.increaseQualityBy(1);
    } else if (10 >= item.sell_in && item.sell_in > 5) {
      degradableItem.increaseQualityBy(2);
    } else if (5 >= item.sell_in && item.sell_in >= 0) {
      degradableItem.increaseQualityBy(3);
    } else {
      item.quality = 0;
    }
  }
}