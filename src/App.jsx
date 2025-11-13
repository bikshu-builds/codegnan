import React, { useEffect, useState } from "react";

export default function PatientsSection() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // for modal

  useEffect(() => {
    fetch("https://doc-back.onrender.com/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20 animate-pulse">
        <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading patients...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 py-20">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 inline-block">
          <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="font-semibold">Error: {error}</p>
        </div>
      </div>
    );

  const maleAvatar = "https://cdn-icons-png.flaticon.com/512/219/219983.png";
  const femaleAvatar = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";

  return (
    <section className="text-gray-600 body-font bg-gradient-to-b from-gray-50 to-white">
      {/* same animations and styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card-animate { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .card-animate:nth-child(1) { animation-delay: 0.1s; }
        .card-animate:nth-child(2) { animation-delay: 0.2s; }
        .card-animate:nth-child(3) { animation-delay: 0.3s; }
        .patient-card { transition: all 0.3s ease; }
        .patient-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); }
        .avatar-img { transition: transform 0.3s ease; }
        .patient-card:hover .avatar-img { transform: scale(1.1) rotate(5deg); }
        .contact-link { transition: all 0.3s ease; }
        .contact-link:hover { transform: translateX(5px); color: #4f46e5; }
        .contact-link svg { transition: transform 0.3s ease; }
      `}</style>

      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 uppercase">
            PATIENT RECORDS
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-2">
            Registered Patients List
          </h1>
          <div className="w-20 h-1 bg-indigo-500 rounded mx-auto mt-4"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 md:w-1/3 card-animate">
              <div className="patient-card flex rounded-lg h-full bg-white border-2 border-gray-200 p-8 flex-col shadow-md hover:border-indigo-300">
                <div className="flex items-center mb-3">
                  <img
                    src={patient.gender?.toLowerCase() === "female" ? femaleAvatar : maleAvatar}
                    alt={patient.gender}
                    className="avatar-img w-10 h-10 mr-3 rounded-full border-2 border-indigo-500"
                  />
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    {patient.name}
                  </h2>
                </div>

                <div className="flex-grow">
                  <p className="leading-relaxed text-base mb-2">
                    <span className="font-semibold text-gray-700">Age:</span>{" "}
                    <span className="text-gray-600">{patient.age}</span>
                  </p>
                  <p className="leading-relaxed text-base mb-2">
                    <span className="font-semibold text-gray-700">Gender:</span>{" "}
                    <span className="text-gray-600">{patient.gender}</span>
                  </p>
                  <p className="leading-relaxed text-base mb-2">
                    <span className="font-semibold text-gray-700">Disease:</span>{" "}
                    <span className="text-gray-600">{patient.disease}</span>
                  </p>
                  <p className="leading-relaxed text-base mb-2">
                    <span className="font-semibold text-gray-700">Doctor:</span>{" "}
                    <span className="text-gray-600">
                      {patient.doctor?.name} ({patient.doctor?.specialization})
                    </span>
                  </p>

                  <div className="flex justify-between mt-3">
                    <a
                      href={`mailto:${patient.email}`}
                      className="contact-link text-indigo-500 inline-flex items-center font-medium"
                    >
                      Contact
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>

                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
              <button
                onClick={() => setSelectedPatient(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedPatient.gender?.toLowerCase() === "female" ? femaleAvatar : maleAvatar}
                  alt={selectedPatient.gender}
                  className="w-20 h-20 mb-4 rounded-full border-4 border-indigo-500"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedPatient.name}</h2>
                <p className="text-gray-500 mb-4">{selectedPatient.disease}</p>

                <div className="text-left w-full">
                  <p><strong>Age:</strong> {selectedPatient.age}</p>
                  <p><strong>Weight:</strong> {selectedPatient.weight}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                  <p><strong>Email:</strong> {selectedPatient.email}</p>
                  <p><strong>Password:</strong> {selectedPatient.password}</p>
                  <p><strong>Doctor:</strong> {selectedPatient.doctor?.name} ({selectedPatient.doctor?.specialization})</p>
                </div>

                <button
                  onClick={() => setSelectedPatient(null)}
                  className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
