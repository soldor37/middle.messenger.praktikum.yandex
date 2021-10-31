declare module '*.pug' {
    function compileTemplate( props?: object ): string;
    export default compileTemplate
}
declare module '*.svg'