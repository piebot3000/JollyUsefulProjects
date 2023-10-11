var cookin = {
  ints: [],
  
  luckyPrice: function() {
    return Game.cookiesPs * 6000;
  },

  getBestValue: function() {
    var best = Game.ObjectsById[0];
    for (i of Game.ObjectsById) {
      if ((best.storedCps / best.price) < (i.storedCps / i.price)) {
        best = i;
      }
    }
    return best;
  },

  startAutoBuy: function() {
    var int = setInterval(() => {
      if (Game.cookies > this.luckyPrice()) {
        this.getBestValue().buy();
      }
    }, 1000);

    this.ints.push(int);
  },

  startAutoGold: function() {
    var int = setInterval(() => {
      Game.shimmers.forEach(function(s) { s.pop(); })
    }, 1000);

    this.ints.push(int);
  },

  clearIntervals: function() {
    this.ints.forEach((i) => {clearInterval(i)});
    this.ints = [];
  },

  luckyPriceDiff: function() {
    return Beautify(this.luckyPrice() - Game.cookies);
  }
}