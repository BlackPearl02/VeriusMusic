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
  functions.reply(interaction);
  const queue = client.distube.getQueue(interaction);
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'There is nothing playing!',
    });
    functions.del(msg);
    return;
  }
  const q = queue.songs
    .map(
      (song, i) =>
        `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${
          song.formattedDuration
        }\``
    )
    .join('\n');
  interaction.channel.send({
    content: `**Server Queue**\n${q}`,
  });
  return;
};

export { create, invoke };
