import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Puść piosenke')
    .addStringOption((option) =>
      option
        .setName('search')
        .setDescription(
          'Podaj słowa kluczowe bądź URL piosenki którą chcesz usłyszeć'
        )
        .setRequired(true)
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //get input form user
  const string = interaction.options.getString('search');
  const authorVoiceChannelId = interaction.member.voice.channel;
  //reply to command
  functions.reply(interaction);

  //play music based on input data
  client.distube
    .play(authorVoiceChannelId, string, {
      member: interaction.member,
      textChannel: interaction.channel,
    })
    //catch errors and send it to channel
    .catch(async (err) => {
      interaction.reply({ content: `${err}`, ephemeral: true });
      console.log(err);
    });
};

export { create, invoke };
