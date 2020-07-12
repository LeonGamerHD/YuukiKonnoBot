module.exports = {
    name: 'play',
    description: "with this command can you let me play Songs for you!",
    async execute(message, args){
        const ytdl = require('ytdl-core')
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("")
        if(!permissions.has('SPEAK')) return message.channel.send("")

        try {
            var connection = await voiceChannel.join()
        } catch (error) {
            console.log(`Ein Fehler ist beim versuch dem Voice Chat beizutreten aufgeteucht ${error}`)
            return message.channel.send(``)
        }

        const dispatcher = connection.play(ytdl(args[0], {filter: "audioonly"}))
        .on('finish', () => {
            voiceChannel.leave
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
    }
}