const Discord = require('discord.js')

module.exports = {
    name: 'p',
    aliases: ["clear"],
    description: 'Purges an amount of messages.',
    async execute(message, args, client) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You are not permitted to purge messages!')
        if(!args[0]) return message.channel.send('You need to specify a number of messages to purge!')
        const amountToDelete = Number(args[0]);

        if(isNaN(amountToDelete)) return message.channel.send(`The number specified is not a number!`)
        if(!Number.isInteger(amountToDelete)) return message.channel.send("The number specified must be a whole number!")
        if(!amountToDelete || amountToDelete < 2) return message.channel.send('The number stated must be higer than 2!')
        const fetched = await message.channel.messages.fetch({
            limit: amountToDelete
        })

        try {
            await message.channel.bulkDelete(fetched)
            .then(message.channel.send(`Deleted **${amountToDelete}** messages!`).then(msg => {
                setTimeout(function() {
                    msg.delete()
                }, 3000)
            }))
        } catch(err) {
            console.log(err)
            message.channel.send('I couldn\'t delete the messages. Make sure they are within 14 days old.')
        }
    }
}