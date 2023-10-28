import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import * as functions from '../functions/functions.js';
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Zbanuj użytkownika')
    .addUserOption((option) =>
      option
        .setName('member')
        .setDescription('Podaj użytkownika')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

  return command.toJSON();
};
const invoke = async (interaction) => {
  //get user and member data
  const user = interaction.options.getUser('member');
  const member = await interaction.guild.members.fetch(user.id);
  //check if bot have permission to ban users
  if (!interaction.appPermissions.has(PermissionFlagsBits.BanMembers)) {
    await interaction.reply({
      content: 'Nie mam permisji do wyrzucenia użytkowników',
      ephemarl: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  //Check if the user want to kick is a bot
  if (user.bot) {
    interaction.reply({
      content: 'Nie moge zbanować innego bota',
      ephemeral: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  //Check if the user want to kick other user with higer role
  if (
    member.roles.highest.position >= interaction.member.roles.highest.position
  ) {
    interaction.reply({
      content: 'Nie mogę wyrzucić kogoś z wyższą rangą',
      ephemeral: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  //Check if user want to kick himself
  if (member.id === '972095477355020308') {
    interaction.reply({
      content: 'Nie moge wyrzucić sam siebie',
      ephemeral: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  try {
    await interaction.guild.members.ban(`${user.id}`);
    const msg = await interaction.channel.send({
      content: `Zbanowano:\n${user.tag}`,
    });
    functions.del(msg);
  } catch (error) {
    console.log(error);
  }

  return;
};
export { create, invoke };
