const name = 'messageReactionAdd';

async function invoke(reaction, user) {
  const CHANNEL_ID = '673546224179216446'; // Replace with your channel ID
  const EMOJI = '📍'; // Replace with your emoji ID
  if (
    reaction.message.channel.id === CHANNEL_ID &&
    reaction.emoji.name === EMOJI
  ) {
    await reaction.message.pin();
  }
}

export { name, invoke };
