import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { laptopData } from './data/laptopData';

function App() {
  const [staffName, setStaffName] = useState('');

  // Dropdown States
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedSeriesId, setSelectedSeriesId] = useState('');

  // Manual Input States
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [customSeries, setCustomSeries] = useState('');

  // Tagged State
  const [tagged, setTagged] = useState('');

  const [entries, setEntries] = useState([]);

  // Derived state for dropdown options
  const selectedBrand = laptopData.find(b => b.id === selectedBrandId);
  const models = selectedBrand ? selectedBrand.models : [];

  const selectedModel = models.find(m => m.id === selectedModelId);
  const seriesList = selectedModel ? selectedModel.series : [];

  // Reset dependent fields when parent changes
  useEffect(() => {
    if (selectedBrandId !== 'other') {
      setSelectedModelId('');
      setSelectedSeriesId('');
      setCustomBrand(''); // Clear custom brand if switching back to dropdown
    }
  }, [selectedBrandId]);

  useEffect(() => {
    if (selectedModelId !== 'other') {
      setSelectedSeriesId('');
      setCustomModel(''); // Clear custom model if switching back to dropdown
    }
  }, [selectedModelId]);

  useEffect(() => {
    if (selectedSeriesId !== 'other') {
      setCustomSeries('');
    }
  }, [selectedSeriesId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine final values
    const finalBrand = selectedBrandId === 'other' ? customBrand : selectedBrand?.name;
    const finalModel = selectedModelId === 'other' || selectedBrandId === 'other' ? customModel : selectedModel?.name;
    const finalSeries = selectedSeriesId === 'other' || selectedModelId === 'other' || selectedBrandId === 'other' ? customSeries : seriesList.find(s => s.id === selectedSeriesId)?.name;

    // Validation
    if (!staffName) { alert('Please enter Staff Name'); return; }
    if (!selectedBrandId) { alert('Please select a Brand'); return; }
    if (selectedBrandId === 'other' && !customBrand) { alert('Please enter Custom Brand'); return; }

    // Logic for dependent manual entries needs care. 
    // If Brand is OTHER, then Model and Series MUST be manual (conceptually).

    if (selectedBrandId !== 'other') {
      if (!selectedModelId) { alert('Please select a Model'); return; }
      if (selectedModelId === 'other' && !customModel) { alert('Please enter Custom Model'); return; }

      if (selectedModelId !== 'other') {
        if (!selectedSeriesId) { alert('Please select a Series'); return; }
        if (selectedSeriesId === 'other' && !customSeries) { alert('Please enter Custom Series'); return; }
      } else {
        // Model is other, so series must be manual
        if (!customSeries) { alert('Please enter Custom Series'); return; }
      }
    } else {
      // Brand is other, so model and series must be manual
      if (!customModel) { alert('Please enter Custom Model'); return; }
      if (!customSeries) { alert('Please enter Custom Series'); return; }
    }

    if (!tagged) { alert('Please select Tagged status (Yes/No)'); return; }

    const newEntry = {
      Staff: staffName,
      Brand: finalBrand,
      Model: finalModel,
      Series: finalSeries,
      Tagged: tagged
    };

    setEntries([...entries, newEntry]);

    // Reset form selectively
    setStaffName('');
    setSelectedBrandId('');
    setCustomBrand('');
    setCustomModel('');
    setCustomSeries('');
    setTagged('');
  };

  const exportToExcel = () => {
    if (entries.length === 0) return;

    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laptop Requests");
    XLSX.writeFile(wb, "ACET Laptop_Tagging_Requests.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 lg:grid-cols-5">

        {/* Left Column: Form (2/5 width on large screens) */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:col-span-2 h-fit">
          <div className="bg-indigo-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Laptop Tagging</h1>
            <p className="text-indigo-200 text-sm mt-1">Select your device preferences</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="staffName" className="block text-sm font-medium text-gray-700 mb-1">
                  Staff Name
                </label>
                <input
                  type="text"
                  id="staffName"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter Name"
                />
              </div>

              {/* BRAND SELECTION */}
              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <select
                  id="brand"
                  value={selectedBrandId}
                  onChange={(e) => setSelectedBrandId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="">Select Brand</option>
                  {laptopData.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
                {selectedBrandId === 'other' && (
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="Enter Brand Name"
                    className="w-full px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none animate-fade-in"
                    autoFocus
                  />
                )}
              </div>

              {/* MODEL SELECTION */}
              <div className="space-y-2">
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                {/* Rule: If Brand is 'other', show text input directly. Else show dropdown. */}
                {selectedBrandId === 'other' ? (
                  <input
                    type="text"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="Enter Model Name"
                    className="w-full px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                ) : (
                  <>
                    <select
                      id="model"
                      value={selectedModelId}
                      onChange={(e) => setSelectedModelId(e.target.value)}
                      disabled={!selectedBrandId}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white ${!selectedBrandId ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                    >
                      <option value="">Select Model</option>
                      {models.map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                    {selectedModelId === 'other' && (
                      <input
                        type="text"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                        placeholder="Enter Model Name"
                        className="w-full px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none animate-fade-in"
                        autoFocus
                      />
                    )}
                  </>
                )}
              </div>

              {/* SERIES SELECTION */}
              <div className="space-y-2">
                <label htmlFor="series" className="block text-sm font-medium text-gray-700">
                  Series
                </label>
                {/* Rule: If Brand OR Model is 'other', show text input directly. Else show dropdown. */}
                {selectedBrandId === 'other' || selectedModelId === 'other' ? (
                  <input
                    type="text"
                    value={customSeries}
                    onChange={(e) => setCustomSeries(e.target.value)}
                    placeholder="Enter Series Name"
                    className="w-full px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                ) : (
                  <>
                    <select
                      id="series"
                      value={selectedSeriesId}
                      onChange={(e) => setSelectedSeriesId(e.target.value)}
                      disabled={!selectedModelId}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white ${!selectedModelId ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                    >
                      <option value="">Select Series</option>
                      {seriesList.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                    {selectedSeriesId === 'other' && (
                      <input
                        type="text"
                        value={customSeries}
                        onChange={(e) => setCustomSeries(e.target.value)}
                        placeholder="Enter Series Name"
                        className="w-full px-4 py-2 border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none animate-fade-in"
                        autoFocus
                      />
                    )}
                  </>
                )}
              </div>

              {/* TAGGED FIELD */}
              <div className="space-y-2">
                <label htmlFor="tagged" className="block text-sm font-medium text-gray-700">
                  Tagged
                </label>
                <select
                  id="tagged"
                  value={tagged}
                  onChange={(e) => setTagged(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add to List</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Table and Export (3/5 width) */}
        <div className="lg:col-span-3 flex flex-col h-full space-y-4">

          {/* Header / Export Button */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Session Entries</h2>
              <p className="text-sm text-gray-500">{entries.length} items ready</p>
            </div>

            <button
              onClick={exportToExcel}
              disabled={entries.length === 0}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-all ${entries.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200 hover:shadow-green-300 shadow-lg'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Excel</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="flex-grow bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Series</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tagged</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <p>No entries added yet.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.Staff}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Series}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.Tagged === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {entry.Tagged}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
