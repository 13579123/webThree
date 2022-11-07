/* float 大小 */
const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT

/* buffer(vbo) 描述信息 */
type BufferMetaData = {
    // 数据，数据必须紧密排列
    bufferData: Float32Array
    // 属性们的信息
    attributes: {
        // 属性attribute名称
        name: string
        // 属性长度
        length: number
    }[] ,
    // 改变属性
    usage?: number
}

/* 创建vao
* context 为当前上下文
* program 为绑定程序
* bufferData 是buffer数据，通常来说一个bufferData元素对应一个vbo
* bufferObjects 是用来存储vbo信息的
*  */
export function createVertexArrayBuffer (
    context: WebGL2RenderingContext,
    // 对应的程序
    program: WebGLProgram,
    // buffer数据们
    bufferData: BufferMetaData[],
    // 用来存储vbo的数组
    bufferObjects: WebGLBuffer[]
): WebGLVertexArrayObject|null {
    const vao = context.createVertexArray()
    if (vao === null) console.error("create vao failure")
    // 绑定vao
    context.bindVertexArray(vao)
    // 循环生成vbo
    for (const data of bufferData) {
        const vbo = context.createBuffer()
        // 保存vbo
        if (vbo) bufferObjects.push(vbo)
        else console.error("create vbo failure")
        // 绑定vbo
        context.bindBuffer(context.ARRAY_BUFFER , vbo)
        // 输入数据
        context.bufferData(context.ARRAY_BUFFER , data.bufferData , data.usage || context.STATIC_DRAW)
        // 数据偏移和步长
        let offset = 0 , stride = 0
        for (const attribute of data.attributes) stride += attribute.length
        // 循环绑定数据到变量
        for (const attribute of data.attributes) {
            const location = context.getAttribLocation(program , attribute.name)
            if (location < 0) console.warn(`can not get location with '${attribute.name}'`)
            context.vertexAttribPointer(
                location , attribute.length , context.FLOAT , false,
                FLOAT_SIZE * stride , FLOAT_SIZE * offset
            )
            offset += attribute.length
            context.enableVertexAttribArray(location)
        }
        context.bindBuffer(context.ARRAY_BUFFER , null)
    }
    // 解绑vao
    context.bindVertexArray(null)
    return vao
}
