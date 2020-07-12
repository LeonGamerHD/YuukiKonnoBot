module.exports = {
    name: 'stop',
    description: "this is a stop command!",
    execute(message, args){
        if(!message.member.voice.channel) return message.channel.send("")
        message.member.voice.channel.leave()
        return undefined
    }
}