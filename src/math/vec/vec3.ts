/* vec3 3维向量 */
import {Vec} from "./vec";

const type = Symbol()

export default class Vec3 implements Vec{
    public get type() {return type}
    public static isInstance(v: any) { return v.type === type }
    /* 数据域 */
    private readonly data: number[] = [ 0 , 0 , 0 ]
    /* 读取与设置 */
    get x() { return this.data[0] }
    set x(v: number) { this.data[0] = v }
    get r() { return this.data[0] }
    set r(v: number) { this.data[0] = v }

    get y() { return this.data[1] }
    set y(v: number) { this.data[1] = v }
    get g() { return this.data[1] }
    set g(v: number) { this.data[1] = v }

    get z() { return this.data[2] }
    set z(v: number) { this.data[2] = v }
    get b() { return this.data[2] }
    set b(v: number) { this.data[2] = v }
    /* 长度 */
    get length () {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }
    /* 构造器 */
    public constructor(data?: number[]|Vec3|undefined) {
        if (!data) return
        if (data instanceof Vec3) this.data = [...data.data]
        else {
            data.length = 3
            this.data = [...data]
        }
    }
    /* 向量点乘 */
    public dot(v: Vec3): number {
        return v.x * this.x + v.y * this.y + v.z * this.z
    }
    /* 向量叉乘 */
    public cross(v : Vec3): this {
        const x = this.y * v.z - v.y * this.z
        const y = this.z * v.x - v.z * this.x
        const z = this.x * v.y - v.x * this.y
        this.x = x
        this.y = y
        this.z = z
        return this
    }
    /* 向量加向量 */
    public addition(v: Vec3|number[]): this {
        if (Array.isArray(v)) {
            this.x = this.x + v[0]
            this.y = this.y + v[1]
            this.z = this.z + v[2]
        } else {
            this.x = this.x + v.x
            this.y = this.y + v.y
            this.z = this.z + v.z
        }
        return this
    }
    /* 向量相减 */
    public reduce(v: Vec3): this {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        return this
    }
    /* 向量乘数字 */
    public multiplication(num: number): this {
        this.x = this.x * num
        this.y = this.y * num
        this.z = this.z * num
        return this
    }
    /* 向量取反 */
    public negative (): this {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
        return this
    }
    /* 随机三维向量 */
    public random(): this {
        this.x = Math.random()
        this.y = Math.random()
        this.z = Math.random()
        return  this
    }
    /* 复制向量 */
    public copy(): Vec3 { return new Vec3(this) }
    /* 转换为数组 */
    public toArray(): number[] { return [...this.data] }
}
