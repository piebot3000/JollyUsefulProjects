var cookin = {
  ints: [],
  clickWrath: false,

  luckyPrice: function() {
    return Game.cookiesPsRaw * 7 * 6000;
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
        var best = this.getBestValue();
        if (Game.cookies > best.price) {
          best.buy();
          this.logger.log("AutoBought: " + best.name);
        }
      }
    }, 10000);

    this.ints.push(int);
  },

  startAutoGold: function() {
    var int = setInterval(() => {
      Game.shimmers.forEach((s) => { 
        if(s.type == "golden" && s.wrath == 0) {
          s.pop(); 
          this.logger.log("Popped Golden Cookie"); 
        } else {
          if(this.clickWrath) {
            s.pop();
            this.logger.log("Popped Wrath Cookie");
          } else if (s.type == "reindeer") {
            s.pop("Popped Reindeer");
          } else {
            this.logger.log("Skipped Wrath Cookie");
          }
        }
      });
    }, 1000);

    this.ints.push(int);
  },

  //TODO: startAutoClick

  start: function() {
    this.startAutoGold();
    this.startAutoBuy();
  },

  clearIntervals: function() {
    this.ints.forEach(clearInterval);
    this.ints = [];
  },

  luckyPriceDiff: function() {
    return Beautify(this.luckyPrice() - Game.cookies);
  },

  bigCombo: function() {
    Game.gainBuff("click frenzy", 10, 777);
    Game.gainBuff("frenzy", 10, 7);
    Game.gainBuff("building buff", 10, 10, 0);
  }
}

cookin.logger = {
  printlogs: false,
  logs: [],
  log: function(text) {
    if (this.printlogs) {
      console.log(text);
    }
    this.logs.push(text);
  },
  showLogs: function() {
    console.log(this.logs);
  },
  clearLogs: function() {
    this.logs = [];
  }
}