export const sentences = [
  { id: 1, text: "Hello, how are you today?", language: "en", category: "greeting", created_at: "2024-01-15", status: "active" },
  { id: 2, text: "Please speak clearly", language: "en", category: "instruction", created_at: "2024-01-14", status: "active" },
  { id: 3, text: "Thank you for your help", language: "en", category: "gratitude", created_at: "2024-01-13", status: "inactive" }
]
export const users = [
  { id: 1, username: "admin", email: "admin@example.com", role: "admin", created_at: "2024-01-01", last_login: "2024-01-15" },
  { id: 2, username: "user1", email: "user1@example.com", role: "user", created_at: "2024-01-10", last_login: "2024-01-14" },
  { id: 3, username: "user2", email: "user2@example.com", role: "user", created_at: "2024-01-12", last_login: "2024-01-13" }
]
export const audios = [
  { id: 1, filename: "audio_001.wav", sentence_id: 1, user_id: 2, duration: 3.5, quality: "high", created_at: "2024-01-15" },
  { id: 2, filename: "audio_002.wav", sentence_id: 2, user_id: 3, duration: 2.8, quality: "medium", created_at: "2024-01-14" },
  { id: 3, filename: "audio_003.wav", sentence_id: 1, user_id: 2, duration: 4.1, quality: "high", created_at: "2024-01-13" }
]
export const checked_audios = [
  { id: 1, audio_id: 1, checker_id: 1, status: "approved", score: 9.5, notes: "Excellent quality", checked_at: "2024-01-15" },
  { id: 2, audio_id: 2, checker_id: 1, status: "rejected", score: 6.0, notes: "Background noise", checked_at: "2024-01-14" },
  { id: 3, audio_id: 3, checker_id: 1, status: "pending", score: null, notes: "", checked_at: null }
]