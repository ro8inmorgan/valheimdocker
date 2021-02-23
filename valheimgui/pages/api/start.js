// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");
global.serveroutput;

export default async (req, res) => {


  const { spawn } = require('child_process');


  await exec('export SERVER_NAME=\'' +  req.body.servername + '\'; export "WORLD_NAME=\'' +  req.body.worldname + '\'; export "PASSWORD=\'' +  req.body.password + '\';', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
     
    }
    if (stderr) {
      

    }
    return stdout;
  })


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
