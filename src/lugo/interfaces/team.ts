import { Side } from '../side';
import { IPlayer } from './player';

export interface ITeam {
    getPlayers(): IPlayer[];
    getName(): string;
    getScore(): number;
    getSide(): Side;
    hasPlayer(number: number): boolean;
}
