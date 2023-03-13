import { ParsedUrlQuery } from 'querystring'
import createDir from './router/createDir'
import getList from './router/getList'
import IResponse from './IResponse'
import { Database } from 'sqlite3'
/** 路由匹配规则，值为文件名或函数名 */
const router: {
    [key: string]: TRouterRunFun | string
} = {
    '/': './html/index.html',
    '/createDir': createDir,
    '/getList': getList
}
export default router


export type TRouterRunFun = (
    /** URL 参数 */
    query: ParsedUrlQuery,
    /** 数据库连接 */
    conn: Database
) => IResponse | string