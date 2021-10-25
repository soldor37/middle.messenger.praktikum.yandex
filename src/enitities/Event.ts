export type TEvents = {
    [key: string]: (e: Event, comp?: object) => void
};