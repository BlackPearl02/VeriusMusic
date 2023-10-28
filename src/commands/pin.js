import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';
import * as functions from '../functions/functions.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('pin')
    .setDescription('przypnij wiadomość na którą odpowiadasz');

  return command.toJSON();
};
const invoke = async (interaction) => {
  try {
    const message = interaction.refe;
    await message.pin();
    console.log(`Pinned message ID: ${message.id}`);
  } catch (error) {
    console.error('Error pinning message:', error);
  }
};
export { create, invoke };
