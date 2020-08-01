module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle(name="**Hilfe**")
        .addField(name="!clear", value="Team Mitgliedern vorbehalten", inline=true)
        .addField(name="!help", value="Damit kannst du diese Hilfe öffnen", inline=false)
        .addField(name="#bot-befehle", value="Hier kannst du mir anweisungen geben!", inline=true)
        .addField(name="#rollen-auswahl", value="Hier kannst du auswählen worüber du informiert werden möchtest", inline=true)
        message.channel.send(embed);
    }
}