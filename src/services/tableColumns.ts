export const usersColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'telegram_id', label: 'Telegram ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'age', label: 'Age', type: 'number', required: true },
  { key: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }], required: true },
  // { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'info', label: 'Info', width: 'w-3/12', type: 'textarea' },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const userStatisticsColumns = [
  { key: 'user_id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', noedit: true },
  { key: 'telegram_id', label: 'Telegram ID', type: 'number', noedit: true },
  { key: 'info', label: 'Info', type: 'textarea', noedit: true },
  { key: 'sent_audio_count', label: 'Sent Audio Count', type: 'number' },
  { key: 'sent_audio_minutes', label: 'Sent Audio Minutes', type: 'number' },
  { key: 'checked_audio_count', label: 'Checked Audio Count', type: 'number' },
  { key: 'checked_audio_minutes', label: 'Checked Audio Minutes', type: 'number' },
  { key: 'pending_audio_count', label: 'Pending Audio Count', type: 'number' },
  { key: 'pending_checked_audio_count', label: 'Pending Checked Audio Count', type: 'number' }
]

export const adminUsersColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'username', label: 'Username', type: 'text', required: true, name: 'username'},
  { key: 'is_active', label: 'Is Active', type: 'select', options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }] },
  { key: 'password', label: 'Password', type: 'password', required: true, name: 'password', noshow: true},
  { key: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'admin' }, { label: 'Super Admin', value: 'superadmin' }, {label: "Checker", value: "checker"}] },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const adminUsersColumnsUpdate = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'username', label: 'Username', type: 'text', required: true, name: 'username'},
  { key: 'is_active', label: 'Is Active', type: 'select', options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }] },
  { key: 'password', label: 'New Password (Optional)', type: 'password', name: 'new_password', noshow: true},
  { key: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'admin' }, { label: 'Super Admin', value: 'superadmin' }, {label: "Checker", value: "checker"}] },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const sentencesColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'text', label: 'Text', width: 'w-6/12', type: 'textarea', required: true },
  { key: 'language', label: 'Language', type: 'text', defaultValue: 'uz' },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const audiosColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'user_name', label: 'User Name', type: 'text', noedit: true },
  { key: 'user_id', label: 'User ID', type: 'text', noedit: true },
  { key: 'sentence', label: 'Sentence', type: 'text', noedit: true },
  { key: 'sentence_id', label: 'Sentence ID', type: 'text', required: true, is_reference: true, reference: 'sentences' },
  { key: 'audio_path', label: 'Audio', type: 'audio_url' },
  { key: 'duration', label: 'Duration (s)', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }] },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const checkedAudiosColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'audio_id', label: 'Audio ID', type: 'text', required: true, is_reference: true, reference: 'audios' },
  { key: 'user_name', label: 'User', type: 'text', noedit: true },
  { key: 'sentence', label: 'Sentence', type: 'text', noedit: true },
  { key: 'checked_by_name', label: 'Checked By', type: 'text', noedit: true },
  { key: 'is_correct', label: 'Is Correct', type: 'select', options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }], required: true },
  { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }] },
  { key: 'checked_at', label: 'Checked At', type: 'date' },
  { key: 'second_checker_name', label: 'Second Checker', type: 'text', noedit: true },
  { key: 'second_check_result', label: 'Second Check Result', type: 'select', options: [{ label: '-', value: 'null' }, { label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }] },
  { key: 'second_checked_at', label: 'Second Checked At', type: 'date' },
]
