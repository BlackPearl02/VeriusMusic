import chalk from 'chalk';

const name = 'error';
const invoke = async (err) => {
  console.log(chalk.rgb(255, 0, 0)('[Distube error]: )' + `\n${err}`));
};
export { invoke, name };
