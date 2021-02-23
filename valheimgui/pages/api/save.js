// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");
export default function handler(req, res) {
  process.env.SERVER_NAME = req.body.servername;
    
  process.env.WORLD_NAME = req.body.worldname;

  process.env.PASSWORD = req.body.password;
    


  exec('echo "" > .env.local; echo "SERVER_NAME=\'' +  req.body.servername + '\'" >> .env.local; echo "WORLD_NAME=\'' +  req.body.worldname + '\'" >> .env.local; echo "PASSWORD=\'' +  req.body.password + '\'" >> .env.local;', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
     
    }
    if (stderr) {
      

    }
    return stdout;
  })

    res.status(200).json({ result: 'succes' })
  }
