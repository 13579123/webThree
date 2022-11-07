import {Matrix} from "./matrix";
import Vec3 from "../vec/vec3";
import Vec4 from "../vec/vec4";

const type = Symbol()

export class Matrix4 implements Matrix{

    public get type() {return type}
    public static isInstance(m: any) { return m.type === type }

    private data: number[] = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ]

    constructor(data?: Matrix4|number[]|undefined) {
        if (!data) return
        if (data instanceof Matrix4) this.data = data.toArray()
        else if (data instanceof Array) {
            data.length = 16
            data.forEach((e , i) => e || (data[i] = 0) )
            this.data = [...data]
        }
    }

    empty(): this {
        this.data = [
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
        ]
        return this
    }

    get(r: number, c: number): number {
        return this.data[(r - 1) * 4 + (c - 1)]
    }
    /* 获取某行数据 */
    public getRow(row: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 4; i++)
            result.push(this.data[(row - 1) * 4 + i])
        return result
    }
    /* 获取某列数据 */
    public getClo(clo: number): number[] {
        const result: number[] = []
        for (let i = 0; i < 4; i++)
            result.push(this.data[i * 4 + (clo - 1)])
        return result
    }
    set(r: number, c: number, value: number): this {
        if (r > 4 || c > 4) throw "can not read " + r + ',' + c + ' from matrix'
        this.data[(r - 1) * 4 + (c - 1)] = value
        return this
    }
    /* 设置某行矩阵 */
    public setRow(row: number , vec: Vec4|number[]): this {
        if (!Array.isArray(vec)) vec = vec.toArray()
        for (let i = 0; i < 4; i++)
            this.data[(row - 1) * 4 + i] = vec[i]
        return this
    }
    identity(): this {
        return this
            .set(1,1,1).set(1,2,0).set(1,3,0).set(1,4,0)
            .set(2,1,0).set(2,2,1).set(2,3,0).set(2,4,0)
            .set(3,1,0).set(3,2,0).set(3,3,1).set(3,4,0)
            .set(4,1,0).set(4,2,0).set(4,3,0).set(4,4,1)
    }

    inverse(): this {
        const te = this.data,

            n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
            n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
            n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
            n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

            t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
            t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
            t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
            t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if ( det === 0 ) return this.empty()

        const detInv = 1 / det;

        te[ 0 ] = t11 * detInv;
        te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
        te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
        te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

        te[ 4 ] = t12 * detInv;
        te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
        te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
        te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

        te[ 8 ] = t13 * detInv;
        te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
        te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
        te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

        te[ 12 ] = t14 * detInv;
        te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
        te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
        te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

        return this;
    }

    determinant(): number {
        // TODO
        console.warn(" can not get the determinant from matrix4 ")
        return 0;
    }

    transpose(): this {
        let tmp;
        tmp = this.data[ 1 ]; this.data[ 1 ] = this.data[ 4 ]; this.data[ 4 ] = tmp;
        tmp = this.data[ 2 ]; this.data[ 2 ] = this.data[ 8 ]; this.data[ 8 ] = tmp;
        tmp = this.data[ 6 ]; this.data[ 6 ] = this.data[ 9 ]; this.data[ 9 ] = tmp;
        tmp = this.data[ 3 ]; this.data[ 3 ] = this.data[ 12 ]; this.data[ 12 ] = tmp;
        tmp = this.data[ 7 ]; this.data[ 7 ] = this.data[ 13 ]; this.data[ 13 ] = tmp;
        tmp = this.data[ 11 ]; this.data[ 11 ] = this.data[ 14 ]; this.data[ 14 ] = tmp;
        return this;
    }

    /* 矩阵乘以数字或矩阵 */
    public multiplication(data: number | Matrix4 | Vec4): this|Vec4 {
        if (Vec4.isInstance(data)) {
            data = <Vec4>data
            return new Vec4([
                this.get(1 , 1) * data.x + this.get(1 , 2) * data.y + this.get(1 , 3) * data.z + this.get(1 , 4) * data.w,
                this.get(2 , 1) * data.x + this.get(2 , 2) * data.y + this.get(2 , 3) * data.z + this.get(2 , 4) * data.w,
                this.get(3 , 1) * data.x + this.get(3 , 2) * data.y + this.get(3 , 3) * data.z + this.get(3 , 4) * data.w,
                this.get(4 , 1) * data.x + this.get(4 , 2) * data.y + this.get(4 , 3) * data.z + this.get(4 , 4) * data.w,
            ])
        }
        if (typeof data === "number")
            for (let i = 0; i < this.data.length; i++) this.data[i] += data
        else if (data instanceof Matrix4) {
            let finalData: number[] = []
            for (let i = 1; i <= 4 ; i++)
                for (let j = 1; j <= 4 ; j++) {
                    let result = 0
                    for (let k = 1; k <= 4; k++) result += this.get(i , k) * data.get(k , j)
                    finalData.push(result)
                }
            for (let i = 0; i < finalData.length; i++) this.data[i] = finalData[i]
        }
        return this
    }
    /* 转换为数组 */
    toArray(): number[] { return [...this.data] }
    /* 复制矩阵 */
    copy(): Matrix4 { return new Matrix4(this) }
    /* 克隆 */
    public clone(data: Matrix4|number[]): this {
        if (Array.isArray(data)) this.data = [...data]
        else this.data = [...data.data]
        return this
    }
    /* 返回float32数据 */
    toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray())
    }
}
