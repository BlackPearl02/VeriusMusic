import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause a song');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const queue = client.distube.getQueue(interaction);
  functions.reply(interaction);

  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'There is nothing in the queue right now!',
    });
    functions.del(msg);
    return;
  }
  if (queue.paused) {
    queue.resume();
    const msg = await interaction.channel.send({
      content: 'Resumed the song for you',
    });
    functions.del(msg);
    return;
  }
  queue.pause();

  const msg = await interaction.channel.send({
    content: 'Paused the song for you',
  });
  functions.del(msg);
  return;
};

export { create, invoke };
