import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import Config from '../schemas/guildConfig.js';
import * as functions from '../functions/functions.js';

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Decide if bot can autoplay');

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  //get autoplay config from database
  let config = await Config.find({ guildId: interaction.guild.id }).select(
    'autoplay -_id'
  );
  let autoplay = config[0].autoplay;

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

  queue.autoplay = autoplay;

  //change autoplay status
  autoplay = queue.toggleAutoplay();

  //send message with autoplay status
  const msg = await interaction.channel.send({
    content: `AutoPlay: \`${autoplay ? 'On' : 'Off'}\``,
  });

  //update config for autoplay in database
  Config.findOneAndUpdate(
    { guildId: interaction.guild.id },
    { autoplay: autoplay },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  //delete message after time
  functions.del(msg);

  return;
};

export { create, invoke };
