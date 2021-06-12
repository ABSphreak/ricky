const Discord = require('discord.js');

const getJoke = () => {
	const embed = new Discord.MessageEmbed().setTitle('A dev joke for you').setImage('https://www.readme-jokes.vercel.app/api');
	return embed;
};

module.exports = {
	name: 'devjoke',
	description: 'Fetches a random dev joke.',
	execute(message, args) {
		message.channel.send(getJoke());
	},
};
