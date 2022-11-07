import Vec3 from "../../../math/vec/vec3";
import {Matrix4} from "../../../math/matrix/matrix4";
import {lookAt, radians} from "../../../math/particular";
import math from "../../../math"

type CameraOption = {
    angle?: number
    aspect?: number
    near?: number
    far?: number
    left?: number
    top?: number
    bottom?: number
    right?: number
    position?: Vec3,
    worldUp?: Vec3
}

/* 视图矩阵和模型矩阵 */
const eyeMatrixSymbol = Symbol() , projectionMatrix = Symbol()

/* 欧拉角相机 */
export class EulerCamera {
    /* 摄像机类型 */
    protected readonly type: "perspective"|"orthographic"
    /* 右方向 */
    public right = new Vec3()
    /* 正方向 */
    public forward = new Vec3()
    /* 世界坐标 */
    public worldUp = new Vec3([0 , 1 , 0])
    /* 坐标 */
    public position = new Vec3()
    /* 摄像机角度 */
    public yaw = 0
    public roll = 0
    public pitch = 0
    /* 视角矩阵 */
    private [eyeMatrixSymbol]: Matrix4 = new Matrix4()
    public get eyeMatrix() {return this[eyeMatrixSymbol]}
    /* 模式矩阵有两种 分别是 透视 , 正交 */
    public [projectionMatrix]: Matrix4 = new Matrix4()
    public get projectionMatrix() {return this[projectionMatrix]}
    /* 构造器 */
    constructor(type: "perspective"|"orthographic" , option: CameraOption = {}) {
        this.type = type
        if (option.worldUp) this.worldUp = option.worldUp
        if (option.position) this.position = option.position.copy()
        this.updateEyeCamera().updateModelCamera(option)
    }
    /* 相机数据重新计算 */
    public updateEyeCamera(): this {
        /* 视角矩阵 */
        this.forward.x =
            math.cos(radians(this.pitch)) * math.sin(radians(this.yaw))
        this.forward.y = math.sin(radians(this.pitch))
        this.forward.z = math.cos(math.radians(this.pitch)) * math.cos(radians(this.yaw))
        this.right = math.normalize(this.forward.copy().cross(this.worldUp))
        this[eyeMatrixSymbol] = lookAt(
            this.position ,
            this.position.copy().addition(this.forward) ,
            this.worldUp
        )
        return this
    }
    public updateModelCamera(option: CameraOption): this {
        if (this.type === "perspective")
            this[projectionMatrix] = math.perspectiveMatrix(
                option.angle || 45.0 ,
                option.aspect || (10 / 8) ,
                option.near || 0.1 , option.far || 50
            )
        else if (this.type === "orthographic")
            this[projectionMatrix] = math.orthographicMatrix(
                option.left || -1 , option.right || 1,
                option.bottom || -1 , option.top || 1,
                option.near || 0.1 , option.far || 50,
            )
        return this
    }
}

/* 创建欧拉角透视相机 */
export function createPerspectiveEulerCamera(option: CameraOption = {}) {
    return new EulerCamera("perspective" , option)
}

/* 创建欧拉正交相机 */
export function createOrthographicEulerCamera(option: CameraOption = {}) {
    return new EulerCamera("orthographic" , option)
}
