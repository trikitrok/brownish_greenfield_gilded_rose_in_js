var DegradableItem = require('./degradableItem.js');

module.exports = {
  createFrom: createFrom
};

function createFrom(items) {
  return DegradableItems(
    items.map(DegradableItem.create)
  );
}

function DegradableItems(degradableItems) {
  return {
    update: update
  };

  function update() {
    degradableItems.forEach(
      function(item) {
        item.age();
        item.updateQuality();
      }
    );
  }
}