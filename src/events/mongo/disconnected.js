import chalk from 'chalk';
const once = true;
const name = 'disconnected';
const invoke = async () => {
  console.log(
    chalk.rgb(239, 17, 17)('[Database status]: ') + 'Disonnected from database'
  );
};
export { invoke, name, once };
