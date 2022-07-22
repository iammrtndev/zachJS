const { Client } = require('discord.js')
const { registerSlashCommands } = require('./commands.js')
const { users } = require('./firebase.js')
const { token, clientId, guildId } = require('./config.json')

registerSlashCommands(token, clientId, guildId)

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
})

client.once('ready', () => console.log('Ready!'))

client.on('messageCreate', async (message) => {
    const userId = message.author.id

    // to get the user from the database
    const userRef = users.doc(userId)
    const userData = (await userRef.get()).data()

    if (userData != null) {
        userRef.set({
            points: userData.points + 1,
        })
        console.log(userId + ': ' + userData.points)
    } else {
        userRef.set({
            points: 1,
        })
        console.log(userId + ' has been created')
    }
})

client.on('messageDelete', (message) => {
    console.log(message.content)
})

client.on('interactionCreate', async (interaction) => {
    const userId = interaction.member.id
    const userRef = users.doc(userId)

    if (interaction.commandName == 'points') {
        const userData = (await userRef.get()).data()
        interaction.reply('You have ' + userData.points + ' points!')
    }
})

client.login(token)
