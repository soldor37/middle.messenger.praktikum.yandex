import Block from "../classes/Block";
import { TEvents } from "../enitities/Event";

export type TProps = {
    [key: string]: any
    events?: TEvents
    childComponentsClasses?: Block[]
}