import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //reply to interaction
  functions.reply(interaction);

  //get user input
  const channel = interaction.options.getChannel('channel');

  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
    const msg = await interaction.channel.send({
      content: 'Nie masz uprawnień aby zmienić kanał',
    });
    functions.del(msg);
    return;
  }
  //update config for channel in database
  try {
    await Config.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { channel: channel.id }
    );
  } catch (err) {
    console.log(err);
  }
};
export { create, invoke };
