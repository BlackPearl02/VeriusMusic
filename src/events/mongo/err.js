import chalk from 'chalk';
import ServerSelectionError from '../../../node_modules/mongoose/lib/error/serverSelection.js';
const name = 'error';
const invoke = async (err) => {
  if (err?.name === 'MongoServerSelectionError') {
    const originalError = err;
    err = new ServerSelectionError();
    err.assimilateError(originalError);
  }
  console.log(chalk.rgb(255, 0, 0)('[Database error]: ') + err);
  let error;
  if ((err = 'MongooseServerSelectionError')) {
    error = 'Connection error';
  }
};
export { invoke, name };
