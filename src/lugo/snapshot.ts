import { Ball } from './ball';
import { Player } from './player';
import { Point } from './point';
import { ShotClock } from './shot-clock';
import { Side } from './side';
import { SPECS } from './specs';
import { Team } from './team';
import { Vector2D } from './vector-2d';
import { Velocity } from './velocity';

export type GameServerState = 'OVER' | 'GET_READY' | 'PLAYING';

export type GameSnapshotProps = {
    uuid: string;
    state: GameServerState;
    turn: number;
    turns_ball_in_goal_zone?: number;
    ball: {
        position: {
            x: number;
            y: number;
        };
        velocity: {
            direction: {
                x: number;
                y: number;
            };
            speed: number;
        };
        holder?: {
            init_position: {
                x: number;
                y: number;
            };
            position: {
                x: number;
                y: number;
            };
            number: number;
            velocity: {
                direction: {
                    x: number;
                    y: number;
                };
                speed: number;
            };
        };
    };
    away_team: {
        name: string;
        side: 'HOME' | 'AWAY';
        players: {
            number: number;
            position: {
                x: number;
                y: number;
            };
            init_position: {
                x: number;
                y: number;
            };
            team_side: 'HOME' | 'AWAY';
            velocity: {
                direction: {
                    x: number;
                    y: number;
                };
                speed: number;
            };
            color?: string;
        }[];
        score: number;
    };
    home_team: {
        name: string;
        side: 'HOME' | 'AWAY';
        players: {
            number: number;
            position: {
                x: number;
                y: number;
            };
            init_position: {
                x: number;
                y: number;
            };
            team_side: 'HOME' | 'AWAY';
            velocity: {
                direction: {
                    x: number;
                    y: number;
                };
                speed: number;
            };
            color?: string;
        }[];
        score: number;
    };
    shot_clock: {
        team_side?: 'HOME' | 'AWAY';
        remaining_turns: number;
    };
};

export type TurnsBallInGoalZoneState = 'normal' | 'alert' | 'danger' | 'none';

export class Snapshot {
    private uuid: string;
    private turn: number;
    private ball: Ball;
    private homeTeam: Team;
    private awayTeam: Team;
    private shotClock: ShotClock;
    private turnsBallInGoalZone?: number;

    constructor(props: GameSnapshotProps) {
        this.uuid = props.uuid;
        this.turn = props.turn;
        this.turnsBallInGoalZone = props.turns_ball_in_goal_zone;
        this.ball = new Ball({
            position: new Point(props.ball.position.x, props.ball.position.y),
            velocity: new Velocity(
                new Vector2D(props.ball.velocity.direction.x, props.ball.velocity.direction.y),
                props.ball.velocity.speed,
            ),
        });
        this.homeTeam = new Team({
            name: props.home_team.name,
            score: props.home_team.score ?? 0,
            side: Side.HOME,
            players: (props.home_team.players ?? []).map(
                (d) =>
                    new Player({
                        number: d.number,
                        teamSide: Side.HOME,
                        velocity: new Velocity(
                            new Vector2D(d.velocity.direction.x, d.velocity.direction.y),
                            d.velocity.speed,
                        ),
                        position: new Point(d.position.x, d.position.y),
                        initPosition: new Point(d.init_position.x, d.init_position.y),
                    }),
            ),
        });
        this.awayTeam = new Team({
            name: props.away_team.name,
            score: props.away_team.score ?? 0,
            side: Side.AWAY,
            players: (props.away_team.players ?? []).map(
                (d) =>
                    new Player({
                        number: d.number,
                        teamSide: Side.AWAY,
                        velocity: new Velocity(
                            new Vector2D(d.velocity.direction.x, d.velocity.direction.y),
                            d.velocity.speed,
                        ),
                        position: new Point(d.position.x, d.position.y),
                        initPosition: new Point(d.init_position.x, d.init_position.y),
                    }),
            ),
        });
        const shotClockSide = props.shot_clock?.team_side
            ? props.shot_clock.team_side === 'HOME'
                ? Side.HOME
                : Side.AWAY
            : undefined;
        this.shotClock = new ShotClock(
            props.shot_clock?.remaining_turns ?? SPECS.SHOT_CLOCK_TIME,
            shotClockSide,
        );
    }

    getTurnsBallInGoalZone(): number | undefined {
        return this.turnsBallInGoalZone;
    }

    getTurnsBallInGoalZoneState(): TurnsBallInGoalZoneState {
        if (!this.turnsBallInGoalZone) return 'none';

        if (this.turnsBallInGoalZone <= SPECS.BALL_TIME_IN_GOAL_ZONE / 3) {
            return 'normal';
        }

        if (this.turnsBallInGoalZone > (SPECS.BALL_TIME_IN_GOAL_ZONE / 3) * 2) {
            return 'danger';
        }

        return 'alert';
    }

    getShotClock(): ShotClock {
        return this.shotClock;
    }

    getUuid(): string {
        return this.uuid;
    }

    getTurn(): number {
        return this.turn;
    }

    getBall(): Ball {
        return this.ball;
    }

    getHomeTeam(): Team {
        return this.homeTeam;
    }

    getAwayTeam(): Team {
        return this.awayTeam;
    }
}
