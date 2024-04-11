import chalk from 'chalk';

const once = true;
const name = 'connected';
async function invoke() {
  console.log(
    chalk.rgb(32, 239, 17)('[Database status]: ') + 'Connected to database'
  );
}
export { invoke, name, once };
