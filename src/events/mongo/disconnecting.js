import chalk from 'chalk';

const name = 'disconnected';
const invoke = async () => {
  console.log(
    chalk.rgb(239, 143, 17)('[Database status]: ') +
      'Disonnecting from database'
  );
};
export { invoke, name };
