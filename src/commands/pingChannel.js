import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';
import { ChannelType } from 'discord.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('pingchannel')
    .setDescription(
      'Podaj kanał na który ma być przenoszony pingowany użytkownik'
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Wybierz konkretny kanał')
        .addChannelTypes(ChannelType.GuildVoice)
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

  //update config for channel in database
  try {
    await Config.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { pingChannel: channel.id }
    );
  } catch (err) {
    console.log(err);
  }
};
export { create, invoke };
