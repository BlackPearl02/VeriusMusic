import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Ustaw głośność')
    .addNumberOption((option) =>
      option
        .setName('volume_number')
        .setDescription('Wpisz liczbę od 0-100')
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
    content: `Głośność ustawiona na \`${volume}\``,
  });
  //updata data in database
  try {
    await Config.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { volume: volume }
    );
  } catch (error) {
    console.log(error);
  }
};

export { create, invoke };
