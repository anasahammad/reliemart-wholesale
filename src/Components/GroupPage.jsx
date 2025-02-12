import React from 'react';
import { Facebook, PhoneIcon as WhatsApp, Video, Globe } from 'lucide-react';

const GroupPage = () => {
  const groups = [
    {
      name: 'Facebook Page',
      description: 'Follow our official page for news.',
      icon: Globe,
      link: 'https://www.facebook.com/yourpage',
      buttonText: 'Follow Page',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Facebook Group',
      description: 'Join our community for updates.',
      icon: Facebook,
      link: 'https://www.facebook.com/groups/yourgroup',
      buttonText: 'Join Group',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'WhatsApp Group',
      description: 'Get instant notifications.',
      icon: WhatsApp,
      link: 'https://chat.whatsapp.com/your-invite-code',
      buttonText: 'Join WhatsApp',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Google Meet',
      description: 'Attend weekly video meetings.',
      icon: Video,
      link: 'https://meet.google.com/your-meeting-code',
      buttonText: 'Join Meet',
      color: 'bg-[#F4511E] hover:bg-red-700',
    },
  ];

  return (
    <div className=" bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Join Our Community</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                    <group.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                <a
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-2 px-3 rounded text-white text-sm text-center font-medium ${group.color} transition duration-300 ease-in-out hover:opacity-90`}
                >
                  {group.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default GroupPage;