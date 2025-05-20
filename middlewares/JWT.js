const { sign, verify } = require("jsonwebtoken");

module.exports.createTokens = (id, email, type, userid, role) => {
  const accessToken = sign(
    {
      employee_id: id,
      email: email,
      role: role,
      user_type: type,
      user_id: parseInt(userid),
    },
    "f56793a0dc7382d04dfa7c171ab37712bf949577c58c648d799b9d866d4ecee6",
    {
      expiresIn: "8hr",
    }
  );
  return accessToken;
};
