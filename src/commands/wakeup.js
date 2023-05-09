import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import * as functions from '../functions/functions.js';
import Config from '../schemas/guildConfig.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('wakeup')
    .setDescription('Wake up somebody throwing him beetwen channels!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Mention a user which you want wake up')
        .setRequired(true)
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const guild = interaction.guild;
  let config = await Config.find({ guildId: interaction.guild.id }).select(
    'pingChannel -_id'
  );
  let pingChannel = config[0].pingChannel;
  const userId = interaction.options.getUser('user').id;
  let member = guild.members.cache.get(userId);
  const authorVoiceChannelId = interaction.member.voice.channelId;
  const memberVoiceChannel = member.voice.channelId;
  functions.reply(interaction);
  // Check if the user executing the command has the required permissions to do so
  if (!interaction.member.permissions.has(PermissionFlagsBits.MoveMembers)) {
    const msg = await interaction.channel.send({
      content: 'You are not allowed to delete messages!',
    });
    functions.del(msg);
    return;
  }

  if (!interaction.appPermissions.has(PermissionFlagsBits.MoveMembers)) {
    const msg = await interaction.channel.send({
      content: 'I am not allowed to delete messages!',
    });
    functions.del(msg);
    return;
  }

  if (authorVoiceChannelId !== memberVoiceChannel) {
    const msg = await interaction.channel.send({
      content: 'User must be in this same channel as you',
    });
    functions.del(msg);
    return;
  }

  if (authorVoiceChannelId === memberVoiceChannel) {
    var i = 0;
    while (i <= 3) {
      if (authorVoiceChannelId === memberVoiceChannel) {
        member.voice.setChannel(authorVoiceChannelId);
        member.voice.setChannel(pingChannel);
        i++;
      } else {
        const msg = await interaction.channel.send({
          content: 'User disconnected while waking up',
        });
        functions.del(msg);
        return;
      }
    }
    member.voice.setChannel(authorVoiceChannelId);
    await interaction.channel.send({
      content: `${
        interaction.user
      } Try to wake up ${interaction.options.getUser('user')}`,
    });
    return;
  }
};

export { create, invoke };
