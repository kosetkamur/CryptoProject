declare module "*.module.scss";
declare module "*.png" {
    const value: any;
    export = value;
}
declare module '*.sass' {
    const content: Record<string, string>;
    export default content;
}