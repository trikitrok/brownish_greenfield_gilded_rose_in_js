module.exports = {
  createFrom: createFrom
};

function createFrom(items) {
  return items.map(createItem);
}

function createItem(item) {
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
    item.sell_in -= 1;
    if(item.quality > 0) {
      if(item.sell_in >= 0) {
        item.quality -= 1;  
      } else {
        item.quality -= 2;  
      }
    } 
  }
}

function AgedBrie(item) {
  return {
    update: update
  };

  function update() {
    item.sell_in -= 1;
    item.quality += 1;
  }
}