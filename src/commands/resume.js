import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Wznów piosenkę');

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
  //check if queue is paused
  if (queue.paused) {
    queue.resume();
    const msg = await interaction.channel.send({
      content: 'Piosenka została wznowiona',
    });
    functions.del(msg);
  } else {
    const msg = await interaction.channel.send({
      content: 'Kolejka nie jest zatrzymana!',
    });
    functions.del(msg);
  }
};

export { create, invoke };
