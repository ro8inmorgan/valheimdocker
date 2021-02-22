// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");
export default function handler(req, res) {
  process.env.SERVER_NAME = req.body.servername;
    
  process.env.WORLD_NAME = req.body.worldname;

  process.env.PASSWORD = req.body.password;
    


  exec("echo export SERVER_NAME = " +  req.body.servername + " > ~/.bash_profile; echo export WORLD_NAME = " +  req.body.worldname + " > ~/.bash_profile; echo export PASSWORD = " +  req.body.password + " ~/.bash_profile;", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
     
    }
    if (stderr) {
      

    }
    return stdout;
  })

    res.status(200).json({ result: 'succes' })
  }
