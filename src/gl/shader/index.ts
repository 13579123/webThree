import Vec3 from "../../math/vec/vec3";
import Vec2 from "../../math/vec/vec2";
import Vec4 from "../../math/vec/vec4";
import {Matrix4} from "../../math/matrix/matrix4";
import {Matrix3} from "../../math/matrix/matrix3";
import {Matrix2} from "../../math/matrix/matrix2";

/* 创建程序 */
export function createProgram(context: WebGLRenderingContext ,
                              vs: WebGLShader|string ,
                              fs: WebGLShader|string): WebGLProgram {
    const program = context.createProgram()
    if (!program) throw "create program failure"
    let vertexShader: WebGLShader , fragmentShader: WebGLShader
    if (typeof vs === "string")
        vertexShader = createShader(context , context.VERTEX_SHADER , vs)
    else vertexShader = vs
    if (typeof fs === "string")
        fragmentShader = createShader(context , context.FRAGMENT_SHADER , fs)
    else fragmentShader = fs
    context.attachShader(program , vertexShader)
    context.attachShader(program , fragmentShader)
    context.linkProgram(program)
    if (vertexShader !== vs) context.deleteShader(vertexShader)
    if (fragmentShader !== fs) context.deleteShader(fragmentShader)
    return program
}

/* 创建shader */
export function createShader(context: WebGLRenderingContext ,
                             type: GLenum ,
                             source: string): WebGLShader {
    const shader = context.createShader(type)
    if (!shader) throw "create shader failure"
    context.shaderSource(shader , source)
    context.compileShader(shader)
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS))
        console.error(`${
            type === context.VERTEX_SHADER ? "vertex" : "fragment"
        } shader failure :: ` + context.getShaderInfoLog(shader))
    return shader
}

/* 发送数据到uniform中 */
export function sendUniformData(context: WebGLRenderingContext ,
                                program: WebGLProgram,
                                name: string,
                                data: Vec3|Vec2|Vec4|Matrix4|Matrix3|Matrix2|number,
                                type: "int"|"float" = "float"
): WebGLUniformLocation|null {
    const uniformLocation = context.getUniformLocation(program , name)
    if (uniformLocation === null) {
        console.warn(`can not find uniform location with '${name}'`)
        return null
    }
    if (Matrix4.isInstance(data))
        context.uniformMatrix4fv(
            uniformLocation , false , (<Matrix4>data).toFloat32Array()
        )
    else if (Matrix3.isInstance(data))
        context.uniformMatrix3fv(
            uniformLocation , false , (<Matrix3>data).toFloat32Array()
        )
    else if (Matrix2.isInstance(data))
        context.uniformMatrix2fv(
            uniformLocation , false , (<Matrix2>data).toFloat32Array()
        )
    else if (Vec4.isInstance(data))
        context.uniform4f(
            uniformLocation , (<Vec4>data).x , (<Vec4>data).y , (<Vec4>data).z , (<Vec4>data).w
        )
    else if (Vec3.isInstance(data))
        context.uniform3f(
            uniformLocation , (<Vec3>data).x , (<Vec3>data).y , (<Vec3>data).z
        )
    else if (Vec2.isInstance(data))
        context.uniform2f( uniformLocation , (<Vec2>data).x , (<Vec2>data).y )
    else if (typeof data === "number" && type === "float")
        context.uniform1f(uniformLocation , data)
    else if (typeof data === "number" && type === "int")
        context.uniform1i(uniformLocation , data)
    return uniformLocation
}
