let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: async (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      cover: null
    };

    // Case 1: user uploads cover image
    if (req.file) {
      cover = req.file.path;
    } // Case 2: random cover image
    else if (req.body.cover) {
      const response = await fetch("insert unspash api request here")
      const data = await response.json()
      reminder.cover = data.url
    }
    // Check for random cover image
    // if not, "data" should be a path to an image in public folder
    req.body.cover // T or F
    if (req.body.cover) {
    }
      database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id; //2
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id; //2
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    let boolString = req.body.completed;

    if (boolString == "true") {
      searchResult.completed = true;
    } else {
      searchResult.completed = false;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id; //2
    const reminderIndex = database.cindy.reminders.findIndex(reminder => reminder.id === reminderToFind);
    database.cindy.reminders.splice(reminderIndex, 1);
    res.redirect("/reminders");
  },

  getRandomCover: async (req, res) => {
    const response = await fetch("unspash api")
    const data = await response.json()

  }
};

module.exports = remindersController;
