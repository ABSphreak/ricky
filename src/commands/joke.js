const fetch = require('node-fetch');

const getJoke = async () => {
	const res = await fetch('https://www.icanhazdadjoke.com/', { method: 'GET', headers: { Accept: 'application/json' } });
	if (res) {
		const data = await res.json();
		return data.joke;
	}
	return '😴';
};

module.exports = {
	name: 'joke',
	description: 'Fetches a random joke.',
	async execute(message, args) {
		message.channel.send(await getJoke());
	},
};
