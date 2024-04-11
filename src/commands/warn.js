import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import Config from '../schemas/guildConfig.js';
import User from '../schemas/users.js';
import mongoose from 'mongoose';

const create = () => {
  const command = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    //.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName('member')
        .setDescription('Podaj użytkownika')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Podaj powód')
    );
  // .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
  return command.toJSON();
};
const invoke = async (interaction) => {
  const user = interaction.options.getUser('member');
  const member = await interaction.guild.members.fetch(user.id);

  if (!interaction.appPermissions.has(PermissionFlagsBits.KickMembers)) {
    await interaction.reply({
      content: 'Nie mam permisji do ostrzegania użytkowników',
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
  //find amout of warns in database
  try {
    let userProfile = await User.findOne(
      { guildId: interaction.guild.id },
      { userId: user.id }
    );
    //if user is not in database create his profile
    if (!userProfile || userProfile === null) {
      userProfile = new User({
        _id: new mongoose.Types.ObjectId(),
        guildId: `${interaction.guild.id}`,
        userId: `${user.id}`,
        warns: 0,
      });
      await userProfile.save().catch(console.err);
    }
    const guildConfig = await Config.findOne(
      { guildId: interaction.guild.id },
      { userId: user.id }
    ).select('maxWarns');
    let userM = await User.findOne({
      guildId: interaction.guild.id,
      userId: user.id,
    });
    let warns;
    if (!userM) {
      let userProfile = new User({
        _id: new mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        userId: user.id,
        warns: 0,
      });
      warns = 0;
      await userProfile.save();
    } else {
      warns = userM.warns;
    }
    //add +1 to warns in database
    if (warns < guildConfig.maxWarns) {
      const value = warns + 1;
      await User.findOneAndUpdate(
        { guildId: interaction.guild.id, userId: user.id },
        { warns: value }
      );
    }
    //ban user if he have more than max warns
    if (warns >= guildConfig.maxWarns) {
      const value = 0;
      await User.findOneAndUpdate(
        { guildId: interaction.guild.id, userId: user.id },
        { warns: value }
      );
      let ban = await import(`#commands/ban`);
      await ban.invoke(interaction);
    }
  } catch (e) {
    console.log(e);
  }
};
export { create, invoke };
