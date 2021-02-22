// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");
var ps = require('ps-node');

export default async (req, res) => {



    // A simple pid lookup 


    ps.lookup({
        command: 'valheim_server.x86_64',
        psargs: 'ux'
    }, (err, resultList) => {
        if (resultList.length > 0) {
            res.status(200).json({ status: 'running',resultlist:resultList });
        } else {
            res.status(200).json({ status: 'not running' });
        }
    }
    );






}


