
module.exports = {
    name: 'clear',
    description: "this is a clear command!",
    execute(message, args){
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("I'm sorry but you don't have permission to clear the chat!").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("I'm sorry but that's not a number").then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .catch(error => message.reply(`Oh it seems something went wrong... this is the error ${error}`));
    
    }
}