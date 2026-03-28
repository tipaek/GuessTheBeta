-- Gyms (also used for board types like Kilter, Tension, Moon)
CREATE TABLE gyms (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    slug        VARCHAR(100) UNIQUE NOT NULL,
    city        VARCHAR(100),
    state       VARCHAR(50),
    country     VARCHAR(50) DEFAULT 'US',
    logo_url    TEXT,
    is_board    BOOLEAN DEFAULT FALSE,
    board_type  VARCHAR(20),
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- Climbing routes
CREATE TABLE routes (
    id              BIGSERIAL PRIMARY KEY,
    gym_id          BIGINT NOT NULL REFERENCES gyms(id),
    name            VARCHAR(200),
    grade           VARCHAR(20) NOT NULL,
    grade_sort      INT NOT NULL,
    photo_url       TEXT NOT NULL,
    board_layout_id VARCHAR(100),
    setter          VARCHAR(100),
    color           VARCHAR(30),
    active          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_routes_gym ON routes(gym_id);
CREATE INDEX idx_routes_grade ON routes(grade_sort);
CREATE INDEX idx_routes_gym_grade ON routes(gym_id, grade_sort) WHERE active;

-- Beta videos for each route
CREATE TABLE beta_videos (
    id          BIGSERIAL PRIMARY KEY,
    route_id    BIGINT NOT NULL REFERENCES routes(id),
    video_url   TEXT NOT NULL,
    source      VARCHAR(50),
    climber     VARCHAR(100),
    thumbnail   TEXT,
    duration_s  INT,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_beta_videos_route ON beta_videos(route_id);

-- Users (Google OAuth)
CREATE TABLE users (
    id              BIGSERIAL PRIMARY KEY,
    google_id       VARCHAR(200) UNIQUE NOT NULL,
    email           VARCHAR(300) NOT NULL,
    display_name    VARCHAR(100),
    avatar_url      TEXT,
    preferred_gym   BIGINT REFERENCES gyms(id),
    min_grade       INT DEFAULT 0,
    max_grade       INT DEFAULT 17,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- User climb history
CREATE TABLE user_climb_history (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id),
    route_id    BIGINT NOT NULL REFERENCES routes(id),
    viewed_at   TIMESTAMPTZ DEFAULT now(),
    watched_beta BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, route_id)
);

CREATE INDEX idx_history_user ON user_climb_history(user_id, viewed_at DESC);
