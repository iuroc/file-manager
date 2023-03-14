import { TRouterRunFun, TResponse } from '../type'

const run: TRouterRunFun = async (query, conn) => {
    let parent_id = query.parent_id
    let name = query.name
    if (!parent_id || !name) return {
        code: 0,
        msg: '参数缺失',
        data: null
    }
    let sql = `INSERT INTO "filelist" ("parent_id", "name", "is_dir") VALUES (${parent_id}, ${name}, 1)`
    const sqlResult = await new Promise<TResponse | string>((resolve) => {
        conn.run(sql, (error) => {
            if (error) resolve({
                code: 0,
                msg: '数据库操作失败',
                data: null
            })
            else resolve('创建成功')
        })
    })
    return sqlResult
}

export default run