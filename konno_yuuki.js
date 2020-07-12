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
    client.user.setActivity('ALfheim Online', { type: "PLAYING"}).catch(console.error);
});

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Welcome to the Build Aincrad 1:1 scale Discord Server, ${member}! I wish you a lot of fun here and please read the rules in #rules . -Yui`)

});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }

      else if (command === 'server'){

        const embed = new Discord.MessageEmbed()
        embed.setThumbnail(url="https://i.imgur.com/2P42gO4.png")
        embed.setTitle(name="Server Status")
        embed.addField(name="Server IP", value="sao.apexmc.co", inline=true)
        embed.addField(name="Server Version", value="Forge 1.12.2", inline=true)
        embed.addField(name="Max Players", value="10.000", inline=false)
        message.channel.send(embed);
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

client.login('NzMxMjA1MTk0NjExOTQ5NTc5.Xwiqmg.Bc4mQr7bJDY_FfH8JNTLV5lxugU');