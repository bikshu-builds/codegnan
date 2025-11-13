import React, { useEffect, useState } from "react";

export default function PatientsSection() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

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
    <section className="text-gray-600 body-font bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .card-animate {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .card-animate:nth-child(1) { animation-delay: 0.1s; }
        .card-animate:nth-child(2) { animation-delay: 0.2s; }
        .card-animate:nth-child(3) { animation-delay: 0.3s; }
        .card-animate:nth-child(4) { animation-delay: 0.15s; }
        .card-animate:nth-child(5) { animation-delay: 0.25s; }
        .card-animate:nth-child(6) { animation-delay: 0.35s; }
        .card-animate:nth-child(7) { animation-delay: 0.2s; }
        .card-animate:nth-child(8) { animation-delay: 0.3s; }
        .card-animate:nth-child(9) { animation-delay: 0.4s; }

        .patient-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .patient-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .avatar-img {
          transition: transform 0.3s ease;
        }
        .patient-card:hover .avatar-img {
          transform: scale(1.15) rotate(8deg);
        }

        .contact-link {
          transition: all 0.3s ease;
        }
        .contact-link:hover {
          transform: translateX(5px);
          color: #4f46e5;
        }
        .contact-link svg {
          transition: transform 0.3s ease;
        }
        .contact-link:hover svg {
          transform: translateX(3px);
        }

        .view-details-btn {
          transition: all 0.3s ease;
          position: relative;
        }
        .view-details-btn:hover {
          transform: translateX(3px);
        }

        .header-animate {
          animation: fadeIn 0.8s ease-out;
        }

        .info-badge {
          transition: all 0.2s ease;
          border-radius: 4px;
        }
        .patient-card:hover .info-badge {
          background-color: #eef2ff;
          padding-left: 12px;
        }

        .modal-backdrop {
          animation: modalFadeIn 0.3s ease-out;
        }
        .modal-content {
          animation: slideIn 0.3s ease-out;
        }

        .modal-info-item {
          transition: all 0.2s ease;
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .modal-info-item:hover {
          background-color: #f3f4f6;
          transform: translateX(4px);
        }

        .close-btn {
          transition: all 0.2s ease;
        }
        .close-btn:hover {
          transform: rotate(90deg) scale(1.1);
        }

        @media (max-width: 768px) {
          .patient-card:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>

      <div className="container px-4 sm:px-5 py-12 sm:py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12 sm:mb-20 header-animate">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 uppercase">
            PATIENT RECORDS
          </h2>
          <h1 className="text-2xl sm:text-3xl font-medium title-font text-gray-900 mt-2">
            Registered Patients List
          </h1>
          <div className="w-20 h-1 bg-indigo-500 rounded mx-auto mt-4"></div>
        </div>

        <div className="flex flex-wrap -m-2 sm:-m-4">
          {patients.map((patient) => (
            <div key={patient.id} className="p-2 sm:p-4 w-full sm:w-1/2 lg:w-1/3 card-animate">
              <div className="patient-card flex rounded-lg h-full bg-white border-2 border-gray-200 p-6 sm:p-8 flex-col shadow-md hover:border-indigo-300">
                <div className="flex items-center mb-3">
                  <img
                    src={patient.gender?.toLowerCase() === "female" ? femaleAvatar : maleAvatar}
                    alt={patient.gender}
                    className="avatar-img w-10 h-10 sm:w-12 sm:h-12 mr-3 rounded-full border-2 border-indigo-500"
                  />
                  <h2 className="text-gray-900 text-base sm:text-lg title-font font-medium">
                    {patient.name}
                  </h2>
                </div>

                <div className="flex-grow">
                  <p className="info-badge leading-relaxed text-sm sm:text-base mb-2 py-1 px-2">
                    <span className="font-semibold text-gray-700">Age:</span>{" "}
                    <span className="text-gray-600">{patient.age}</span>
                  </p>
                  <p className="info-badge leading-relaxed text-sm sm:text-base mb-2 py-1 px-2">
                    <span className="font-semibold text-gray-700">Gender:</span>{" "}
                    <span className="text-gray-600">{patient.gender}</span>
                  </p>
                  <p className="info-badge leading-relaxed text-sm sm:text-base mb-2 py-1 px-2">
                    <span className="font-semibold text-gray-700">Disease:</span>{" "}
                    <span className="text-gray-600">{patient.disease}</span>
                  </p>
                  <p className="info-badge leading-relaxed text-sm sm:text-base mb-2 py-1 px-2">
                    <span className="font-semibold text-gray-700">Doctor:</span>{" "}
                    <span className="text-gray-600">
                      {patient.doctor?.name} ({patient.doctor?.specialization})
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-3">
                    <a
                      href={`mailto:${patient.email}`}
                      className="contact-link text-indigo-500 inline-flex items-center font-medium text-sm sm:text-base"
                    >
                      Contact
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>

                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="view-details-btn text-indigo-600 font-semibold hover:text-indigo-800 transition text-sm sm:text-base"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPatient && (
          <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="modal-content bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md relative max-h-screen overflow-y-auto">
              <button
                onClick={() => setSelectedPatient(null)}
                className="close-btn absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedPatient.gender?.toLowerCase() === "female" ? femaleAvatar : maleAvatar}
                  alt={selectedPatient.gender}
                  className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full border-4 border-indigo-500"
                />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{selectedPatient.name}</h2>
                <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">{selectedPatient.disease}</p>

                <div className="text-left w-full space-y-1">
                  <div className="modal-info-item">
                    <strong className="text-gray-700">Age:</strong> <span className="text-gray-600">{selectedPatient.age}</span>
                  </div>
                  <div className="modal-info-item">
                    <strong className="text-gray-700">Weight:</strong> <span className="text-gray-600">{selectedPatient.weight}</span>
                  </div>
                  <div className="modal-info-item">
                    <strong className="text-gray-700">Gender:</strong> <span className="text-gray-600">{selectedPatient.gender}</span>
                  </div>
                  <div className="modal-info-item">
                    <strong className="text-gray-700">Doctor:</strong> <span className="text-gray-600">{selectedPatient.doctor?.name} ({selectedPatient.doctor?.specialization})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPatient(null)}
                  className="mt-6 bg-indigo-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
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