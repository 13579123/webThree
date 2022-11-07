import {Vec} from "../vec/vec";

export interface Matrix {
    /* 类型 */
    type: any
    /* 获取矩阵 */
    get(r: number , c: number): number
    /* 获取某行数据 */
    getRow(row: number): number[]
    /* 获取矩阵某列数据 */
    getClo(clo: number): number[]
    /* 设置矩阵 */
    set(r: number , c: number , value: number): this
    /* 设置某行矩阵 */
    setRow(row: number , data: Vec|number[]): this
    /* 空矩阵 */
    empty(): this
    /* 标准矩阵 */
    identity(): this
    /* 转置矩阵 */
    transpose(): this
    /* 矩阵行列式 */
    determinant(): number
    /* 矩阵的逆 */
    inverse(): this
    /* 向量乘数字或矩阵 */
    multiplication(data: number|Matrix|Vec): this|Vec
    /* 拷贝 */
    copy(): Matrix
    /* 克隆矩阵到当前矩阵 */
    clone(matrix: Matrix|number[]): this
    /* 转换为数组 */
    toArray(): number[]
    /* 转换为浮点数组 */
    toFloat32Array(): Float32Array
}
