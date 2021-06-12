const Discord = require('discord.js');
const fetch = require('node-fetch');

const HTML_REGEX = /<[^>]+>/g;

const extractTextFromHTML = html => {
	return html.replace(HTML_REGEX, '').replace('&quot;', '"');
};

const getEmbeddableArr = arr => {
	// arr[].title, arr[].snippet
	// name, value
	return arr.map((item, idx) => {
		return {
			name: `${idx + 1}. ${item.title}`,
			value: extractTextFromHTML(item.snippet),
		};
	});
};

const getWiki = async args => {
	const normalString = args.join(' ');
	const encodedString = encodeURIComponent(normalString);
	let responseMsg = '';
	try {
		const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${encodedString}`);
		if (res) {
			const data = await res.json();
			if (data.query.search.length > 0) {
				const embedArr = getEmbeddableArr(data.query.search);
				responseMsg = new Discord.MessageEmbed()
					.setColor('#464646')
					.setTitle(`Search results: ${normalString}`)
					.setURL(`https://en.wikipedia.org/w/index.php?search=${encodedString}`)
					.addFields([...embedArr])
					.setTimestamp()
					.setFooter(
						'Source: Wikipedia',
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQPA8Qi7lg9kj1shVj4E4uhH6lblZKa03WOSf0Hqm_XCuQyrd3-wROXjx4qG6bol4kfA&usqp=CAU'
					);
			} else {
				responseMsg = new Discord.MessageEmbed()
					.setColor('#e63946')
					.setTitle(`Search results: ${normalString}`)
					.setURL(`https://en.wikipedia.org/w/index.php?search=${encodedString}`)
					.setDescription('Could not find anything viable. Click on link above to browse more on Wikipedia.');
			}
		}
		return responseMsg;
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	name: 'wiki',
	description: 'Fetches a random joke.',
	async execute(message, args) {
		message.channel.send(await getWiki(args));
	},
};
