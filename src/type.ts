import { ParsedUrlQuery } from 'querystring'
import { Database } from 'sqlite3'

/** HTTP 响应 */
export type TResponse = {
    /** 响应码 */
    code: number,
    /** 响应提示 */
    msg: string,
    /** 响应数据 */
    data: any
}

/** 路由响应函数 */
export type TRouterRunFun = (
    /** URL 参数 */
    query: ParsedUrlQuery,
    /** 数据库连接 */
    conn: Database
) => Promise<TResponse | string>