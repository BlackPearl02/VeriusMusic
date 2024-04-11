import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Decide if bot can autoplay')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

  return command.toJSON();
};
const invoke = async (interaction) => {
  const user = interaction.options.getUser('member');
  const member = await interaction.guild.members.fetch(user.id);
  if (!interaction.appPermissions.has(PermissionFlagsBits.BanMembers)) {
    await interaction.reply({
      content: 'Nie mam permisji do wyrzucenia użytkowników',
      ephemarl: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
  //Check if the user want to unban other user with higer role
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
};
export { create, invoke };
