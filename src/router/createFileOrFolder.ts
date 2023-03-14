import { TRouterRunFun } from '../type'

const run: TRouterRunFun = (query, conn, callback) => {
    /** 所属文件夹 ID */
    let parent_id = query.parent_id
    /** 文件或文件夹名称 */
    let name = query.name
    /** 是否是文件夹 */
    let is_dir = parseInt((query.is_dir || '') as string)
    if (!parent_id || !name || isNaN(is_dir) || is_dir > 1 || is_dir < 0) return callback({
        code: 0,
        msg: '参数缺失',
        data: null
    })
    let sql = `INSERT INTO "filelist" ("parent_id", "name", "is_dir") VALUES (${parent_id}, "${name}", ${is_dir})`
    conn.run(sql, (error) => {
        if (error) return callback({
            code: 0,
            msg: error.message,
            data: null
        })
        return callback('创建成功')
    })
}

export default run