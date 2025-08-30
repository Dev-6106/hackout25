'use client';

export default function ReportPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      
    >
      {/* Overlay to make text readable */}
      <div className="bg-green-900/40 min-h-screen px-6 py-10 pt-24">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-50 text-center drop-shadow-lg">
          Submit a Report
        </h1>
        <p className="text-green-100 mb-10 text-center text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
          Use this form to quickly submit a report. (This is a demo form, no backend connected yet.)
        </p>

        {/* Report Form */}
        <form className="bg-green-50 shadow-lg rounded-2xl p-8 max-w-lg mx-auto border border-green-200">
          <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Report Form</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">Report Title</label>
            <input
              type="text"
              placeholder="Enter report title"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">Category</label>
            <select className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100">
              <option>Bug</option>
              <option>Feedback</option>
              <option>System Issue</option>
              <option>Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">Description</label>
            <textarea
              rows="4"
              placeholder="Describe the issue or feedback..."
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-green-700 font-medium mb-2">Attach Screenshot (optional)</label>
            <input
              type="file"
              className="w-full border border-green-300 rounded-lg px-3 py-2 bg-green-100 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={() => alert("Report submitted (demo only)!")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition shadow-md"
          >
            Submit Report
          </button>
        </form>

        {/* Motivation Section */}
        <div className="mt-12 text-center text-green-50">
          <p className="mb-2 font-medium">Empower your community and help protect mangroves!</p>
          <p>Track illegal activities, submit reports, and contribute to conservation.</p>
        </div>
      </div>
    </div>
  );
}