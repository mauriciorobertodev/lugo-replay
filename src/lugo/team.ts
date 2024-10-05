import { ITeam } from './interfaces/team';
import { Player } from './player';
import { Side } from './side';

export type TeamProps = {
    players: Array<Player>;
    name: string;
    score: number;
    side: Side;
};

export class Team implements ITeam {
    private players: Array<Player> = [];
    private name: string = '';
    private score: number = 0;
    private side: Side = Side.HOME;

    constructor(props: TeamProps) {
        this.players = props.players;
        this.name = props.name;
        this.score = props.score;
        this.side = props.side;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    hasPlayer(number: number): boolean {
        return this.players.filter((p) => p.getNumber() === number).length > 0;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string): Team {
        this.name = value;
        return this;
    }

    getScore(): number {
        return this.score;
    }

    setScore(value: number): Team {
        this.score = value;
        return this;
    }

    getSide(): Side {
        return this.side;
    }

    setSide(value: Side): Team {
        this.side = value;
        return this;
    }
}
