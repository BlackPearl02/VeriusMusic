import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('maxwarns')
    .setDescription('Podaj liczbe warnów po których będzie przyznany ban')
    .addNumberOption((option) =>
      option.setName('number').setDescription('Podaj liczbe').setMinValue(1)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //reply to interaction
  functions.reply(interaction);

  //get user input
  const number = interaction.options.getNumber('number');

  //update config for channel in database
  try {
    await Config.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { maxWarns: number }
    );
  } catch (e) {
    console.log(e);
  }
};
export { create, invoke };
