// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");

export default (req, res) => {

  exec("/etc/init.d/valheim restart", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.status(500);
    }
    if (stderr) {
      res.status(500);

    }
    res.status(200).json({ ouput: stdout })
  });

}
