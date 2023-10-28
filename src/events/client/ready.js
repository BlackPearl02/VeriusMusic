import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import mongoose from 'mongoose';
// import { twitch } from '../../functions/functions.js';

const once = true;
const name = 'ready';

async function invoke(client) {
  const commands = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.slice(0, -3));

  const commandsArray = [];

  for (let command of commands) {
    const commandFile = await import(`#commands/${command}`);
    commandsArray.push(commandFile.create());
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  // and deploy your commands!
  (async () => {
    try {
      console.log(
        `Started refreshing ${commandsArray.length} application (/) commands.`
      );
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commandsArray }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
      await data.map((data) => console.log(data.name));
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  console.log(`Successfully logged in as ${client.user.tag}!`);
  //connect to database
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.DATABASE_TOKEN || '');
  // twitch();
}

export { once, name, invoke };
