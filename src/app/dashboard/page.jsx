// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

// const page = () => {
//     return (
//         <div>
//             <Navbar />
//              {/* Main Dashboard Content */}
//       <main className="min-h-screen px-6 py-10">
//         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//         <p className="text-gray-600">
//           Welcome to your dashboard! Here you can manage your profile, check
//           updates, and explore project features.
//         </p>
//       </main>
//             <Footer />
//         </div>
//     );
// };

// export default page;
// dashboard/page.jsx (Server Component by default)
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <div>
      
      {/* Main Dashboard Content */}
      <main className="min-h-screen px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! Here you can manage your profile, check
          updates, and explore project features.
        </p>
      </main>
    
    </div>
  );
}
