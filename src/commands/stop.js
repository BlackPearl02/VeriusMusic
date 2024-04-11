import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Zatrzymaj muzykę');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const queue = client.distube.getQueue(interaction);
  functions.reply(interaction);
  //check if it is something in queue
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'Aktualnie nie ma nic w kolejce!',
    });
    functions.del(msg);
    return;
  }
  //stop music
  queue.stop();

  const msg = await interaction.channel.send({
    content: 'Zatrzymano muzykę',
  });
  functions.del(msg);
  //leave from channel
  client.distube.voices.leave(interaction);
  return;
};

export { create, invoke };
