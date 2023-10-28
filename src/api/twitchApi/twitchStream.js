// import twitchEmbed from '../../embeds/twitchStreamStatus.js';
// import { client, twitchApi } from '../../index.js';
// import guildConfig from '../../schemas/guildConfig.js';

// let IsLiveMemory = {};

// const twitchStream = async function Run(guildId) {
//   const config = await guildConfig.findOne({ guildId });
//   const channelId = config.twitchChannel;
//   const twitchUsers = config.twitchUsers;
//   let channel = client.channels.cache.get(channelId);

//   //set name for twitch user
//   // const user = 'szerwa';
//   //get user logo from twitch api
//   for (const user of twitchUsers) {
//     await twitchApi
//       .get('/streams', {
//         params: { user_login: `${user}` },
//       })
//       .then(async (res) => {
//         //get stream data
//         const stream = res.data.data[0];
//         //get user avatar
//         const avatar = await twitchApi
//           .get('/users', {
//             params: { login: `${user}` },
//           })
//           .then((res) => {
//             return res.data.data[0].profile_image_url;
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//         //check live status
//         if (stream !== undefined) {
//           if (stream.type === 'live') {
//             //send message about new live
//             if (
//               IsLiveMemory[user] === false ||
//               IsLiveMemory[user] === undefined
//             ) {
//               //get thumbnaild url with width:1000 and height:500
//               let string = stream.thumbnail_url;
//               string = string.replace('{width}', '1000');
//               const thumbnail = string.replace('{height}', '500');
//               //get when stream started
//               const date = stream.started_at;
//               const hours = new Date(date).getHours();
//               const minutes =
//                 new Date(date).getMinutes() < 10
//                   ? '0'
//                   : '' + new Date(date).getMinutes();
//               if (!channel) {
//                 const guild = client.guilds.cache.get(guildId);
//                 channel = guild.systemChannel;
//               }
//               //send embed
//               channel.send({
//                 embeds: [
//                   await twitchEmbed(stream, avatar, thumbnail, hours, minutes),
//                 ],
//               });
//               IsLiveMemory[user] = true;
//             }
//             //check if message is sent about live
//             else if (IsLiveMemory[user] === true) {
//             } else {
//             }
//           }
//           //if data is defined but it is no live
//           else {
//             if (IsLiveMemory[user] === true) {
//               IsLiveMemory[user] = false;
//             } else {
//             }
//           }
//         }
//         //when data is undifined
//         else {
//           //change live memory value to false if it is true
//           if (IsLiveMemory[user] === true) {
//             IsLiveMemory[user] = false;
//           }
//           //if live memory is false
//           else {
//           }
//         }
//         IsLiveMemory[user] = false;
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
// };
// export default twitchStream;
