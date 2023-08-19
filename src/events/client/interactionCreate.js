const once = false;
const name = 'interactionCreate';
import Config from '../../schemas/guildConfig.js';
async function invoke(interaction) {
  // Check if the interaction is a command and call the invoke method in the corresponding file
  // The #commands ES6 import-abbreviation is defined in the package.json
  let config = await Config.find({
    guildId: interaction.guild.id,
  }).select('channel -_id');

  if (interaction.isChatInputCommand()) {
    if (config[0].channel !== null) {
      if (interaction.channel.id !== config[0].channel)
        return interaction.reply({
          ephemeral: true,
          content: `You must write in <#${config[0].channel}> channel`,
        });
      return (await import(`#commands/${interaction.commandName}`)).invoke(
        interaction
      );
    } else if (config[0].channel === null) {
      return (await import(`#commands/${interaction.commandName}`)).invoke(
        interaction
      );
    }
  }
}

export { once, name, invoke };
