// For setting up your bot token
require("dotenv").config();
const Discord = require("discord.js");
const token = process.env.TOKEN;
const PREFIX = "!";

// Initializing Bot Client
const bot = new Discord.Client();

// If the bot is ready then print this message
bot.on("ready", () => {
  console.log(`Logged in as → ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  // if (msg.content === "hello") {
  //   msg.reply("Hello!");
  // }
  let args = msg.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "ping":
      msg.channel.send("pong!");
      break;
    case "website":
      msg.channel.send("https://abhinav.sh/");
      break;
    case "info":
      if (args[1] === "version") {
        msg.channel.send("v1.0.0");
      } else {
        msg.channel.send("Invalid Arguments!");
      }
      break;
    case "clear":
      if (!args[1]) {
        return msg.reply("Error! Please define a second argument.");
      }
      break;
    default:
      msg.channel.send("You typed something wrong!");
      break;
  }
});

// Logging the bot in
bot.login(token);
