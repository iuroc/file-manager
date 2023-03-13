import { createServer } from 'http'
import { parse as urlParse } from 'url'
import { readFileSync } from 'fs'
import router from './router'
import { Database } from 'sqlite3'
// 创建服务器
createServer((request, response) => {
    // 解析请求 URL
    const url = urlParse(request.url || '/', true)
    // 获取 path 路由
    let pathname = url.pathname || '/'
    // 获取 URL 参数
    const query = url.query
    // 获取数据库连接
    const conn = new Database('file.db', (error) => {
        if (error) console.log(error)
    })
    initTable(conn)
    // 设置响应内容
    const responseData = (() => {
        // 获取路由对应的模块函数
        const fun = router[pathname]
        // 获取响应内容
        const data = (() => {
            // 路由匹配成功
            if (typeof fun == 'string') return readFileSync(fun).toString()
            if (typeof fun == 'function') return fun(query, conn)
            // 路由不匹配
            return '路由错误'
        })()
        // 根据相应内容的数据类型设置响应头，并将响应内容转换成字符串
        if (typeof data == 'string') {
            // 数据类型为字符串，则设置内容类型为 text/html
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            return data
        } else {
            // 数据类型为非字符串，则输出 JSON 字符串，内容类型为 application/json
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            return JSON.stringify(data)
        }
    })()
    // 关闭数据库连接
    conn.close()
    // 发送响应内容
    response.end(responseData)
}).listen(8000)
console.log(`服务器正在运行 👉 http://127.0.0.1:8000`)

/**
 * 初始化数据表
 * @param conn 数据库连接
 */
function initTable(conn: Database) {
    conn.run(`CREATE TABLE IF NOT EXISTS 'filelist' (
        'id' INT NOT NULL,
        'parent_id' INT NOT NULL,
        'name' TEXT NOT NULL
    )`, (error) => {
        if (error) console.log(error)
    })
}