const helpInfo = `Hi I am Ricky, at your service.
These are some of the commands that I can understand:
\`!ping\` → !pong
\`!info\` → Brings up information about me
\`!help\` → Brings up this message
\`!joke\` → Random _dad joke_ for you
\`!wiki <query>\` → Queries **Wikipedia** for the given input
`;

module.exports = {
	name: 'help',
	description: 'Fetches a help card.',
	execute(message, args) {
		message.channel.send(helpInfo);
	},
};
