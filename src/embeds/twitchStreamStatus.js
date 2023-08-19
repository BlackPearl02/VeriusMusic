import { EmbedBuilder } from 'discord.js';
//embed
const twitchEmbed = async (stream, avatar, thumbnail, hours, minutes) => {
  return new EmbedBuilder()
    .setColor(0x6441a5)
    .setURL(`http://twitch.tv/` + `${stream.user_name.toLowerCase()}`)
    .setAuthor({
      name: `${stream.title}`,
      url: `http://twitch.tv/` + `${stream.user_name.toLowerCase()}`,
    })
    .setDescription(`${stream.user_name} streamuje ${stream.game_name}`)
    .setThumbnail(avatar)
    .setImage(thumbnail)
    .setFooter({
      text: `Stream zaczął się o ${hours}:${minutes}`,
      iconURL:
        'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/twitch-512.png',
    });
};
export default twitchEmbed;
