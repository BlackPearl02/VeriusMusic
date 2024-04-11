import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Pomiń piosenkę');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const queue = client.distube.getQueue(interaction);
  functions.reply(interaction);
  //check if it is something in queue
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'There is nothing in the queue right now!',
    });
    functions.del(msg);
    return;
  }
  //skip a song and send message with new title
  try {
    const song = await queue.skip();
    const msg = await interaction.channel.send({
      content: `Pominięto! Aktuialnie leci:\n${song.name}`,
    });
    functions.del(msg);
    return;
  } catch (err) {
    const msg = await interaction.channel.send({
      content: `${err.message}`,
    });
    functions.del(msg);
    return;
  }
};

export { create, invoke };
