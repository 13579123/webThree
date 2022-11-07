/* 纹理选项 */
export type TextureOption = {
    // 活跃点
    active?: number,
    // 是否反转y轴
    flipY?: boolean
    // 纹理类型
    format?: GLenum
    // 纹理等级
    level?: GLint
    // 是否生成map
    mipmap?: boolean
    // 是否跨域
    origin?: boolean
}

/*
* 生成纹理
* context 为webgl上下文
* source 为图片的路径或image对象
* option 为其他配置项
*  */
export function createTexture(
    context: WebGLRenderingContext ,
    source: string|HTMLImageElement ,
    option: TextureOption = {}
): WebGLTexture|null {
    const texture = context.createTexture()
    if (texture === null) console.warn("create texture failure")
    /* 类型统一 */
    if (typeof source === "string") {
        const imageSrc = source
        source = new Image()
        source.src = imageSrc
    }
    if (option.origin) source.crossOrigin = "*"
    /* 格式化配置 */
    option.format = option.format || context.RGBA
    const initTexture = () => {
        option.level = option.level || 0
        option.format = option.format || context.RGBA
        option.flipY = option.flipY === undefined ? true : option.flipY
        option.mipmap = option.mipmap === undefined ? true : option.mipmap
        context.activeTexture(context.TEXTURE0 + (option.active || 0))
        context.bindTexture(context.TEXTURE_2D , texture)
        if (option.flipY) context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL , true)
        context.texImage2D(
            context.TEXTURE_2D ,
            option.level , option.format , option.format , context.UNSIGNED_BYTE ,
            (<HTMLImageElement>source)
        )
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        if (option.mipmap) context.generateMipmap(context.TEXTURE_2D)
        if (option.flipY) context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL , false)
        context.bindTexture(context.TEXTURE_2D , null)
    }
    /* 分别为加载完成和未加载完成的情况 */
    if (source.complete) initTexture()
    else source.onload = initTexture
    return texture
}

/*
* 生成盒子纹理
* context 为webgl上下文
* source 为图片的路径或image对象们
* option 为其他配置项
*  */
export function createCubTexture(
    context: WebGLRenderingContext ,
    source: (string|HTMLImageElement)[] ,
    option: TextureOption = {}
): WebGLTexture|null  {
    const texture = context.createTexture()
    if (texture === null) console.warn("create texture failure")
    context.activeTexture(context.TEXTURE0 + (option.active || 0))
    context.bindTexture(context.TEXTURE_CUBE_MAP , texture)
    const initTexture = ( target: GLenum , image: HTMLImageElement) => {
        return () => {
            context.activeTexture(context.TEXTURE0 + (option.active || 0))
            context.bindTexture(context.TEXTURE_CUBE_MAP , texture)
            if (option.flipY) context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL , true)
            context.texImage2D(
                target,
                option.level || 0,
                option.format || context.RGBA,
                option.format || context.RGBA,
                context.UNSIGNED_BYTE, image
            )
            context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_MAG_FILTER, context.LINEAR);
            context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_MIN_FILTER, context.LINEAR);
            context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
            context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
            // @ts-ignore
            context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_R, context.CLAMP_TO_EDGE);
            if (option.flipY) context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL , false)
            context.bindTexture(context.TEXTURE_CUBE_MAP , null)
        }
    }
    /* 绑定纹理 */
    for (let i = 0; i < 6; i++) {
        let image = source[i]
        if (!(image instanceof HTMLImageElement)) {
            image = new Image()
            image.src = (<string>source[i])
        }
        if (option.origin) image.crossOrigin = "*"
        if (image.complete) initTexture(context.TEXTURE_CUBE_MAP_POSITIVE_X + i , image)()
        else image.onload = initTexture(context.TEXTURE_CUBE_MAP_POSITIVE_X + i , image)
    }
    context.bindTexture(context.TEXTURE_CUBE_MAP , null)
    return texture
}
