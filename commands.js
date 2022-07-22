// Checking documentation for the discord.js slash commands https://discordjs.guide/interactions/slash-commands.html#guild-commands
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { SlashCommandBuilder } = require('@discordjs/builders')

async function registerSlashCommands(TOKEN, clientId, guildId) {
    // use /ping command as a template
    const pingCommand = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!')
        .toJSON()

    const pointsCommand = new SlashCommandBuilder()
        .setName('points')
        .setDescription('Replies with your amount of points!')
        .toJSON()

    const commands = [pingCommand, pointsCommand]

    console.log('Started refreshing application (/) commands.')
    const rest = new REST({ version: '9' }).setToken(TOKEN)
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
    })
    console.log('Successfully reloaded application (/) commands.')
}

module.exports.registerSlashCommands = registerSlashCommands
