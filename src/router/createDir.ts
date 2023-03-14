import { TRouterRunFun } from '../type'

const run: TRouterRunFun = (query, conn, callback) => {
    let parent_id = query.parent_id
    let name = query.name
    if (!parent_id || !name) return callback({
        code: 0,
        msg: '参数缺失',
        data: null
    })
    let sql = `INSERT INTO "filelist" ("parent_id", "name", "is_dir") VALUES (${parent_id}, "${name}", 1)`
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