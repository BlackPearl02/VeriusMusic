export async function del(msg) {
  setTimeout(() => msg.delete(), 10000);
}
export async function reply(interaction) {
  await interaction.reply('.');
  interaction.deleteReply();
}
