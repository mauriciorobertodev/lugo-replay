export class SPECS {
    public static readonly BASE_UNIT: number = 100;

    public static readonly PLAYER_SIZE: number = 4 * SPECS.BASE_UNIT;
    public static readonly PLAYER_RADIUS: number = SPECS.PLAYER_SIZE / 2;
    public static readonly PLAYER_RECONNECTION_WAIT_TIME: number = 20;
    public static readonly PLAYER_MAX_SPEED: number = 100.0;

    public static readonly MAX_PLAYERS: number = 11;
    public static readonly MIN_PLAYERS: number = 6;

    public static readonly MAX_X_COORDINATE: number = 200 * SPECS.BASE_UNIT;
    public static readonly MAX_Y_COORDINATE: number = 100 * SPECS.BASE_UNIT;

    public static readonly FIELD_NEUTRAL_CENTER: number = 1000;
    public static readonly FIELD_CENTER_RADIUS: number = 1000;

    public static readonly FIELD_WIDTH: number = SPECS.MAX_X_COORDINATE + 1;
    public static readonly FIELD_HEIGHT: number = SPECS.MAX_Y_COORDINATE + 1;

    public static readonly FIELD_CENTER_X: number = SPECS.MAX_X_COORDINATE / 2;
    public static readonly FIELD_CENTER_Y: number = SPECS.MAX_Y_COORDINATE / 2;

    public static readonly BALL_SIZE: number = 2 * SPECS.BASE_UNIT;
    public static readonly BALL_RADIUS: number = SPECS.BALL_SIZE / 2;
    public static readonly BALL_DECELERATION: number = 10.0;
    public static readonly BALL_ACCELERATION: number = -10.0;
    public static readonly BALL_MAX_SPEED: number = 4.0 * SPECS.BASE_UNIT;
    public static readonly BALL_MIN_SPEED: number = 2;
    public static readonly BALL_TIME_IN_GOAL_ZONE: number = 40; // 40 / 20 fps : 2 seconds

    public static readonly GOAL_WIDTH: number = 30 * SPECS.BASE_UNIT;
    public static readonly GOAL_MIN_Y: number = (SPECS.MAX_Y_COORDINATE - SPECS.GOAL_WIDTH) / 2;
    public static readonly GOAL_MAX_Y: number =
        (SPECS.MAX_Y_COORDINATE - SPECS.GOAL_WIDTH) / 2 + SPECS.GOAL_WIDTH;
    public static readonly GOAL_ZONE_RANGE: number = 14 * SPECS.BASE_UNIT;
    public static readonly GOAL_RADIUS: number = SPECS.GOAL_ZONE_RANGE;

    public static readonly GOALKEEPER_JUMP_DURATION: number = 3;
    public static readonly GOALKEEPER_JUMP_MAX_SPEED: number = 2 * SPECS.BASE_UNIT;
    public static readonly GOALKEEPER_NUMBER: number = 1;
    public static readonly GOALKEEPER_SIZE: number = SPECS.PLAYER_SIZE * 2.3;

    public static readonly SHOT_CLOCK_TIME: number = 300;
}
