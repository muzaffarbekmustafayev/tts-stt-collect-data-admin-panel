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

export const adminUsersColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'username', label: 'Username', type: 'text', required: true, name: 'username'},
  { key: 'is_active', label: 'Is Active', type: 'select', options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }] },
  { key: 'password', label: 'Password', type: 'password', required: true, name: 'password', noshow: true},
  { key: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'Admin' }, { label: 'Super Admin', value: 'superdmin' }] },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const adminUsersColumnsUpdate = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'username', label: 'Username', type: 'text', required: true, name: 'username'},
  { key: 'is_active', label: 'Is Active', type: 'select', options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }] },
  { key: 'password', label: 'New Password (Optional)', type: 'password', name: 'new_password', noshow: true},
  { key: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'Admin' }, { label: 'Super Admin', value: 'superdmin' }] },
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
  { key: 'user_id', label: 'User ID', type: 'text', required: true, is_reference: true, reference: 'users' },
  { key: 'sentence_id', label: 'Sentence ID', type: 'text', required: true, is_reference: true, reference: 'sentences' },
  { key: 'sentence', label: 'Sentence', type: 'text', noedit: true },
  { key: 'audio_path', label: 'Audio Path', type: 'audio_url' },
  { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'Pending' }, { label: 'Checked', value: 'Checked' }, { label: 'Rejected', value: 'Rejected' }] },
  { key: 'created_at', label: 'Created At', type: 'date' },
]

export const checkedAudiosColumns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'audio_id', label: 'Audio ID', type: 'text', required: true, is_reference: true, reference: 'audios' },
  { key: 'checked_by', label: 'Checked By', type: 'text', required: true, is_reference: true, reference: 'users' },
  { key: 'comment', label: 'Comment', width: 'w-2/12', type: 'textarea' },
  { key: 'is_correct', label: 'Is Correct', type: 'select', options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }], required: true },
  { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'Pending' }, { label: 'Checked', value: 'Checked' }, { label: 'Rejected', value: 'Rejected' }] },
  { key: 'checked_at', label: 'Checked At', type: 'date' },
]
