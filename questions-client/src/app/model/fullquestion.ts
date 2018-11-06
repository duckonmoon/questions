import { Model } from "./model";
import { Theme } from "./theme";
import { Answer } from "./answer";


export class FullQuestion extends Model {
    theme : Theme;
    createdBy : string;
    answers: Array<Answer>;
}