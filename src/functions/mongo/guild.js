import Guild from '../../schemas/guild.js';
import mongoose from 'mongoose';
//fetch all guilds
export async function allGuilds(guild) {
  //const allGuilds = client.guilds.cache.map((guild) => guild);
  //get all guilds data
  let guildProfile = await Guild.findOne({ guildId: guild.id });
  //if guild is not created create new one
  if (!guildProfile || guildProfile === null) {
    guildProfile = new Guild({
      _id: new mongoose.Types.ObjectId(),
      guildId: `${guild.id}`,
      guildName: `${guild.name}`,
      guildIcon: `${guild.iconURL()}` ? `${guild.iconURL()}` : 'None',
    });
    await guildProfile.save().catch(console.err);
    console.log(
      `[Database status]: Guild ${guild.name} is created in database`
    );
  } else {
    console.log(
      `[Database status]: Guild ${guild.name} is already in database`
    );
  }
}
