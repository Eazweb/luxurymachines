import React from 'react';

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({ 
  firstName, 
  lastName, 
  email, 
  phone, 
  message 
}) => (
  <div>
    <h1>New Inquiry from {firstName} {lastName}</h1>
    <p><strong>Email:</strong> {email}</p>
    {phone && <p><strong>Phone:</strong> {phone}</p>}
    <p><strong>Message:</strong></p>
    <p>{message}</p>
  </div>
);

export default ContactFormEmail;
