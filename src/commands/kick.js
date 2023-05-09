import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user')
    .addUserOption((option) =>
      option
        .setName('member')
        .setDescription('Specify a user')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Specify a reason')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = async (interaction) => {
  const reason = interaction.options.getString('reason') || 'Nie podano powodu';
  const user = interaction.options.getUser('member');
  const member = await interaction.guild.members.fetch(user.id);
  const author = interaction.user;
  // Check if the bot executing the command has the required permissions to do so
  if (!interaction.appPermissions.has(PermissionFlagsBits.KickMembers)) {
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
  await member.kick(reason);
  return interaction.reply(
    `${author} pomyślnie wyrzucił ${user} z powodu ${reason}`
  );
};

export { create, invoke };
