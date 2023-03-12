import { ParsedUrlQuery } from 'querystring'
import createDir from './router/createDir'
import getList from './router/getList'
import IResponse from './IResponse'
/** 路由匹配规则，值为文件名或函数名 */
const router: {
    [key: string]: ((query: ParsedUrlQuery) => IResponse | string) | string
} = {
    '/': './html/index.html',
    '/createDir': createDir,
    '/getList': getList
}
export default router