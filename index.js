// For setting up your bot token
require("dotenv").config();
const token = process.env.TOKEN;
const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "!";
const fs = require("fs");
client.commands = new Discord.Collection();

// Setting up Discord Command storing/importing system
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

// If the bot is ready then print this message
client.once("ready", () => {
  console.log(`Logged in as → ${client.user.tag}`);
});

client.on("message", (message) => {
  // Checking if the message is initialized by PREFIX
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      client.commands.get("ping").execute(message, args);
      break;
    case "website":
      client.commands.get("website").execute(message, args);
      break;
    case "info":
      client.commands.get("info").execute(message, args);
      break;
  }
});

// Logging the bot in
client.login(token);
