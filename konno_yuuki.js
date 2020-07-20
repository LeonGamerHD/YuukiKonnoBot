const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
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
    client.user.setActivity('LeonGamer_HD', { type: "STREAMING", url: "https://www.twitch.tv/le0ngamer_hd"}).catch(console.error);
});
        // Nachrichten Reactionen
client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id !== "583773838500691968") return;

    if (reaction.message.channel.id === "732022779163050065") {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache.get(user.id).roles.add("592675190320660500")
        await reaction.message.guild.members.cache.get(user.id).roles.remove("666704273928749056")
      }
    } else {
        return;
    }
})

client.on("messageReactionRemove", async (reaction, user) =>{
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id !== "583773838500691968") return;

    if (reaction.message.channel.id === "732022779163050065") {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("592675190320660500")
        await reaction.message.guild.members.cache.get(user.id).roles.add("666704273928749056")
      }
    }
})
        // Willkommens Nachricht
client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "eingang");
    if(!channel) return;

    channel.send(`Willkommen auf dem Community Discord Server von LeonGamer_HD, ${member.name}! Ich wünsche dir viel Spaß hier und bitte lese dir die Regeln in #regeln.`)
    member.roles.add("666704273928749056")
});
        // Befehle
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

    else if(command === 'rules'){
        let channel = client.channels.cache.get("732022779163050065");
        const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setTitle(name="**Regeln**")
        .setDescription(`Sei kein Arsch.

        Kommt es zu einem Streit mit jemandem, gehe respektvoll mit der Person/den Personen um und versuche zu verstehen, dass die Meinungen, Werte und Ansichten anderer sich von deinen unterscheiden können.

        Poste keine Daten, die zu privat sind, und frage auch nicht andere danach. Solche Daten beinhalten Adressen, Telefon- und Handynummern, etc.

        NSFW Bilder, Videos, GIFs, etc. Sind in jeglicher weise untersagt

        Spam ist (mit Ausnahme von #botspam) in jedem Channel untersagt.

        Bei Fragen, Wünschen und Anregungen darf sich gerne an das Personal oder direkt an LeonGamer_HD gewendet werden.

        Keine Werbung. Livestreams, egal auf welcher Plattform, und Twitch-Clips, welche nicht in Bezug zu LeonGamer_HD stehen, dürfen nur mit vorheriger Zustimmung eines Mods gepostet werden.

        Alle Nutzernamen müssen leserlich und leicht zu taggen sein. Sollte dies auf (d)einen Nutzernamen nicht zutreffen, steht es den Mods frei, diesen zu ändern.

        Keine Diskriminierung jeglicher Art.

        Ein Account pro User.

        Bei Problemen mit Usern bzw. Regelverstößen anderer, meldet euch umgehend bei einem Mod oder bei LeonGamer_HD. Bitte belegt jegliche Anschuldigungen à la "Bob hat Marko Arschkuh genannt." auch mit einem Screenshot als Beweis, (Zeugen-)Aussagen anderer oder dem genauen Wortlaut des 'Täters'.

        Benutzt Spoiler Tags. Tut ihr das nicht, kriegt ihr halt 'ne Verwarnung. Ja, das gilt auch für Stuff, der vor 15 Jahren erschien.

        Bei drei Verwarnungen fliegst du safe. Eventuell auch schon vorher.


        **Die Mods handeln nach eigenem Ermessen!** Wenn du denkst, du wurdest zu Unrecht gebannt, melde dich einfach bei LeonGamer_HD oder einen Mod.


        was jetzt?
        Wenn du die Regeln gelesen hast, ragiere mit ✅ um den Regeln zuzustimmen`)
        channel.send(embed).then(async msg => {
            await msg.react("✅");
        })
    }

      else if(command === 'help'){
        client.commands.get('help').execute(message, args);
    }
})

client.login(process.env.token);