const db = require("../Config/db");
const bcrypt = require("bcryptjs");
const { Execute, ExecuteBind } = require("../Utils/dynamicController");

// get method
module.exports.getDepartmentData = () => {
  return Execute(`SELECT * FROM HRM_DEPARTMENT_INFO ORDER BY DEPT_ID DESC`);
};
module.exports.getDesignationData = () => {
  return Execute(`SELECT * FROM HRM_DESIGNATION_INFO ORDER BY DESIG_ID DESC`);
};
module.exports.getDocumentTypeData = () => {
  return Execute(`SELECT * FROM DOA_DOCUMENT_TYPE ORDER BY DOC_NO DESC`);
};
module.exports.getDeshboardDataData = () => {
  return Execute(`SELECT * FROM VW_DASHBOARD_DETAILS`);
};
module.exports.getUserDeshboardData = (id) => {
  return Execute(
    `SELECT * FROM VW_USER_DASHBOARD_DETAILS WHERE USRE_ID=${parseInt(id)}`
  );
};
module.exports.getDeshboardDepPie = () => {
  return Execute(`SELECT * FROM VW_DEPARTMENT_WISE_FILES `);
};
module.exports.getDeshboardUserDepPie = (id) => {
  return Execute(
    `SELECT * FROM VW_DEPARTMENT_WISE_FILES WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getDeshboardCatGraph = () => {
  return Execute(`SELECT * FROM VW_CATEGORY_WISE_FILES  `);
};
module.exports.getDeshboardUserCatGraph = (id) => {
  return Execute(
    `SELECT * FROM VW_CATEGORY_WISE_FILES WHERE USER_ID=${parseInt(id)} `
  );
};
module.exports.getDeshboardRecentData = () => {
  return Execute(`SELECT * FROM VW_RECENTLY_ADDED_DOCUMENTS`);
};
module.exports.getUserDeshboardRecentData = (id) => {
  return Execute(
    `SELECT * FROM VW_RECENTLY_ADDED_DOCUMENTS WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getDeshboardMostViewData = () => {
  return Execute(`SELECT * FROM VW_MOSTLY_VIEWED_DOCUMENT `);
};
module.exports.getUserDeshboardMostViewData = (id) => {
  return Execute(
    `SELECT * FROM VW_MOSTLY_VIEWED_DOCUMENT WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getDeshboardDownloadData = () => {
  return Execute(`SELECT * FROM VW_MOSTLY_DOWNLOADED_DOCUMENT`);
};
module.exports.getUserDeshboardDownloadData = (id) => {
  return Execute(
    `SELECT * FROM VW_MOSTLY_DOWNLOADED_DOCUMENT WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getUserDeshboardDownloadData = (id) => {
  return Execute(
    `SELECT * FROM VW_MOSTLY_DOWNLOADED_DOCUMENT  WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getModuleInfoData = () => {
  return Execute(`SELECT * FROM USR_MODULE_MST ORDER BY MODULE_MST_ID DESC`);
};
module.exports.getAllDocData = () => {
  return Execute(`SELECT * FROM VW_ALL_DOCUMENTS`);
};
module.exports.getSubModuleInfoData = (id) => {
  return Execute(
    `SELECT * FROM USR_MODULE_DTL WHERE MODULE_MST_ID=${parseInt(id)}`
  );
};
module.exports.getAddDocumentData = (user_type, user_id) => {
  if (user_type == "ADMIN") {
    return Execute(
      `SELECT * FROM VW_DOA_FILE_DETAILS  ORDER BY TRAN_MST_ID DESC`
    );
  } else {
    return Execute(
      `SELECT * FROM VW_DOA_FILE_DETAILS WHERE USER_ID= ${user_id}  ORDER BY TRAN_MST_ID DESC`
    );
  }
};
module.exports.getAllDocumentData = () => {
  return Execute(
    `SELECT * FROM VW_DOA_FILE_DETAILS  ORDER BY TRAN_MST_ID DESC`
  );
};
module.exports.getProjectDocData = (id) => {
  return Execute(
    `SELECT * FROM VW_DOA_FILE_DETAILS WHERE PROJECT_CODE=${parseInt(id)}`
  );
};
module.exports.getRoleAccessData = () => {
  return Execute(`SELECT * FROM USR_ROLE_MASTER ORDER BY ROLE_ID DESC`);
};
module.exports.getRoleAccessViewByIdData = (id) => {
  return Execute(`SELECT * FROM USR_ROLE_MASTER WHERE ROLE_ID=${parseInt(id)}`);
};
module.exports.getRoleAccessViewByIdDetails = (id) => {
  // console.log(id);
  return Execute(
    `SELECT * FROM VW_USER_MODULE_ACCESS WHERE ROLE_ID in (
${id}
)`
  );
};
module.exports.getBranchDocData = (id) => {
  return Execute(
    `SELECT * FROM VW_DOA_FILE_DETAILS WHERE BRANCH_ID=${parseInt(id)}`
  );
};
module.exports.getDepartmentDocData = (id) => {
  return Execute(
    `SELECT * FROM VW_DOA_FILE_DETAILS WHERE DEPT_ID=${parseInt(id)}`
  );
};
module.exports.getUserDocData = (id) => {
  return Execute(
    `SELECT * FROM VW_DOA_FILE_DETAILS WHERE USER_ID=${parseInt(id)}`
  );
};
module.exports.getProjectData = () => {
  return Execute(`SELECT * FROM HRM_PROJECT_INFO ORDER BY PROJECT_CODE DESC`);
};
module.exports.getBranchData = () => {
  return Execute(`SELECT * FROM HRM_BRANCH_INFO ORDER BY BRANCH_ID DESC`);
};
module.exports.getCompanyInfoData = () => {
  return Execute(`SELECT * FROM HRM_COMPANY_INFO ORDER BY COM_ID DESC`);
};

module.exports.getEmployeeData = () => {
  return Execute(`SELECT * FROM HRM_EMPLOYEE_INFO EMP
LEFT OUTER JOIN HRM_DEPARTMENT_INFO DEPT
ON EMP.DEPT_ID = DEPT.DEPT_ID
LEFT OUTER JOIN HRM_DESIGNATION_INFO DEG
ON EMP.DESIG_ID = DEG.DESIG_ID`);
};
module.exports.getUserCreationData = () => {
  return Execute(`SELECT 
  UI.*, 
  EMP.* 
FROM USR_USERS_INFO UI
LEFT OUTER JOIN HRM_EMPLOYEE_INFO EMP
ON UI.EMPLOYEE_ID = EMP.EMPLOYEE_ID 
ORDER BY UI.ID DESC
`);
};
module.exports.getEmployeeByIdData = (id) => {
  return Execute(`SELECT * FROM HRM_EMPLOYEE_INFO EMP
LEFT OUTER JOIN HRM_DEPARTMENT_INFO DEPT
ON EMP.DEPT_ID = DEPT.DEPT_ID
LEFT OUTER JOIN HRM_DESIGNATION_INFO DEG
ON EMP.DESIG_ID = DEG.DESIG_ID
LEFT OUTER JOIN HRM_COMPANY_INFO CI
ON EMP.COM_ID = CI.COM_ID
WHERE EMP.EMPLOYEE_ID = ${id}`);
};

// post method
module.exports.postloginCheckdata = (data) => {
  return Execute(`SELECT * FROM USR_USERS_INFO WHERE EMAIL='${data}'`);
};
module.exports.getUserDatabyId = (id) => {
  return Execute(`SELECT * FROM USR_USERS_INFO WHERE EMAIL='${id}'`);
};

module.exports.postUserCreationdata = async (data) => {
  const hashedPassword = await bcrypt.hash(data.PASSWORD, 10);

  return Execute(
    `INSERT INTO USR_USERS_INFO (NAME,EMAIL,PASSWORD,PHONE_NUMBER,USER_STATUS,USER_TYPE,EMPLOYEE_ID,ROLES) VALUES ('${data.NAME}','${data.EMAIL}','${hashedPassword}','${data.PHONE_NUMBER}','${data.USER_STATUS}','${data.USER_TYPE}',${data.EMPLOYEE_ID},'${data.ROLES}')`
  );
};
module.exports.postDepartmentData = async (data) => {
  return Execute(
    `INSERT INTO HRM_DEPARTMENT_INFO (DEPT_NAME) VALUES ('${data.DEPT_NAME}')`
  );
};
module.exports.postDesignationData = async (data) => {
  return Execute(
    `INSERT INTO HRM_DESIGNATION_INFO (DESIG_NAME) VALUES ('${data.DESIG_NAME}')`
  );
};
module.exports.postDocumentTypeData = async (data) => {
  return Execute(
    `INSERT INTO DOA_DOCUMENT_TYPE (DOC_TYPE) VALUES ('${data.DOC_TYPE}')`
  );
};
module.exports.postChangePasswordTable = async (
  email,
  hashedPassword,
  employeeId,
  oldpassword
) => {
  return Execute(
    `INSERT INTO USR_CHANGE_PASSWORD (USER_NAME,OLD_PASSWORD,NEW_PASSWORD,USER_ID) VALUES ('${email}','${oldpassword}','${hashedPassword}',${parseInt(
      employeeId
    )})`
  );
};
module.exports.postlogAudit = async (
  employeeId,
  username,
  token,
  ip,
  browser,
  platform,
  device
) => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; // YYYY-MM-DD
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`; // HH:mm:ss

  const dateTime = `${formattedDate} ${formattedTime}`;

  return Execute(
    `INSERT INTO USR_AUDIT_TRAIL (USER_NAME,ACCESS_TIME,USER_ID,DEVICE_TYPE,IP_ADDRESS,BROWSER_INFO,LOG_SESSION,PLATFORM)
     VALUES ('${username}',TO_DATE('${dateTime}', 'YYYY-MM-DD HH24:MI:SS'),${employeeId},'${device}','${ip}','${browser}','${token}','${platform}')`
  );
};
module.exports.putlogoutSessionData = async (data) => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; // YYYY-MM-DD
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`; // HH:mm:ss
  const dateTime = `${formattedDate} ${formattedTime}`;

  return Execute(
    `UPDATE USR_AUDIT_TRAIL SET EXIT_TIME = TO_DATE('${dateTime}', 'YYYY-MM-DD HH24:MI:SS') WHERE LOG_SESSION = '${data.LOG_SESSION}'`
  );
};
module.exports.postProjectData = async (data) => {
  return Execute(
    `INSERT INTO HRM_PROJECT_INFO (PROJECT_NAME) VALUES ('${data.PROJECT_NAME}')`
  );
};
module.exports.postBranchData = async (data) => {
  return Execute(
    `INSERT INTO HRM_BRANCH_INFO (BRANCH_NAME) VALUES ('${data.BRANCH_NAME}')`
  );
};
module.exports.postTotalViewDownloadCountData = async (data) => {
  return Execute(
    `INSERT INTO DOA_DASHBOARD_VIEW (FILE_ID,FILE_NAME,VIEW_YN,DOWNLOAD_YN) VALUES (${data.FILE_ID},'${data.FILE_NAME}','${data.VIEW_YN}','${data.DOWNLOAD_YN}')`
  );
};
module.exports.postCompanyInfoData = async (data, file) => {
  return Execute(
    `INSERT INTO HRM_COMPANY_INFO (COMP_ADD,COMP_ADD2,COMP_EMAIL,COMP_NAME,COMP_PHONE,COMP_WEB,FAX,LOGO) VALUES ('${data.COMP_ADD}','${data.COMP_ADD2}','${data.COMP_EMAIL}','${data.COMP_NAME}','${data.COMP_PHONE}','${data.COMP_WEB}','${data.FAX}','${file}')`
  );
};
module.exports.postAddDocumentData = async (data, logInfo) => {
  console.log(data, logInfo);

  const sql = `
    INSERT INTO DOA_FILE_MASTER 
    (PROJECT_CODE, BRANCH_ID, POLICY_NO, FILE_NAME, DOC_TYPE, DEPT_ID, USER_ID, TERMINAL_NAME, TERMINAL_IP) 
    VALUES (:projectCode, :branchId, :policyNo, :fileName, :docType, :deptId, :employeeId, :device, :ip) 
    RETURNING TRAN_MST_ID INTO :id
  `;

  const binds = {
    projectCode: data.PROJECT_CODE ? parseInt(data.PROJECT_CODE) : null, // Convert to number or assign null
    branchId: data.BRANCH_ID ? parseInt(data.BRANCH_ID) : null, // Convert to number or assign null
    policyNo: data.POLICY_NO || "", // Default to an empty string if undefined
    fileName: data.FILE_NAME || "", // Default to an empty string if undefined
    docType: data.DOC_TYPE ? parseInt(data.DOC_TYPE) : null, // Convert to number or assign null
    deptId: data.DEPT_ID ? parseInt(data.DEPT_ID) : null, // Convert to number or assign null
    employeeId: data.employe_id ? parseInt(data.employe_id) : null, // Convert to number or assign null
    device: logInfo.device || "", // Default to an empty string if undefined
    ip: logInfo.ip || "", // Default to an empty string if undefined
    id: { type: db.oracledb.NUMBER, dir: db.oracledb.BIND_OUT }, // Output bind
  };

  return ExecuteBind(sql, binds);
};
module.exports.postRoleAccessCreateData = async (data) => {
  // console.log(data);
  const sql = `
    INSERT INTO USR_ROLE_MASTER 
    (ROLE_NAME,ROLE_DESC,USER_ID) 
    VALUES (:ROLE_NAME, :ROLE_DESC, :USER_ID) 
    RETURNING ROLE_ID INTO :id
  `;

  const binds = {
    ROLE_NAME: data.ROLE_NAME,
    ROLE_DESC: data.ROLE_DESC,

    USER_ID: parseInt(data.USER_ID),
    id: { type: db.oracledb.NUMBER, dir: db.oracledb.BIND_OUT }, // Output bind
  };

  return ExecuteBind(sql, binds);
};

module.exports.postAddDocumentDataDetails = async (
  data,
  id,
  file,
  type,
  name
) => {
  // console.log(data, id, file, name);
  return Execute(
    `INSERT INTO DOA_FILE_DETAILS (TRAN_MST_ID,FILE_PATH,ACCESSIBILITY,FILE_NAME,FILE_TYPE) VALUES ('${parseInt(
      id
    )}','${file}','${data}','${name}','${type}')`
  );
};

module.exports.postRoleAccessCreateDataDetails = async (data, roleid) => {
  const results = [];

  for (const record of data) {
    const statement = `
     INSERT INTO USR_ROLE_DETAIL (ROLE_ID,MODULE_DTL_ID,VISIBLE_FLAG,WRITE_FLAG,EDIT_FLAG,READ_FLAG) VALUES (
        ${parseInt(roleid)}, ${parseInt(record.MODULE_DTL_ID)}, '${
      record.VISIBLE_FLAG
    }','${record.WRITE_FLAG}','${record.EDIT_FLAG}','${record.READ_FLAG}')
    `;

    try {
      const result = await Execute(statement);
      results.push({ record, result });
    } catch (err) {
      if (err.errorNum === 1) {
        // ORA-00001: unique constraint violated
        console.log(
          `Record with MODULE_DTL_ID ${record.MODULE_DTL_ID} already exists. Skipping...`
        );
        results.push({ record, error: "Unique constraint violated" });
      } else {
        throw err;
      }
    }
  }

  // return results;
};
module.exports.postRoleAccessUpdateDataDetails = async (data, roleid) => {
  const results = [];

  for (const record of data) {
    const statement = `
     INSERT INTO USR_ROLE_DETAIL (ROLE_ID,MODULE_DTL_ID,VISIBLE_FLAG,WRITE_FLAG,EDIT_FLAG,READ_FLAG) VALUES (
        ${parseInt(roleid)}, ${parseInt(record.MODULE_DTL_ID)}, '${
      record.VISIBLE_FLAG
    }','${record.WRITE_FLAG}','${record.EDIT_FLAG}','${record.READ_FLAG}')
    `;

    try {
      const result = await Execute(statement);
      results.push({ record, result });
    } catch (err) {
      if (err.errorNum === 1) {
        // ORA-00001: unique constraint violated
        console.log(
          `Record with MODULE_DTL_ID ${record.MODULE_DTL_ID} already exists. Skipping...`
        );
        results.push({ record, error: "Unique constraint violated" });
      } else {
        throw err;
      }
    }
  }
  // return results;
};

module.exports.postEmployeeData = async (data, path) => {
  return Execute(
    `INSERT INTO HRM_EMPLOYEE_INFO ( CARD_NO,
    EMP_NAME,
    FATHER_NAME,
    MOTHER_NAME,
    PERMANENT_ADDRESS,
    SEX,
    JOINING_DATE,
    MOBILE,
    EMAIL,
    BLOOD_GROUP,
    PASSPORT_NO,
    PRESENT_ADDRESS,
    RELIGION,
    DATE_OF_BIRTH,
    CONFIRMATION_DATE,
    DESIG_ID,
    DEPT_ID,PHOTO,COM_ID,EMP_STATUS,MARITAL_STATUE) VALUES ('${
      data.CARD_NO
    }','${data.EMP_NAME}','${data.FATHER_NAME}','${data.MOTHER_NAME}','${
      data.PERMANENT_ADDRESS
    }','${data.SEX}',TO_DATE('${data.JOINING_DATE}', 'YYYY-MM-DD'),'${
      data.MOBILE
    }','${data.EMAIL}','${data.BLOOD_GROUP}','${data.PASSPORT_NO}','${
      data.PRESENT_ADDRESS
    }','${data.RELIGION}',TO_DATE('${
      data.DATE_OF_BIRTH
    }', 'YYYY-MM-DD'),TO_DATE('${
      data.CONFIRMATION_DATE
    }', 'YYYY-MM-DD'),${parseInt(data.DESIG_ID)},${parseInt(
      data.DEPT_ID
    )},'${path}',${parseInt(data.COM_ID)},'${data.EMP_STATUS}','${
      data.MARITAL_STATUE
    }')`
  );
};
module.exports.putDepartmentData = async (data) => {
  return Execute(
    `UPDATE HRM_DEPARTMENT_INFO SET DEPT_NAME = '${data.DEPT_NAME}' WHERE DEPT_ID = ${data.DEPT_ID}`
  );
};
module.exports.putUserCreationData = async (data) => {
  return Execute(
    `UPDATE USR_USERS_INFO SET EMAIL = '${data.EMAIL}',USER_STATUS = '${data.USER_STATUS}',USER_TYPE = '${data.USER_TYPE}',ROLES = '${data.ROLES}' WHERE ID = '${data.ID}'`
  );
};
module.exports.putRoleAccessUpdateData = async (data) => {
  return Execute(
    `UPDATE USR_ROLE_MASTER SET ROLE_NAME = '${data.ROLE_NAME}',ROLE_DESC = '${data.ROLE_DESC}',USER_ID = '${data.USER_ID}' WHERE ROLE_ID = '${data.ROLE_ID}'`
  );
};
module.exports.putDesignationData = async (data) => {
  return Execute(
    `UPDATE HRM_DESIGNATION_INFO SET DESIG_NAME = '${data.DESIG_NAME}' WHERE DESIG_ID = ${data.DESIG_ID}`
  );
};
module.exports.putDocumentTypeData = async (data) => {
  return Execute(
    `UPDATE DOA_DOCUMENT_TYPE SET DOC_TYPE = '${data.DOC_TYPE}' WHERE DOC_NO = ${data.DOC_NO}`
  );
};
module.exports.putAddDocumentData = async (data) => {
  return Execute(
    `UPDATE DOA_FILE_MASTER SET DOC_TYPE = '${data.DOC_TYPE}',PROJECT_CODE = '${data.PROJECT_CODE}',BRANCH_ID = '${data.BRANCH_ID}',POLICY_NO = '${data.POLICY_NO}',FILE_NAME = '${data.FILE_NAME}',DEPT_ID = '${data.DEPT_ID}' WHERE TRAN_MST_ID = ${data.TRAN_MST_ID}`
  );
};
module.exports.putAddDocumentDetailsFileData = async (id, file, type, data) => {
  return Execute(
    `UPDATE DOA_FILE_DETAILS SET FILE_PATH = '${file}',FILE_NAME = '${data}',FILE_TYPE='${type}' WHERE TRAN_DTL_ID = ${parseInt(
      id
    )}`
  );
};
module.exports.putProjectData = async (data) => {
  return Execute(
    `UPDATE HRM_PROJECT_INFO SET PROJECT_NAME = '${data.PROJECT_NAME}' WHERE PROJECT_CODE = ${data.PROJECT_CODE}`
  );
};
module.exports.putBranchData = async (data) => {
  return Execute(
    `UPDATE HRM_BRANCH_INFO SET BRANCH_NAME = '${data.BRANCH_NAME}' WHERE BRANCH_ID = ${data.BRANCH_ID}`
  );
};
module.exports.putChangePasswordData = async (id, password) => {
  // console.log(id, password);
  return Execute(
    `UPDATE USR_USERS_INFO SET PASSWORD = '${password}' WHERE EMAIL = '${id}'`
  );
};
module.exports.putCompanyInfoData = async (data, file) => {
  // console.log(data, file);

  return Execute(
    `UPDATE HRM_COMPANY_INFO SET COMP_NAME = '${data.COMP_NAME}',SHORT_NAME = '${data.SHORT_NAME}',COMP_ADD = '${data.COMP_ADD}',COMP_PHONE = '${data.COMP_PHONE}',COMP_EMAIL = '${data.COMP_EMAIL}',COMP_WEB = '${data.COMP_WEB}',FAX = '${data.FAX}',COMP_ADD2 = '${data.COMP_ADD2}',LOGO='${file}' WHERE COM_ID = ${data.COM_ID}`
  );
};
module.exports.putCompanyInfowithoutFileData = async (data) => {
  return Execute(
    `UPDATE HRM_COMPANY_INFO SET COMP_NAME = '${data.COMP_NAME}', SHORT_NAME = '${data.SHORT_NAME}',COMP_ADD = '${data.COMP_ADD}',COMP_PHONE = '${data.COMP_PHONE}',COMP_EMAIL = '${data.COMP_EMAIL}',COMP_WEB = '${data.COMP_WEB}',FAX = '${data.FAX}',COMP_ADD2 = '${data.COMP_ADD2}' WHERE COM_ID = ${data.COM_ID}`
  );
};

module.exports.putEmployeeData = async (data) => {
  return Execute(
    `UPDATE HRM_EMPLOYEE_INFO SET CARD_NO ='${data.CARD_NO}',
    EMP_NAME='${data.EMP_NAME}',
    FATHER_NAME='${data.FATHER_NAME}',
    MOTHER_NAME='${data.MOTHER_NAME}',
    EMP_STATUS='${data.EMP_STATUS}',
    PERMANENT_ADDRESS='${data.PERMANENT_ADDRESS}',
    SEX='${data.SEX}',
    JOINING_DATE= TO_DATE('${data.JOINING_DATE}', 'YYYY-MM-DD'),
    MOBILE='${data.MOBILE}',
    EMAIL='${data.EMAIL}',
    BLOOD_GROUP='${data.BLOOD_GROUP}',
    PASSPORT_NO='${data.PASSPORT_NO}',
    PRESENT_ADDRESS='${data.PRESENT_ADDRESS}',
    RELIGION='${data.RELIGION}',
    DATE_OF_BIRTH= TO_DATE('${data.DATE_OF_BIRTH}', 'YYYY-MM-DD'),
    CONFIRMATION_DATE= TO_DATE('${data.CONFIRMATION_DATE}', 'YYYY-MM-DD'),
    DESIG_ID='${data.DESIG_ID}',
    DEPT_ID='${data.DEPT_ID}',PHOTO='${data.PHOTO}' WHERE EMPLOYEE_ID = ${data.EMPLOYEE_ID}`
  );
};

module.exports.deleteRoleAccessUpdateData = (role_ID) =>
  Execute(`DELETE FROM USR_ROLE_DETAIL WHERE ROLE_ID = ${role_ID}`);
