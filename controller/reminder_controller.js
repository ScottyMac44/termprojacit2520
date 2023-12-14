let database = require("../database");

let remindersController = {
  list: (req, res) => {
    if (!req.user) {
      res.redirect("/auth/login");
    }
    const sessions = [];
    const sessionInfo = {
      sessionId: req.sessionID,
      sessionExpires: req.session.cookie.expires,
      userId: req.session.passport.user,
    };
    console.log(sessionInfo);
    sessions.push(sessionInfo);
    if (req.user.role === "admin") {
      res.render("reminder/admin", { sessions: sessions });
    }
    else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: async (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      cover: null
    };
    /*
    // Case 1: user uploads cover image
    if (req.file) {
      cover = req.file.path;
    }
    // Case 2: random cover image
    else if (req.body.cover) {
      const response = await fetch("insert unsplash api request here")
      const data = await response.json()
      reminder.cover = data.url
    }
    // Check for random cover image
    // if not, "data" should be a path to an image in public folder
    // req.body.cover // T or F
    if (req.body.cover) {
    }*/
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id; //2
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id; //2
    let searchResult = req.user.reminders.find(function (reminder) {
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
    const reminderIndex = req.user.reminders.findIndex(reminder => reminder.id === reminderToFind);
    req.user.reminders.splice(reminderIndex, 1);
    res.redirect("/reminders");
  },

  getRandomCover: async (req, res) => {
    const response = await fetch("unsplash api")
    const data = await response.json()

  }
};

module.exports = remindersController;
