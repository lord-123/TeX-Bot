const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

client.on('ready', () => {
  console.log(`Logged in as @${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith('```tex\n') && msg.content.endsWith('```')) {
        var latex = msg.content.substring(7, msg.content.length-3);
        var url = `https://timodenk.com/api/tex2img/${encodeURIComponent(latex)}?format=jpeg`;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                msg.channel.send({
                    embed: {
                        description: 'Rendered TeX:',
                        color: 16777215,
                        author: {
                            name: 'TeX Bot',
                            icon_url: client.user.avatarURL
                        },
                        image: {
                            url: url
                        }
                    }
                });
            }
            else {
                console.error("Invalid TeX");
            }
        });
    }

    if (msg.content.includes(`<@${client.user.id}>`)) {
        msg.reply('check your DMs!');
        msg.author.send('The bot requires TeX in the form\n\n\\```tex\n{tex}```\n\nI recommend http://www.hostmath.com/ for anything that is a bit comlicated.');
    }
});

client.login(process.env.TOKEN);