import { SlashCommandBuilder } from 'discord.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';
import { ChannelType } from 'discord.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('channel')
    .setDescription('Specify in wich channel you can write commands')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Specify in wich channel you can write commands')
        .addChannelTypes(ChannelType.GuildText)
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //reply to interaction
  functions.reply(interaction);

  //get user input
  const channel = interaction.options.getChannel('channel');

  if (!interaction.member.permissions.has(PermissionFlagsBits.MenageChannels)) {
    const msg = await interaction.channel.send({
      content: 'You are not allowed to change the channel for bot commands !',
    });
    functions.del(msg);
    return;
  }
  //update config for channel in database
  Config.findOneAndUpdate(
    { guildId: interaction.guild.id },
    { channel: channel },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
export { create, invoke };
