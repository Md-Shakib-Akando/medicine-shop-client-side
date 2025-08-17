import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
const ContactUs = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_z7pk6lk', 'template_4mfpzro', form.current, {
                publicKey: '0xKtJEBU2HsMUg5eI',
            })
            .then(
                () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Message sent successfully!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    e.target.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to send message.',
                    });
                }
            );
    };
    return (
        <div className="max-w-11/12 mx-auto p-6 dark:bg-base-100 ">
            <div className="flex flex-col md:flex-row md:justify-around gap-10 md:my-28">

                <div className="py-6 md:py-0 md:px-6 ">
                    <h1 className="text-4xl font-bold">Get in touch</h1>
                    <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Dhaka, Bangladesh</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>+880 1234 56789</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>support@medicineshop.com</span>
                        </p>
                    </div>
                </div>


                <div className='md:border-r md:border-[#00afb9] dark:md:border-gray-600'></div>


                <div className="md:w-1/2">
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"


                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="Write your message here..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-[#00afb9] border-[#00afb9] text-white font-semibold rounded-md transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;