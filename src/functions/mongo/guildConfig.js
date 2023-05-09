//create config file when guild config is not created
import Config from '../../schemas/guildConfig.js';
import mongoose from 'mongoose';

export async function config(guild) {
  //get guild data

  let ConfigProfile = await Config.findOne({ guildId: guild.id });
  //if guild config is not created create new one
  if (!ConfigProfile || ConfigProfile === null) {
    ConfigProfile = new Config({
      _id: mongoose.Types.ObjectId(),
      guildId: `${guild.id}`,
    });
    await ConfigProfile.save().catch(console.err);
    console.log(
      `[Database status]: Config for ${guild.name} is created in database`
    );
  } else {
    console.log(
      `[Database status]: Config for ${guild.name} is already created in database`
    );
  }
}
