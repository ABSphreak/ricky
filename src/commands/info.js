module.exports = {
  name: "info",
  description: "This is a basic information command.",
  execute(message, args) {
    if (args[0] == "version") {
      message.channel.send("v1.0.0");
    } else {
      message.channel.send("Invalid Arguments!");
    }
  },
};
