// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");
global.serveroutput;

export default (req, res) => {


  const { spawn } = require('child_process');

  const child = spawn('/home/steam/start_valheim.sh');

  child.stdout.on('data', (data) => {
    global.serveroutput = global.serveroutput + data;

  });

  child.stderr.on('data', (data) => {
    global.serveroutput = global.serveroutput + data;
  });

  child.on('error', (error) => {
    global.serveroutput = global.serveroutput + error;
  });

  child.on('close', (code) => {
    global.serveroutput = global.serveroutput + code;
  });

  res.status(200).json({ result: 'succes' })




}
