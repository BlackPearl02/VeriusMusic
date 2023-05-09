import chalk from 'chalk';

const name = 'connecting';
const invoke = async () => {
  console.log(
    chalk.rgb(239, 239, 17)('[Database status]: ') + 'Connecting to database'
  );
};
export { invoke, name };
