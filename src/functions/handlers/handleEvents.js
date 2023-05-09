import fs from 'fs';
import { mongoose } from 'mongoose';
export async function handleEvents(client) {
  // Fetch all js files in ./events
  // const events = fs
  //   .readdirSync('./src/events')
  //   .filter((file) => file.endsWith('.js'));
  // console.log(events);
  const eventFolders = fs
    .readdirSync('./src/events', {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());
  for (let folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./src/events/${folder.name}`);

    // Check for an event and execute the corresponding file in ./events
    switch (folder.name) {
      case 'client':
        for (const file of eventFiles) {
          const event = await import(`../../events/${folder.name}/${file}`);
          if (event.once)
            client.once(event.name, (...args) => {
              event.invoke(...args);
            });
          else
            client.on(event.name, (...args) => {
              event.invoke(...args);
            });
        }
        break;
      case 'mongo':
        for (const file of eventFiles) {
          const event = await import(`../../events/${folder.name}/${file}`);
          if (event.once) {
            mongoose.connection.on(event.name, (...args) => {
              event.invoke(...args);
            });
          } else {
            mongoose.connection.on(event.name, (...args) => {
              event.invoke(...args);
            });
          }
        }
        break;
      case 'distube':
        for (const file of eventFiles) {
          const event = await import(`../../events/${folder.name}/${file}`);
          if (event.once) {
            client.distube.on(event.name, (...args) => {
              event.invoke(...args);
            });
          } else {
            client.distube.on(event.name, (...args) => {
              event.invoke(...args);
            });
          }
        }
        break;
    }
  }
}
