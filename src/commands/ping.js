module.exports = {
  name: "ping",
  description: "This is a basic ping command.",
  execute(message, args) {
    message.channel.send("pong!");
  },
};
