/* 二维矩阵 */
import {Matrix} from "./matrix";
import Vec2 from "../vec/vec2";
import Vec4 from "../vec/vec4";

const type = Symbol()

export class Matrix2 implements Matrix {
    public get type() {return type}
    public static isInstance(m: any) { return m.type === type }
    /* 数据区域 */
    private data = [
        1,0,
        0,1
    ]
    /* 构造器 */
    constructor(data?: undefined|Matrix2|number[]) {
        if (!data) return
        if (data instanceof Matrix2) this.data = data.toArray()
        else if (data instanceof Array) {
            data.length = 4
            data.forEach((e , i) => e || (data[i] = 0) )
            this.data = [...data]
        }
    }
    /* 空矩阵 */
    public empty(): this {
        this.data = [
            0,0,
            0,0
        ]
        return this
    }
    /* 获取矩阵值 */
    public get(r: number , c: number): number {
        return this.data[(r - 1) * 2 + (c - 1)]
    }
    /* 获取某行数据 */
    public getRow(row: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 2; i++)
            result.push(this.data[(row - 1) * 2 + i])
        return result
    }
    /* 获取某列数据 */
    public getClo(clo: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 2; i++)
            result.push(this.data[i * 2 + (clo - 1)])
        return result
    }
    /* 设置矩阵值 */
    public set(r: number , c: number , value: number): this {
        if (r > 2 || c > 2) throw "can not read " + r + ',' + c + ' from matrix'
        this.data[(r - 1) * 2 + (c - 1)] = value
        return this
    }
    /* 设置某行矩阵 */
    public setRow(row: number , vec: Vec2|number[]): this {
        if (!Array.isArray(vec)) vec = vec.toArray()
        for (let i = 0; i < 2; i++)
            this.data[(row - 1) * 2 + i] = vec[i]
        return this
    }
    /* 标准矩阵 */
    public identity(): this {
        this.set(1 , 1 , 1).set(1 , 2 , 0)
            .set(2 , 1 , 0).set(2 , 2 , 1)
        return this
    }
    /* 转置矩阵 */
    public transpose(): this {
        let temp
        temp = this.get(1 , 2)
        this.set(1 , 2 , this.get(2, 1))
        this.set(2 , 1 , temp)
        return this
    }
    /* 矩阵行列式 */
    public determinant(): number {
        const result = this.get(1,1) * this.get(2,2)
            -
            this.get(1,2) * this.get(2,1)
        return result
    }
    /* 矩阵的逆 */
    public inverse(): this {
        let n11 = this.get(1,1) , n12 = this.get(1,2) ,
            n21 = this.get(2,1) , n22 = this.get(2,2)
        const k = 1 / (n11 * n22 - n12 * n21)
        this.set(1 , 1 , n22 * k)
        this.set(2 , 2 , n11 * k)

        this.set(1 , 2 , -n12 * k)
        this.set(2 , 1 , -n21 * k)
        return this
    }
    /* 矩阵乘以数字或矩阵 */
    public multiplication(data: number | Matrix2 | Vec2): this|Vec2 {
        if (Vec2.isInstance(data)) {
            data = <Vec2>data
            return new Vec2([
                this.get(1 , 1) * data.x + this.get(1 , 2) * data.y,
                this.get(2 , 1) * data.x + this.get(2 , 2) * data.y,
            ])
        }
        if (typeof data === "number")
            for (let i = 0; i < this.data.length; i++) this.data[i] += data
        else if (data instanceof Matrix2) {
            const
                n11 = this.get(1,1) * data.get(1,1) + this.get(1,2) * data.get(2,1),
                n12 = this.get(1,1) * data.get(1,2) + this.get(1,2) * data.get(2,2),
                n21 = this.get(2,1) * data.get(1,2) + this.get(2,2) * data.get(2,2),
                n22 = this.get(2,1) * data.get(1,2) + this.get(2,2) * data.get(2,2)
            this.set(1 , 1 , n11)
                .set(1 , 2 , n12)
                .set(2 , 1 , n21)
                .set(2 , 2 , n22)
         }
        return this
    }
    /* 拷贝 */
    public copy(): Matrix2 { return new Matrix2(this) }
    /* 克隆 */
    public clone(data: Matrix2|number[]): this {
        if (Array.isArray(data)) this.data = [...data]
        else this.data = [...data.data]
        return this
    }
    /* 转换为数组 */
    public toArray(): number[] { return [...this.data] }

    /* 返回float32数据 */
    toFloat32Array(): Float32Array { return new Float32Array(this.toArray()) }
}
