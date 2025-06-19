import React, { TextareaHTMLAttributes } from 'react';

interface FloatingLabelTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({ label, id, ...props }) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        className="block px-3 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelTextarea;
