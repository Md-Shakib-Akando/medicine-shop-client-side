import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqImage from '../../assets/FAQs-bro.png';

const Faq = () => {
    const faqs = [
        {
            question: "What is the best way to store medicine?",
            answer: "Store medicine in a cool, dry place, away from direct sunlight and moisture, unless otherwise directed on the label."
        },
        {
            question: "How can I check the expiration date of a medicine?",
            answer: "The expiration date is usually printed on the packaging or label of the medicine. Always check it before use."
        },
        {
            question: "What should I do if I miss a dose of my medication?",
            answer: "If you miss a dose, take it as soon as you remember. If it is close to the next dose, skip the missed dose and continue your regular schedule."
        },
        {
            question: "How should I dispose of expired or unused medicines?",
            answer: "Dispose of expired or unused medicines by taking them to a pharmacy or following local disposal guidelines. Avoid flushing them down the toilet."
        },
        {
            question: "Can I store different medicines together in one container?",
            answer: "It is not recommended to store different medicines together as it can lead to confusion and potential mix-ups."
        },
        {
            question: "What precautions should I take when buying over-the-counter medicines?",
            answer: "Always check the label for active ingredients, expiration date, and potential side effects before purchasing over-the-counter medicines."
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        if (openIndex === index) {
            setOpenIndex(null); // close if same index is clicked
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className="py-10 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold my-6 sm:my-10 text-center">
                Frequently Asked Questions
            </h2>
            <div className="lg:flex items-center lg:mx-5 2xl:mx-36 xl:mx-24">
                <div className="flex-1">
                    <img className="2xl:w-10/12 mx-auto" src={faqImage} alt="FAQ Illustration" />
                </div>

                <div className="p-4 max-w-7xl mx-auto lg:w-[50%] xl:mr-2 2xl:mr-0 lg:mr-7">

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="mb-5 border rounded-lg"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200"
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? (
                                    <FaChevronUp className="w-5 h-5" />
                                ) : (
                                    <FaChevronDown className="w-5 h-5" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-4 py-3 text-gray-700 bg-white">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
