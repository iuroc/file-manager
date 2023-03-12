import { ParsedUrlQuery } from 'querystring'
import IResponse from '../IResponse'

/** 主页 */
function run(query: ParsedUrlQuery): IResponse {
    return {
        code: 200,
        msg: '主页',
        data: null
    }
}
export default run