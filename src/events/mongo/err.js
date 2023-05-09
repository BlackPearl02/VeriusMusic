import chalk from 'chalk';

const name = 'err';
const invoke = async () => {
  console.log(chalk.rgb(255, 255, 255)('[Database error]: ' + `\n${err}`));
};
export { invoke, name };
