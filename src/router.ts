import { ParsedUrlQuery } from 'querystring'
import index from './router/index'
import createDir from './router/createDir'
import getList from './router/getList'
import IResponse from './IResponse'
// 设置路由
const router: {
    [key: string]: (query: ParsedUrlQuery) => IResponse | string
} = {
    '/': index,
    '/createDir': createDir,
    '/getList': getList
}
export default router