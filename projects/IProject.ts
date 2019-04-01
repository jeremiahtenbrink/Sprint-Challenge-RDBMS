import { IAction } from "../actions/IAction";

export interface IProject {
    id?: number,
    name: string,
    description: string,
    complete: boolean,
    actions?: IAction[]
}