// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");

export default (req, res) => {

  res.status(200).json(exec("pkill --signal SIGINT \"valheim\"", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
     
    }
    if (stderr) {
      

    }
    return stdout;
  }));

}
