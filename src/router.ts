import createFileOrFolder from './router/createFileOrFolder'
import getList from './router/getList'
import { TRouterRunFun } from './type'
/** 路由匹配规则，值为文件名或函数名 */
const router: {
    [key: string]: TRouterRunFun | string
} = {
    '/': './html/index.html',
    '/createFileOrFolder': createFileOrFolder,
    '/getList': getList
}
export default router