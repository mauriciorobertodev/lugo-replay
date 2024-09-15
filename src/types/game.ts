export type GameServerState = 'OVER' | 'GET_READY' | 'PLAYING';

export type GameSnapshot = {
    uuid: string;
    state: GameServerState;
    turn: number;
    ball: Ball;
    away_team: Team;
    home_team: Team;
    shot_clock: {
        remaining_turns: number;
    };
};

export type Point = {
    x: number;
    y: number;
};

export type Vector = {
    x: number;
    y: number;
};

export type Velocity = {
    direction: Point;
    speed: number;
};

export type Ball = {
    position: Point;
    velocity: Velocity;
    holder?: {
        init_position: Point;
        position: Point;
        number: number;
        velocity: Velocity;
    };
};

export type Side = 'HOME' | 'AWAY';

export type Team = {
    name: string;
    side: Side;
    players: Player[];
    score: number;
};

export type Player = {
    number: number;
    position: Point;
    init_position: Point;
    team_side: Side;
    velocity: Velocity;
    color?: string;
};
