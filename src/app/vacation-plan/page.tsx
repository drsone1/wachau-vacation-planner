import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function VacationPlanDocument() {
  const { t } = useTranslation('common');
  const [vacationPlan, setVacationPlan] = useState({
    customerName: 'John Smith',
    bookingReference: 'BK123456',
    dates: '2025-06-15 to 2025-06-20',
    duration: '5 days',
    people: '2',
    accommodation: {
      name: 'Hotel Schloss Dürnstein',
      address: 'Dürnstein 2, 3601 Dürnstein, Austria',
      checkIn: '2025-06-15',
      checkOut: '2025-06-20',
      roomType: 'Double Room with Danube View',
      confirmationNumber: 'HD78912'
    },
    itinerary: [
      {
        day: 1,
        date: 'June 15, 2025',
        activities: [
          { time: '14:00', description: 'Check-in at Hotel Schloss Dürnstein' },
          { time: '16:00', description: 'Welcome drink and orientation at hotel terrace' },
          { time: '18:30', description: 'Dinner at Restaurant Richard Löwenherz (reservation confirmed)' }
        ]
      },
      {
        day: 2,
        date: 'June 16, 2025',
        activities: [
          { time: '09:00', description: 'Breakfast at hotel' },
          { time: '10:30', description: 'Bike rental pickup at Nextbike Krems (reservation confirmed)' },
          { time: '11:00', description: 'Guided biking tour through Wachau vineyards' },
          { time: '13:30', description: 'Lunch at Heurigen Schwaighofer (reservation confirmed)' },
          { time: '15:30', description: 'Wine tasting at Domäne Wachau' },
          { time: '19:00', description: 'Dinner at Alter Klosterkeller (reservation confirmed)' }
        ]
      },
      {
        day: 3,
        date: 'June 17, 2025',
        activities: [
          { time: '08:30', description: 'Breakfast at hotel' },
          { time: '10:00', description: 'Visit to Melk Abbey (tickets included)' },
          { time: '13:00', description: 'Lunch at Stiftsrestaurant Melk (reservation confirmed)' },
          { time: '15:00', description: 'Danube River Cruise from Melk to Dürnstein (tickets included)' },
          { time: '19:30', description: 'Dinner at Restaurant Loibnerhof-Knoll (reservation confirmed)' }
        ]
      },
      {
        day: 4,
        date: 'June 18, 2025',
        activities: [
          { time: '09:00', description: 'Breakfast at hotel' },
          { time: '10:30', description: 'Hiking tour to Dürnstein Castle ruins' },
          { time: '13:30', description: 'Picnic lunch at vineyard viewpoint (provided)' },
          { time: '16:00', description: 'Visit to Krems Arts District and Caricature Museum' },
          { time: '19:00', description: 'Wine pairing dinner at hotel restaurant (reservation confirmed)' }
        ]
      },
      {
        day: 5,
        date: 'June 19, 2025',
        activities: [
          { time: '09:30', description: 'Breakfast at hotel' },
          { time: '11:00', description: 'Check-out and departure' }
        ]
      }
    ],
    reservations: [
      { type: 'Restaurant', name: 'Restaurant Richard Löwenherz', date: 'June 15, 2025', time: '18:30', reference: 'RL45678' },
      { type: 'Restaurant', name: 'Heurigen Schwaighofer', date: 'June 16, 2025', time: '13:30', reference: 'HS23456' },
      { type: 'Restaurant', name: 'Alter Klosterkeller', date: 'June 16, 2025', time: '19:00', reference: 'AK34567' },
      { type: 'Restaurant', name: 'Stiftsrestaurant Melk', date: 'June 17, 2025', time: '13:00', reference: 'SM56789' },
      { type: 'Restaurant', name: 'Restaurant Loibnerhof-Knoll', date: 'June 17, 2025', time: '19:30', reference: 'LK67890' },
      { type: 'Activity', name: 'Bike Rental - Nextbike Krems', date: 'June 16, 2025', time: '10:30', reference: 'NB12345' },
      { type: 'Activity', name: 'Melk Abbey Tickets', date: 'June 17, 2025', time: '10:00', reference: 'MA78901' },
      { type: 'Activity', name: 'Danube River Cruise', date: 'June 17, 2025', time: '15:00', reference: 'DC89012' }
    ],
    contacts: [
      { name: 'Hotel Schloss Dürnstein', phone: '+43 2711 212', address: 'Dürnstein 2, 3601 Dürnstein, Austria' },
      { name: 'Nextbike Krems', phone: '+43 2732 82742', address: 'Südtiroler Platz 4, 3500 Krems an der Donau, Austria' },
      { name: 'Domäne Wachau', phone: '+43 2711 371', address: 'Dürnstein 107, 3601 Dürnstein, Austria' },
      { name: 'Melk Abbey', phone: '+43 2752 555', address: 'Abt-Berthold-Dietmayr-Straße 1, 3390 Melk, Austria' },
      { name: 'Emergency Contact', phone: '+43 123 456789', address: 'Wachau Vacation Planner Office, Krems, Austria' }
    ],
    paymentSummary: {
      accommodation: 1200,
      activities: 350,
      serviceFee: 155,
      total: 1705
    }
  });

  const generatePDF = () => {
    // In a real implementation, this would generate a PDF document
    alert('PDF generation would be implemented in the production version');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Wachau Vacation Plan</h1>
              <button
                onClick={generatePDF}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Download PDF
              </button>
            </div>
            <p className="mt-2">Booking Reference: {vacationPlan.bookingReference}</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Customer Information</h2>
              <p><strong>Name:</strong> {vacationPlan.customerName}</p>
              <p><strong>Dates:</strong> {vacationPlan.dates}</p>
              <p><strong>Duration:</strong> {vacationPlan.duration}</p>
              <p><strong>Number of People:</strong> {vacationPlan.people}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Accommodation</h2>
              <p><strong>Hotel:</strong> {vacationPlan.accommodation.name}</p>
              <p><strong>Address:</strong> {vacationPlan.accommodation.address}</p>
              <p><strong>Check-in:</strong> {vacationPlan.accommodation.checkIn}</p>
              <p><strong>Check-out:</strong> {vacationPlan.accommodation.checkOut}</p>
              <p><strong>Room Type:</strong> {vacationPlan.accommodation.roomType}</p>
              <p><strong>Confirmation Number:</strong> {vacationPlan.accommodation.confirmationNumber}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Itinerary</h2>
              {vacationPlan.itinerary.map((day) => (
                <div key={day.day} className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Day {day.day}: {day.date}</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      {day.activities.map((activity, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2 px-4 border-b border-gray-200 font-medium w-24">{activity.time}</td>
                          <td className="py-2 px-4 border-b border-gray-200">{activity.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Reservations</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left border-b border-gray-200">Type</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Name</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Date</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Time</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationPlan.reservations.map((reservation, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b border-gray-200">{reservation.type}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{reservation.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{reservation.date}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{reservation.time}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{reservation.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Important Contacts</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left border-b border-gray-200">Name</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Phone</th>
                    <th className="py-2 px-4 text-left border-b border-gray-200">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationPlan.contacts.map((contact, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b border-gray-200">{contact.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{contact.phone}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{contact.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Payment Summary</h2>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200">Accommodation</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right">€{vacationPlan.paymentSummary.accommodation.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Activities & Reservations</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right">€{vacationPlan.paymentSummary.activities.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200">Service Fee</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right">€{vacationPlan.paymentSummary.serviceFee.toFixed(2)}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2 px-4 border-b border-gray-200">Total</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right">€{vacationPlan.paymentSummary.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Important Notes</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Please arrive at least 15 minutes before any scheduled activity or reservation.</li>
                <li>Restaurant reservations can be modified up to 24 hours in advance by contacting us.</li>
                <li>In case of emergency, please contact our 24/7 support line.</li>
                <li>Weather in the Wachau region can be variable; we recommend bringing layers and rain protection.</li>
                <li>For bike rentals, please bring your booking confirmation and a valid ID.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-2">Disclaimer:</p>
              <p>This vacation plan has been prepared based on your preferences and our local expertise. While we make every effort to ensure all reservations and activities are confirmed, we are not responsible for changes or cancellations made by third-party providers. In case of any issues, please contact our support team immediately for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
