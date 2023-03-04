declare module "*.module.scss";
declare module "*.png" {
    const value: any;
    export = value;
}
declare module '*.sass' {
    const content: Record<string, string>;
    export default content;
}
declare module '*.svg' {
    const content: string;
    export default content;
}