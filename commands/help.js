module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle(name="**Hilfe**")
        .addField(name="!ping", value="Ein nutzloser Befehl der Bald entfernt wird", inline=true)
        .addField(name="!clear", value="Team Mitgliedern vorbehalten", inline=true)
        .addField(name="!help", value="Damit kannst du diese Hilfe öffnen", inline=false)
        .addField(name="#botspam", value="Hier kannst du !ping spammen wenn du willst", inline=true)
        .addField(name="#bot-befehle", value="Hier kannst du mir anweisungen geben!", inline=true)
        message.channel.send(embed);
    }
}