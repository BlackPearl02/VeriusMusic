import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption((option) =>
      option
        .setName('member')
        .setDescription('Specify a user')
        .setRequired(true)
    )
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
  //Check if user want to kick bot
  if (member.id === '972095477355020308') {
    interaction.reply({
      content: 'Nie moge wyrzucić sam siebie',
      ephemeral: true,
    });
    setTimeout(() => interaction.deleteReply(), 60000);
    return;
  }
};
export { create, invoke };
