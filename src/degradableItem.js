module.exports = {
  create: create
};

function create(item) {
  if(isConjured(item)) {
    return Conjured(createDegradableItem(item));
  } 
  return createDegradableItem(item);
  
  function createDegradableItem(item) {
    var name = notConjuredItemNameFor(item),
      itemFactoriesByName = {
        "Aged Brie": AgedBrie,
        "Sulfuras": Sulfuras,
        "Backstage passes": BackstagePasses
      },
      factoryFn = itemFactoriesByName[name] || RegularItem;
    return factoryFn(item);
  }

  function isConjured(item) {
    var name = item.name.slice(0);
    return name.toLowerCase().indexOf("conjured") != -1;
  }

  function notConjuredItemNameFor(item) {
    return item.name.replace("Conjured", "").replace("conjured", "").replace(/  +/g, ' ').trim();
  }
}

function DegradableItem(item) {
  var MAX_QUALITY = 50;
  return {
    age: function() {
       item.sell_in -= 1;
    },
    increaseQualityBy: function(amount) {
      item.quality = Math.min(MAX_QUALITY, item.quality + amount);
    }
  };
}

function RegularItem(item) {
  var MIN_QUALITY = 0;
  return {
    age: DegradableItem(item).age,
    updateQuality: function() {
      if(item.sell_in >= 0) {
        decreaseQualityBy(1);  
      } else {
        decreaseQualityBy(2);  
      }
    }
  };

  function decreaseQualityBy(value) {
    item.quality = Math.max(MIN_QUALITY, item.quality - value)
  }
}

function AgedBrie(item) {
  return {
    age: DegradableItem(item).age,
    updateQuality: function () {
      DegradableItem(item).increaseQualityBy(1);
    }
  };
}

function Sulfuras() {
  return {
    age: function() {},
    updateQuality: function() {}
  };
}

function BackstagePasses(item) {
  var degradableItem = DegradableItem(item);

  return {
    age: degradableItem.age,
    updateQuality: function updateQuality() {    
      if(isConcertInMoreThanTenDays()) {
        degradableItem.increaseQualityBy(1);
      } else if (isConcertInTenToFiveDays()) {
        degradableItem.increaseQualityBy(2);
      } else if (isConcertInFiveOrLessDays()) {
        degradableItem.increaseQualityBy(3);
      } else {
        item.quality = 0;
      }
    }
  };

  function isConcertInFiveOrLessDays() {
      return 5 >= item.sell_in && item.sell_in >= 0;
  }

  function isConcertInTenToFiveDays() {
    return 10 >= item.sell_in && item.sell_in > 5;
  }

  function isConcertInMoreThanTenDays() {
    return item.sell_in > 10;
  }
}

function Conjured(item) {
  return {
    age: item.age,
    updateQuality: function () {
      item.updateQuality();
      item.updateQuality();
    }
  };
}