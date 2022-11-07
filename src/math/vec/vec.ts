export interface Vec {
    /* 向量长度 */
    readonly length : number
    /* 向量类型 */
    readonly type: any
    /* 向量点乘 */
    dot(v: Vec): number
    /* 向量加向量 */
    addition(v: Vec|number[]): this
    /* 向量相减 */
    reduce(v: Vec): this
    /* 向量乘数字 */
    multiplication(num: number): this
    /* 向量取反 */
    negative (): this
    /* 随机向量 */
    random(): this
    /* 复制向量 */
    copy(): Vec
    /* 转换为数组 */
    toArray(): number[]
}
