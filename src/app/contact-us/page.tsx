'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import FloatingLabelTextarea from '@/components/ui/FloatingLabelTextarea';
import { phoneNumber } from '@/config';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-[#0f172a]">
      <div className='h-[40px] md:h-[80px] rounded-t-full bg-white w-full'></div>
      <div className="bg-white pb-16 md:pb-24">
        <div className="w-[95%] mx-auto pb-8 md:pb-12">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h1>
        </div>

        {/* Google Map Section */}
        <div className="w-[95%] mx-auto h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.2509571789665!2d76.7351599!3d30.655061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390febe2429184cd%3A0x4b77a8032453bb88!2s541%2C%20Sector%2082%2C%20JLPL%20Industrial%20Area%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140306!5e0!3m2!1sen!2sin!4v1750321617630!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Form and Details Section */}
        <div className="w-[95%] mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side: Get in Touch Form */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Leave us a quick message, we will get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingLabelInput id="firstName" label="First Name*" value={formData.firstName} onChange={handleChange} required />
                  <FloatingLabelInput id="lastName" label="Last Name*" value={formData.lastName} onChange={handleChange} required />
                </div>
                <FloatingLabelInput id="email" label="Email*" type="email" value={formData.email} onChange={handleChange} required />
                <FloatingLabelInput id="phone" label="Phone" type="tel" value={formData.phone} onChange={handleChange} />
                <FloatingLabelTextarea id="message" label="Message" rows={5} value={formData.message} onChange={handleChange} required />
                <div>
                  <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors" disabled={status === 'Sending...'}>
                    {status.includes('Sending') ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {status && <p className="text-sm mt-4">{status}</p>}
              </form>
            </div>

            {/* Right Side: Contact Details */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Contact details</h3>
              <p className="text-gray-600 mb-8">
                You cn directly contact us at these details
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">541, Sector 82, JLPL Industrial Area, Sahibzada Ajit Singh Nagar, Punjab 140306.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">luxurymachines82@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">{phoneNumber}</p>
                  </div>
                </div>
              </div>
              <hr className="my-8" />
              <div className='flex gap-4'>
                <h4 className="font-semibold text-gray-800 mb-4">Follow us on</h4>
                <div className="flex space-x-4">
                 
                  <Link href="#" className="text-gray-500 hover:text-blue-600"><Instagram className="w-6 h-6" /></Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
