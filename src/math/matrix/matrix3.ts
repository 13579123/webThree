import {Matrix} from "./matrix";
import Vec2 from "../vec/vec2";
import Vec3 from "../vec/vec3";

const type = Symbol()

/* 三维矩阵 */
export class Matrix3 implements Matrix {
    public get type() {return type}
    public static isInstance(m: any) { return m.type === type }
    /* 数据区域 */
    private data = [
        1,0,0,
        0,1,0,
        0,0,1
    ]
    /* 构造器 */
    constructor(data?: undefined|Matrix3|number[]) {
        if (!data) return
        if (data instanceof Matrix3) this.data = data.toArray()
        else if (data instanceof Array) {
            data.length = 9
            data.forEach((e , i) => e || (data[i] = 0) )
            this.data = [...data]
        }
    }
    /* 空矩阵 */
    public empty(): this {
        this.data = [
            0,0,0,
            0,0,0,
            0,0,0
        ]
        return this
    }
    /* 获取矩阵值 */
    public get(r: number , c: number): number {
        return this.data[(r - 1) * 3 + (c - 1)]
    }
    /* 获取某行数据 */
    public getRow(row: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 3; i++)
            result.push(this.data[(row - 1) * 3 + i])
        return result
    }
    /* 获取某列数据 */
    public getClo(clo: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 3; i++)
            result.push(this.data[i * 3 + (clo - 1)])
        return result
    }
    /* 设置矩阵值 */
    public set(r: number , c: number , value: number): this {
        if (r > 3 || c > 3) throw "can not read " + r + ',' + c + ' from matrix'
        this.data[(r - 1) * 3 + (c - 1)] = value
        return this
    }
    /* 设置某行矩阵 */
    public setRow(row: number , vec: Vec3|number[]): this {
        if (!Array.isArray(vec)) vec = vec.toArray()
        for (let i = 0; i < 3; i++)
            this.data[(row - 1) * 3 + i] = vec[i]
        return this
    }
    /* 标准矩阵 */
    public identity(): this {
        this.set(1 , 1 , 1).set(1 , 2 , 0).set(1 , 3 , 0)
            .set(2 , 1 , 0).set(2 , 2 , 1).set(2 , 3 , 0)
            .set(3 , 1 , 0).set(3 , 2 , 0).set(3 , 3 , 1)
        return this
    }
    /* 矩阵转置 */
    public transpose() {
        let tmp
        tmp = this.data[ 1 ]; this.data[ 1 ] = this.data[ 3 ]; this.data[ 3 ] = tmp;
        tmp = this.data[ 2 ]; this.data[ 2 ] = this.data[ 6 ]; this.data[ 6 ] = tmp;
        tmp = this.data[ 5 ]; this.data[ 5 ] = this.data[ 7 ]; this.data[ 7 ] = tmp;
        return this;
    }
    /* 矩阵行列式 */
    public determinant(): number {
        const
            a = this.data[ 0 ], b = this.data[ 1 ], c = this.data[ 2 ],
            d = this.data[ 3 ], e = this.data[ 4 ], f = this.data[ 5 ],
            g = this.data[ 6 ], h = this.data[ 7 ], i = this.data[ 8 ]
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
    /* 矩阵的逆 */
    public inverse(): this {
        const te = this.data,
            n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
            n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
            n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],
            t11 = n33 * n22 - n32 * n23,
            t12 = n32 * n13 - n33 * n12,
            t13 = n23 * n12 - n22 * n13,
            det = n11 * t11 + n21 * t12 + n31 * t13;
        if ( det === 0 ) return this.empty()
        const detInv = 1 / det;
        te[ 0 ] = t11 * detInv;
        te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
        te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;
        te[ 3 ] = t12 * detInv;
        te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
        te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;
        te[ 6 ] = t13 * detInv;
        te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
        te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;
        return this;
    }
    /* 矩阵乘以数字或矩阵 */
    public multiplication(data: number | Matrix3 | Vec3): this|Vec3 {
        if (Vec3.isInstance(data)) {
            data = <Vec3>data
            return new Vec3([
                this.get(1 , 1) * data.x + this.get(1 , 2) * data.y + this.get(1 , 3) * data.z,
                this.get(2 , 1) * data.x + this.get(2 , 2) * data.y + this.get(2 , 3) * data.z,
                this.get(3 , 1) * data.x + this.get(3 , 2) * data.y + this.get(3 , 3) * data.z,
            ])
        }
        if (typeof data === "number")
            for (let i = 0; i < this.data.length; i++) this.data[i] += data
        else if (data instanceof Matrix3) {
            let finalData: number[] = []
            for (let i = 1; i <= 3 ; i++)
                for (let j = 1; j <= 3 ; j++) {
                    let result = 0
                    for (let k = 1; k <= 3; k++) result += this.get(i , k) * data.get(k , j)
                    finalData.push(result)
                }
            for (let i = 0; i < finalData.length; i++) this.data[i] = finalData[i]
        }
        return this
    }
    /* 拷贝 */
    public copy(): Matrix3 { return new Matrix3(this) }
    /* 克隆 */
    public clone(data: Matrix3|number[]): this {
        if (Array.isArray(data)) this.data = [...data]
        else this.data = [...data.data]
        return this
    }
    /* 转换为数组 */
    public toArray(): number[] { return [...this.data] }

    /* 返回float32数据 */
    toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray())
    }
}
