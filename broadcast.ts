import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import BirthdayBroadcast from './services/BirthdayBroadcast'
import { exitCode } from 'process'
import AnniversaryBroadcast from './services/AnniversaryBroadcast'

let birthday = new BirthdayBroadcast()
birthday.run()

let anniversary = new AnniversaryBroadcast()
anniversary.run()

console.log("Broadcasting Email is running...")

process.stdin.resume()

const exitHandler = (options: any, exitCode: any) => {
  if (options.cleanup) console.log('Exiting the background program.');
  if (exitCode || exitCode === 0) console.log('Exit code:', exitCode);
  if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGTERM', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
