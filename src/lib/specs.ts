import { Point } from '@/types/game';

export const BALL_MAX_DISTANCE_WITHOUT_HOLDER = 8000;
export const BALL_MAX_SPEED = 400;
export const PLAYER_MAX_SPEED = 100;

export const FIELD_WIDTH = 20000;
export const FIELD_HEIGHT = 10000;
export const FIELD_CENTER_RADIUS = 1000;

export const PLAYER_SIZE = 400;
export const GOALKEEPER_NUMBER = 1;
export const GOALKEEPER_WIDTH = PLAYER_SIZE * 2.3;

export const PLAYER_RADIUS = 200;
export const BALL_RADIUS = 100;
export const GOAL_RADIUS = 1400;

export const HOME_GOAL_TOP: Point = { x: 0, y: 6500 };
export const HOME_GOAL_CENTER: Point = { x: 0, y: 5000 };
export const HOME_GOAL_BOTTOM: Point = { x: 0, y: 3500 };

export const AWAY_GOAL_TOP: Point = { x: FIELD_WIDTH, y: 6500 };
export const AWAY_GOAL_CENTER: Point = { x: FIELD_WIDTH, y: 5000 };
export const AWAY_GOAL_BOTTOM: Point = { x: FIELD_WIDTH, y: 3500 };

export const HOME_GOAL_TOP_45: Point = { x: 989.9494936611663, y: 7489.949493661166 };
export const HOME_GOAL_BOTTOM_45: Point = { x: 989.9494936611663, y: 2510.050506338833 };
export const HOME_GOAL_TOP_MID_TOP: Point = { x: 1400, y: 5750 };
export const HOME_GOAL_TOP_MID_BOTTOM: Point = { x: 1400, y: 4250 };

export const AWAY_GOAL_TOP_45: Point = { x: 19010.050506338834, y: 7489.949493661166 };
export const AWAY_GOAL_BOTTOM_45: Point = { x: 19010.050506338834, y: 2510.0505063388337 };
export const AWAY_GOAL_TOP_MID_TOP: Point = { x: 18600, y: 5750 };
export const AWAY_GOAL_TOP_MID_BOTTOM: Point = { x: 18600, y: 4250 };

export const FIELD_POINT_1: Point = { x: 0, y: 0 };
export const FIELD_POINT_2: Point = { x: FIELD_WIDTH, y: 0 };
export const FIELD_POINT_3: Point = { x: FIELD_WIDTH, y: FIELD_HEIGHT };
export const FIELD_POINT_4: Point = { x: 0, y: FIELD_HEIGHT };

export const FIELD_POINT_1_WITH_BALL_RADIUS: Point = { x: BALL_RADIUS, y: BALL_RADIUS };
export const FIELD_POINT_2_WITH_BALL_RADIUS: Point = {
    x: FIELD_WIDTH - BALL_RADIUS,
    y: BALL_RADIUS,
};
export const FIELD_POINT_3_WITH_BALL_RADIUS: Point = {
    x: FIELD_WIDTH - BALL_RADIUS,
    y: FIELD_HEIGHT - BALL_RADIUS,
};
export const FIELD_POINT_4_WITH_BALL_RADIUS: Point = {
    x: BALL_RADIUS,
    y: FIELD_HEIGHT - BALL_RADIUS,
};

export const FIELD_POINT_CENTER: Point = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2 };

// Tempo do chute mais rápido possível para o gol, o chute mais rápido é o chute mais forte 400 de velocidade a menor distância que é 1400 (área do gol)
export const TIME_OF_FAST_KICK = 3.6681957508301024;
// Distância máxima que o goleiro consegue percorrer no tempo do chute mais rápido
export const MAX_DISTANCE_TO_GOALKEEPER_IN_MIN_KICK_TIME = 366.81957508301025;

// Distância mínima que a bola deve estar para ser chutada e ser uma ameaça ao gol
export const MIN_BALL_AREA_TO_THREATEN_GOAL = 4575;

export const BALL_ACCELERATION = -10;

export const PLAYER_JUMP_SPEED = 200;
export const PLAYER_JUMP_TIME = 3;
