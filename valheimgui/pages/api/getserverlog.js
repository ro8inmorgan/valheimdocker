
global.serveroutput;

export default async (req, res) => {



    res.status(200).json({ serverlog: global.serveroutput})


}


