// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");

export default async (req, res) => {

  let returnvar = {};
   returnvar.servername = process.env.SERVER_NAME;
   returnvar.worldname = process.env.WORLD_NAME;
   returnvar.password = process.env.PASSWORD;
   
    res.status(200).json(returnvar)



}
