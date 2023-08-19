import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show a queue');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //reply for command
  functions.reply(interaction);
  const queue = client.distube.getQueue(interaction);

  //check if it is something in queue
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'Aktualnie nie ma nic w kolejce!',
    });
    functions.del(msg);
    return;
  }
  //map a whole queue to one message
  const q = queue.songs
    .map(
      (song, i) =>
        `${i === 0 ? 'Aktualnie leci:' : `${i}.`} ${song.name} - \`${
          song.formattedDuration
        }\``
    )
    .join('\n');
  //send message
  interaction.channel.send({
    content: `**Kolejka serwera**\n${q}`,
  });
  return;
};

export { create, invoke };
