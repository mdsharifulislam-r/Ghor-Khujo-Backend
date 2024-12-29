"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUpdateSql = generateUpdateSql;
async function generateUpdateSql(request, tablename, house_id) {
    try {
        const keys = Object.keys(request);
        const tvalues = Object.values(request);
        let str = '';
        for (let i of keys) {
            str += `${i}=?,`;
        }
        const newstr = str.slice(0, str.length - 1);
        const sql = `UPDATE ${tablename} SET ${newstr} WHERE house_id=?`;
        const values = [...tvalues, house_id];
        return { sql, values };
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=updateSqlGenerate.js.map