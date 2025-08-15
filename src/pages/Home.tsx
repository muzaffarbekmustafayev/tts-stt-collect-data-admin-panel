import Dashboard from '@/sections/Dashboard';
import { useData } from '@/contexts/DataContext';
import Loader from '@/components/loading/Loader';

const Home = () => {
  const { usersData, audiosData, checkedAudiosData, sentencesData, loading, error } = useData();

  // Combine all data for the dashboard
  const data = {
    sentences: sentencesData,
    users: usersData,
    audios: audiosData,
    checked_audios: checkedAudiosData
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return <Dashboard data={data} />;
};

export default Home;


// import { useState } from 'react';
// import Sidebar from '@/sections/Sidebar';
// import Dashboard from '@/sections/Dashboard';
// import { useData } from '@/contexts/DataContext';
// import Loader from '@/components/loading/Loader';

// const AdminPanel = () => {
  
//   const [editingItem, setEditingItem] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Statistics calculation
//   const stats = {
//     totalSentences: data.sentences.length,
//     totalUsers: data.users.length,
//     totalAudios: data.audios.length,
//     approvedAudios: data.checked_audios.filter(a => a.status === 'approved').length
//   };

//   const renderContent = () => {

//     const tableConfigs = {
//       sentences: {
//         columns: [
//           { key: 'id', label: 'ID' },
//           { key: 'text', label: 'Text' },
//           { key: 'language', label: 'Language' },
//           { key: 'category', label: 'Category' },
//           { key: 'status', label: 'Status', render: (status) => (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}>
//               {status}
//             </span>
//           )},
//           { key: 'created_at', label: 'Created At' }
//         ],
//         editFields: [
//           { key: 'text', label: 'Text', type: 'textarea' },
//           { key: 'language', label: 'Language', type: 'select', options: [
//             { value: 'en', label: 'English' },
//             { value: 'uz', label: 'Uzbek' },
//             { value: 'ru', label: 'Russian' }
//           ]},
//           { key: 'category', label: 'Category' },
//           { key: 'status', label: 'Status', type: 'select', options: [
//             { value: 'active', label: 'Active' },
//             { value: 'inactive', label: 'Inactive' }
//           ]}
//         ]
//       },
//       users: {
//         columns: [
//           { key: 'id', label: 'ID' },
//           { key: 'username', label: 'Username' },
//           { key: 'email', label: 'Email' },
//           { key: 'role', label: 'Role', render: (role) => (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
//             }`}>
//               {role}
//             </span>
//           )},
//           { key: 'created_at', label: 'Created At' },
//           { key: 'last_login', label: 'Last Login' }
//         ],
//         editFields: [
//           { key: 'username', label: 'Username' },
//           { key: 'email', label: 'Email', type: 'email' },
//           { key: 'role', label: 'Role', type: 'select', options: [
//             { value: 'user', label: 'User' },
//             { value: 'admin', label: 'Admin' }
//           ]}
//         ]
//       },
//       audios: {
//         columns: [
//           { key: 'id', label: 'ID' },
//           { key: 'filename', label: 'Filename' },
//           { key: 'sentence_id', label: 'Sentence ID' },
//           { key: 'user_id', label: 'User ID' },
//           { key: 'duration', label: 'Duration (s)' },
//           { key: 'quality', label: 'Quality', render: (quality) => (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               quality === 'high' ? 'bg-green-100 text-green-800' : 
//               quality === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
//               'bg-red-100 text-red-800'
//             }`}>
//               {quality}
//             </span>
//           )},
//           { key: 'created_at', label: 'Created At' }
//         ],
//         editFields: [
//           { key: 'filename', label: 'Filename' },
//           { key: 'sentence_id', label: 'Sentence ID', type: 'number' },
//           { key: 'user_id', label: 'User ID', type: 'number' },
//           { key: 'duration', label: 'Duration', type: 'number' },
//           { key: 'quality', label: 'Quality', type: 'select', options: [
//             { value: 'high', label: 'High' },
//             { value: 'medium', label: 'Medium' },
//             { value: 'low', label: 'Low' }
//           ]}
//         ]
//       },
//       checked_audios: {
//         columns: [
//           { key: 'id', label: 'ID' },
//           { key: 'audio_id', label: 'Audio ID' },
//           { key: 'checker_id', label: 'Checker ID' },
//           { key: 'status', label: 'Status', render: (status) => (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               status === 'approved' ? 'bg-green-100 text-green-800' : 
//               status === 'rejected' ? 'bg-red-100 text-red-800' : 
//               'bg-yellow-100 text-yellow-800'
//             }`}>
//               {status}
//             </span>
//           )},
//           { key: 'score', label: 'Score' },
//           { key: 'notes', label: 'Notes' },
//           { key: 'checked_at', label: 'Checked At' }
//         ],
//         editFields: [
//           { key: 'audio_id', label: 'Audio ID', type: 'number' },
//           { key: 'checker_id', label: 'Checker ID', type: 'number' },
//           { key: 'status', label: 'Status', type: 'select', options: [
//             { value: 'pending', label: 'Pending' },
//             { value: 'approved', label: 'Approved' },
//             { value: 'rejected', label: 'Rejected' }
//           ]},
//           { key: 'score', label: 'Score', type: 'number' },
//           { key: 'notes', label: 'Notes', type: 'textarea' }
//         ]
//       }
//     };

//     const config = tableConfigs[currentPage];
//     if (config) {
//       return <DataTable tableName={currentPage} columns={config.columns} editFields={config.editFields} />;
//     }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return <Dashboard data={data} />;
// };

// export default AdminPanel;