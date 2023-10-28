import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import * as functions from '../functions/functions.js';
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Odbanuj użytkownika')
    .addStringOption((option) =>
      option
        .setName('userid')
        .setDescription('Podaj ID użytkownika')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

  return command.toJSON();
};
const invoke = async (interaction) => {
  //get user and guild data
  const user = interaction.options.getString('userid');
  const guild = interaction.guild;
  const bans = await guild.bans.fetch();
  //check if bot have permission to ban users
  if (!interaction.appPermissions.has(PermissionFlagsBits.BanMembers)) {
    await interaction.reply({
      content: 'Nie mam permisji do wyrzucenia użytkowników',
      ephemarl: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  const bannedUser = bans.find((ban) => ban.user.id === user);
  if (bannedUser) {
    await guild.members.unban(bannedUser.user, 'Unbanned by command');
    interaction.reply(`Successfully unbanned user <@${user}>.`);
  } else {
    interaction.reply(`User <@${user}> is not banned.`);
  }

  return;
};
export { create, invoke };
