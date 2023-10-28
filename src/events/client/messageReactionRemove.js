const name = 'messageReactionRemove';

async function invoke(reaction, user) {
  const CHANNEL_ID = '673546224179216446'; // Replace with your channel ID
  const EMOJI = '📍'; // Replace with your emoji ID
  if (
    reaction.message.channel.id === CHANNEL_ID &&
    reaction.emoji.name === EMOJI
  ) {
    if (reaction.count === 0) {
      reaction.message.unpin();
    } else {
      return;
    }
  }
}

export { name, invoke };
