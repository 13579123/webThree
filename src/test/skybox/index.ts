import gl from "./../../gl"
import math from "./../../math"
import {TextureOption} from "../../gl/texture";
import {EulerCamera} from "../camera/euler";

const CUBE_DATA_ARRAY: number[] = [
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    -1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,

    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,

    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,

    1.0,  1.0,  1.0,
    1.0,  1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,

    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    -1.0, -1.0, -1.0,

    -1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
]

const SKY_BOX_VERTEX = `
    precision mediump float;
    attribute vec3 in_pos;
    uniform mat4 eyeMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 perspectiveMatrix;
    varying vec3 uv;
    void main() {
        mat4 eye = eyeMatrix;
        mat4 model = modelMatrix;
        mat4 perspective = perspectiveMatrix;
        eye[3][0] = eye[3][1] = eye[3][2] = 0.0;
        gl_Position = perspective * eye * model * vec4(in_pos , 1.0);
        uv = in_pos;
    }
`
const SKY_BOX_FRAGMENT = `
    precision mediump float;
    varying vec3 uv;
    uniform samplerCube cubeTexture;
    void main() {
        gl_FragColor = textureCube(cubeTexture , uv);
    }
`

/* 天空盒 */
class SkyBox {
    /* 程序 */
    public readonly program: WebGLProgram|null
    /* 纹理 */
    public readonly texture: WebGLTexture|null
    /* 数据缓存 */
    public readonly vao: WebGLVertexArrayObject|null
    private readonly vbo: WebGLBuffer[] = []
    /* 配置 */
    private readonly option: TextureOption
    /* 是否被回收 */
    private hasDestroy: boolean = false
    /* 构造器 */
    public constructor(
        context: WebGL2RenderingContext ,
        source: (string|HTMLImageElement)[] ,
        option: TextureOption
    ) {
        this.option = option
        const texture = gl.createCubTexture(context , source , option)
        if (!texture) console.warn("create texture failure")
        this.texture = texture
        const program = gl.createProgram(context , SKY_BOX_VERTEX , SKY_BOX_FRAGMENT)
        if (!program) console.warn("create program failure")
        this.program = program
        const vao = gl.createVertexArrayBuffer(context , this.program , [{
            bufferData: new Float32Array(CUBE_DATA_ARRAY),
            attributes: [{name: "in_pos" , length: 3}]
        }] , this.vbo)
        if (!vao) console.warn("create vao failure")
        this.vao = vao
    }
    /* 绘制 */
    public draw(
        context: WebGL2RenderingContext ,
        camera: EulerCamera ,
    ) {
        if (this.hasDestroy) return console.warn("this sky box has been destroyed")
        if (!this.program || !this.vao || !this.texture) return console.warn("this sky box init failure")
        context.useProgram(this.program)
        context.bindVertexArray(this.vao)
        gl.sendUniformData(context , this.program , "eyeMatrix" , camera.eyeMatrix)
        gl.sendUniformData(context , this.program , "perspectiveMatrix" , camera.projectionMatrix)
        gl.sendUniformData(context , this.program , "modelMatrix" , new math.Matrix4)
        context.activeTexture(this.option.active || context.TEXTURE0)
        context.bindTexture(context.TEXTURE_CUBE_MAP, this.texture)
        context.bindVertexArray(this.vao)
        context.depthFunc(context.LEQUAL)
        context.depthMask(false)
        context.drawArrays(context.TRIANGLES , 0 , 36)
        context.depthMask(true)
        context.depthFunc(context.LESS)
        context.bindTexture(context.TEXTURE_CUBE_MAP, null)
    }
    /* 销毁 */
    public destroy(context: WebGL2RenderingContext) {
        if (this.hasDestroy) return console.warn("this sky box has been destroyed")
        context.deleteVertexArray(this.vao)
        this.vbo.forEach(vbo => context.deleteBuffer(vbo))
        context.deleteProgram(this.program)
        context.deleteTexture(this.texture)
        this.hasDestroy = true
    }
}
/* 创建天空盒 */
export function createSkybox(
    context: WebGL2RenderingContext ,
    source: (string|HTMLImageElement)[] ,
    option: TextureOption = {}
): SkyBox {
    return new SkyBox(context , source , option)
}
