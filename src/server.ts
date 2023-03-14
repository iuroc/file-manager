import { createServer, ServerResponse } from 'http'
import { parse as urlParse } from 'url'
import { readFileSync } from 'fs'
import router from './router'
import { Database } from 'sqlite3'
import { TResponse } from './type'

// 创建服务器
createServer((request, response) => {
    /** 解析后的请求 URL 对象 */
    const url = urlParse(request.url || '/', true)
    /** 路由标识 */
    let pathname = url.pathname || '/'
    /** URL 参数 */
    const query = url.query
    /** 数据库连接 */
    const conn = new Database('file.db', (error) => {
        if (error) console.log(error)
    })
    initTable(conn, () => {
        /** 路由执行函数或文件名 */
        const fun = router[pathname]
        // 路由匹配成功
        if (typeof fun == 'string') {
            const data = readFileSync(fun).toString()
            setResponse(data, response, conn)
        } else if (typeof fun == 'function') {
            fun(query, conn, (data: TResponse) => {
                setResponse(data, response, conn)
            })
        } else {
            // 路由不匹配
            setResponse('路由错误', response, conn)
        }
        /** 设置响应 */
        function setResponse(data: TResponse, response: ServerResponse, conn: Database) {
            let responseData = ''
            // 根据相应内容的数据类型设置响应头，并将响应内容转换成字符串
            if (typeof data == 'string') {
                // 数据类型为字符串，则设置内容类型为 text/html
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                responseData = data
            } else {
                // 数据类型为非字符串，则输出 JSON 字符串，内容类型为 application/json
                response.setHeader('Content-Type', 'application/json; charset=utf-8')
                responseData = JSON.stringify(data)
            }
            // 关闭数据库连接
            conn.close()
            // 发送响应内容
            response.end(responseData)
        }
    })
}).listen(8000)
console.log(`服务器正在运行 👉 http://127.0.0.1:8000`)

/**
 * 初始化数据表
 * @param conn 数据库连接
 */
function initTable(conn: Database, callback: () => void) {
    conn.run(`CREATE TABLE IF NOT EXISTS "filelist" (
        "id" INTEGER NOT NULL,
        "parent_id" INT NOT NULL,
        "name" TEXT NOT NULL,
        "is_dir" INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        UNIQUE("parent_id", "name", "is_dir")
    )`, (error) => {
        if (error) console.log(error)
        callback()
    })
}