import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption((option) =>
      option
        .setName('search')
        .setDescription('Put here key words or link to music you want to hear')
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const string = interaction.options.getString('search');
  const authorVoiceChannelId = interaction.member.voice.channel;
  functions.reply(interaction);
  if (!string) {
    const msg = await interaction.channel.send({
      content: 'Please enter a song url or query to search.',
    });
    functions.del(msg);
    return;
  }
  client.distube
    .play(authorVoiceChannelId, string, {
      member: interaction.member,
      textChannel: interaction.channel,
    })
    .catch(async (e) => {
      interaction.reply({ content: `${e}`, ephemeral: true });
    });
};

export { create, invoke };
