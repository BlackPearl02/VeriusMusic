import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Zatrzymaj piosenke');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const queue = client.distube.getQueue(interaction);
  functions.reply(interaction);
  //check if something is in queue
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'Aktulnie nie ma nic w kolejce!',
    });
    functions.del(msg);
    return;
  }
  //check if music is poused and then resume
  if (queue.paused) {
    queue.resume();
    const msg = await interaction.channel.send({
      content: 'Piosenka wznowiona',
    });
    functions.del(msg);
    return;
  }
  try {
    //pause queue
    queue.pause();
    //send message and delete after time
    const msg = await interaction.channel.send({
      content: 'Muzyka została zatrzymana',
    });
    functions.del(msg);
    return;
  } catch (error) {
    console.log(error);
  }
};

export { create, invoke };
