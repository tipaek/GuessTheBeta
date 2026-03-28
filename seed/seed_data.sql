-- Seed data for GuessTheBeta MVP
-- Board gyms (Kilter, Tension, Moon)

INSERT INTO gyms (name, slug, city, state, country, is_board, board_type) VALUES
  ('Kilter Board', 'kilter', NULL, NULL, NULL, true, 'kilter'),
  ('Tension Board', 'tension', NULL, NULL, NULL, true, 'tension'),
  ('Moon Board', 'moon', NULL, NULL, NULL, true, 'moon');

-- Sample Kilter Board routes (gym_id = 1)
INSERT INTO routes (gym_id, name, grade, grade_sort, photo_url, board_layout_id, setter) VALUES
  (1, 'Warm Up Flow', 'V2', 2, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V2+Kilter', 'KB-001', 'Community'),
  (1, 'Crimp City', 'V4', 4, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V4+Kilter', 'KB-002', 'Community'),
  (1, 'Dyno King', 'V5', 5, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V5+Kilter', 'KB-003', 'Community'),
  (1, 'Toe Hook Special', 'V6', 6, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V6+Kilter', 'KB-004', 'Community'),
  (1, 'The Compressor', 'V7', 7, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V7+Kilter', 'KB-005', 'Community'),
  (1, 'Slab Master', 'V3', 3, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V3+Kilter', 'KB-006', 'Community'),
  (1, 'Power Endurance', 'V8', 8, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V8+Kilter', 'KB-007', 'Community'),
  (1, 'Easy Jug Haul', 'V0', 0, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V0+Kilter', 'KB-008', 'Community'),
  (1, 'Pinch and Go', 'V5', 5, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V5+Kilter+2', 'KB-009', 'Community'),
  (1, 'Roof Problem', 'V9', 9, 'https://placehold.co/400x600/1a1a2e/e85d3a?text=V9+Kilter', 'KB-010', 'Community');

-- Sample Tension Board routes (gym_id = 2)
INSERT INTO routes (gym_id, name, grade, grade_sort, photo_url, board_layout_id, setter) VALUES
  (2, 'Tension Intro', 'V1', 1, 'https://placehold.co/400x600/16213e/3b82f6?text=V1+Tension', 'TB-001', 'Community'),
  (2, 'Shoulder Press', 'V4', 4, 'https://placehold.co/400x600/16213e/3b82f6?text=V4+Tension', 'TB-002', 'Community'),
  (2, 'Campus Ladder', 'V6', 6, 'https://placehold.co/400x600/16213e/3b82f6?text=V6+Tension', 'TB-003', 'Community'),
  (2, 'Body Tension', 'V5', 5, 'https://placehold.co/400x600/16213e/3b82f6?text=V5+Tension', 'TB-004', 'Community'),
  (2, 'The Crimp Test', 'V7', 7, 'https://placehold.co/400x600/16213e/3b82f6?text=V7+Tension', 'TB-005', 'Community'),
  (2, 'Sloper City', 'V3', 3, 'https://placehold.co/400x600/16213e/3b82f6?text=V3+Tension', 'TB-006', 'Community'),
  (2, 'Coordination', 'V8', 8, 'https://placehold.co/400x600/16213e/3b82f6?text=V8+Tension', 'TB-007', 'Community'),
  (2, 'Juggy Fun', 'V0', 0, 'https://placehold.co/400x600/16213e/3b82f6?text=V0+Tension', 'TB-008', 'Community');

-- Sample Moon Board routes (gym_id = 3)
INSERT INTO routes (gym_id, name, grade, grade_sort, photo_url, board_layout_id, setter) VALUES
  (3, 'Moon Warmup', 'V3', 3, 'https://placehold.co/400x600/78350f/fbbf24?text=V3+Moon', 'MB-001', 'Community'),
  (3, 'Classic Moon', 'V5', 5, 'https://placehold.co/400x600/78350f/fbbf24?text=V5+Moon', 'MB-002', 'Community'),
  (3, 'Moon Dyno', 'V6', 6, 'https://placehold.co/400x600/78350f/fbbf24?text=V6+Moon', 'MB-003', 'Community'),
  (3, 'Heel Hook Master', 'V7', 7, 'https://placehold.co/400x600/78350f/fbbf24?text=V7+Moon', 'MB-004', 'Community'),
  (3, 'The Benchmark', 'V4', 4, 'https://placehold.co/400x600/78350f/fbbf24?text=V4+Moon', 'MB-005', 'Community'),
  (3, 'Power Problem', 'V8', 8, 'https://placehold.co/400x600/78350f/fbbf24?text=V8+Moon', 'MB-006', 'Community'),
  (3, 'Moon Slab', 'V2', 2, 'https://placehold.co/400x600/78350f/fbbf24?text=V2+Moon', 'MB-007', 'Community');

-- Sample beta videos (placeholder YouTube-style URLs)
INSERT INTO beta_videos (route_id, video_url, source, climber, sort_order) VALUES
  (1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'ClimbHard', 0),
  (2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'BetaBoss', 0),
  (2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'SendTrain', 1),
  (3, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'FlashMaster', 0),
  (4, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'CrimpKing', 0),
  (5, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'PowerClimber', 0),
  (11, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'TensionPro', 0),
  (12, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'BoardSender', 0),
  (19, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'MoonChild', 0),
  (20, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'ClassicSender', 0);
