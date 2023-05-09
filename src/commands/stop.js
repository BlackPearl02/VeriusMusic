import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop a song');

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

  queue.stop();

  const msg = await interaction.channel.send({
    content: 'Stopped a song!',
  });
  functions.del(msg);
  client.distube.voices.leave(interaction);
  return;
};

export { create, invoke };
