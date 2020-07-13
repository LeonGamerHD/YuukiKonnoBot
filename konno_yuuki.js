const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const prefix = '!'
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

var version = '1.0.0';

var servers = {};

client.on('ready', () =>{
    console.log('Dieser Bot ist Online! ' + version);
    client.user.setActivity('https://www.twitch.tv/le0ngamer_hd', { type: "PLAYING"}).catch(console.error);
});

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "eingang");
    if(!channel) return;

    channel.send(`Willkommen auf dem Community Discord Server von LeonGamer_HD, ${member}! Ich wünsche dir viel Spaß hier und bitte lese dir die Regeln in #regeln.`)

});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }

      else if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }

    else if(command === 'play'){
           client.commands.get('play').execute(message, args);
    }

    else if(command === 'stop'){
        client.commands.get('stop').execute(message, args);
    }
})

client.login(process.env.token);