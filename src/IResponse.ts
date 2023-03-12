/** HTTP 响应 */
interface IResponse {
    /** 响应码 */
    code: number,
    /** 响应提示 */
    msg: string,
    /** 响应数据 */
    data: any
}

export default IResponse