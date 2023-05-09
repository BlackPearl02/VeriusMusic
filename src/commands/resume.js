import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume a song');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const queue = client.distube.getQueue(interaction);
  functions.reply(interaction);
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'It is nothing in queue',
    });
    functions.del(msg);
    return;
  }
  if (queue.paused) {
    queue.resume();
    const msg = await interaction.channel.send({
      content: 'Resumed the song for you :)',
    });
    functions.del(msg);
  } else {
    const msg = await interaction.channel.send({
      content: 'The queue is not paused!',
    });
    functions.del(msg);
  }
};

export { create, invoke };
