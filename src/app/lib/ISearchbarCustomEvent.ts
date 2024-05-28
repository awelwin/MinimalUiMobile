import { ISearchbarChangeEventDetail } from "./ISearchbarChangeEventDetail";

export interface ISearchbarCustomEvent<T = any> extends CustomEvent {
    detail: ISearchbarChangeEventDetail;
    target: HTMLIonSearchbarElement;
}