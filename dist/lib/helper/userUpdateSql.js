"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUpdateSqlUser = generateUpdateSqlUser;
async function generateUpdateSqlUser(request, tablename, user_id) {
    try {
        const keys = Object.keys(request);
        const tvalues = Object.values(request);
        let str = '';
        for (let i of keys) {
            str += `${i}=?,`;
        }
        const newstr = str.slice(0, str.length - 1);
        const sql = `UPDATE ${tablename} SET ${newstr} WHERE user_id=?`;
        const values = [...tvalues, user_id];
        return { sql, values };
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=userUpdateSql.js.map