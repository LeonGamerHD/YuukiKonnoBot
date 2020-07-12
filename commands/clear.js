
module.exports = {
    name: 'clear',
    description: "this is a clear command!",
    execute(message, args){
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Es tut mir leid, aber du hast keine Erlaubnis, den Chatverlauf zu löschen!").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Es tut mir leid, aber das ist keine Nummer").then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .catch(error => message.reply(`Oh, es scheint, dass etwas schief gelaufen ist ... das ist der Fehler ${error}`));
    
    }
}