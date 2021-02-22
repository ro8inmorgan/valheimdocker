// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");

export default (req, res) => {

    res.status(200).json(exec("/home/steam/steamcmd/steamcmd.sh +login anonymous +force_install_dir /home/steam/valheim +app_update 896660 +quit", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

        }
        if (stderr) {


        }
        return stdout;
    }));

}
