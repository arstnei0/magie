import Plugin from "./Plugin";

export default interface MagieConfig {
    frontend?: boolean,
    plugins?: Plugin | Plugin[],
};