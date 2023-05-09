import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set music volume')
    .addNumberOption((option) =>
      option
        .setName('volume_number')
        .setDescription('Set volume number')
        .setRequired(true)
        .setMaxValue(100)
        .setMinValue(0)
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //get queue
  const queue = client.distube.getQueue(interaction);

  //reply to interaction
  functions.reply(interaction);

  //check if is something is in queue
  if (!queue) {
    const msg = await interaction.channel.send({
      content: 'There is nothing in the queue right now!',
    });
    //delete message after time
    functions.del(msg);
    return;
  }
  const volume = parseInt(interaction.options.getNumber('volume_number'));
  if (isNaN(volume)) {
    const msg = await interaction.channel.send({
      content: 'Please enter a valid number!',
    });
    //delete message after time
    functions.del(msg);
    return;
  }

  //set volume
  queue.setVolume(volume);

  //send message with volume
  interaction.channel.send({
    content: `Volume set to \`${volume}\``,
  });

  Config.findOneAndUpdate(
    { guildId: interaction.guild.id },
    { volume: volume },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

export { create, invoke };
