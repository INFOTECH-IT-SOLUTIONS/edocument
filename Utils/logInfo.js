// const { verify } = require("jsonwebtoken");

// module.exports.LogInfo = (req) => {
//   const device = req.device.type;
//   const getData = req?.body;
//   getData.TERMINAL_IP = req.ip || req.connection.remoteAddress;
//     const validToken = verify(req.cookies?.token, process.env.JWT_SECRET);
//     const ip = getData.TERMINAL_IP;
//    const employe_id = parseInt(validToken.employe_id);
//     return {
//       device,
//       ip,
//       employe_id
//     };
// };



