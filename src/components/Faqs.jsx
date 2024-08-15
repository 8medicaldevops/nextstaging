import { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom";
 


// const faqs = {
//   Individuals: {
//     questions: {
//       q1: 'Are all HMOs accepted?',
//       q2: 'How do I subcribe to emergency services?',
//       q3: 'Do you do interstate transport?',
//       q4: 'Are you active in all states?',
//       q5: 'When is a service booking considered to be confirmed?',
//       q6: 'How do I reach you?',
//     },
//     answers: {
//       a1: 'No, you can find a list of accepted HMOs when booking the service.',
//       a2: 'You can subscribe to our services by clicking the "Subscribe now" button or the link below and selecting a plan that best fits your needs.',
//       a3: 'Yes, we transport patients to all states.',
//       a4: 'No, we are only actively present in Lagos.',
//       a5: 'Payment confirms your booking.',
//       a6: 'You can reach us via phone call on 08098888763 or via mail at hello@8medical.co',
//     },
//   },
//   // Add similar objects for other categories
//   EventPlanners: {
//     questions: {
//       q1: 'What services do you offer?',
//       q2: 'How can I book your services?',
//       q3: 'What is your cancellation policy?',
//       q4: 'Do you offer custom event planning?',
//       q5: 'Can you handle large-scale events?',
//       q6: 'What is the payment schedule?',
//     },
//     answers: {
//       a1: 'We offer full-service event planning, including catering, decor, and entertainment.',
//       a2: 'You can book our services through our website or by contacting us directly.',
//       a3: 'Our cancellation policy varies based on the service. Please contact us for details.',
//       a4: 'Yes, we offer custom event planning tailored to your needs.',
//       a5: 'Yes, we have experience handling events with over 500 attendees.',
//       a6: 'We require a deposit upfront, with the balance due before the event.',
//     },
//   },
//   Hospitals: {
//     questions: {
//       q1: 'Do you pick up from all hospitals?',
//       q2: 'Do you transport patients  to all hospitals?',
//       q3: 'How do we Signup as an Hospital?',
//       q4: 'Do you transport out of Lagos?',
      
//     },
//     answers: {
//       a1: 'Yes, we pick up patients from any location.',
//       a2: 'YES, we transport to all hospitals but we use certain hospitals during emergencies.',
//       a3: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a4: 'Yes, we transport (ground and air) patients to all states and even as far as West African countries.',
      
//     },
//   },
//   Estates: {
//     questions: {
//       q1: 'How do we Signup as an Estate?',
//       q2: 'What offer does Eight Medical have for Estates?',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//     },
//   },
//   Schools: {
//     questions: {
//       q1: 'How do we Signup as a School?',
//       q2: 'How does Eight Medical cater for Schools?',
//       q3: 'Do you accept HMOs',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'We offer ambulance standby, transport and emergency response services as well as overseeing school clinical services',
//       a3: 'No, we do not accept HMOs',
//     },
//   },
//   ProductionCompanies: {
//     questions: {
//       q1: 'How do we Signup for ambulance services?',
//       q2: 'How long is an ambulance standby?',
//       q3: 'Do you cover productions outside Lagos?',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'Standby durations are dependent on the production duration with a minimum of 4 hours.',
//       a3: 'Yes, we cover productions outside Lagos',
//     },
//   },
//   HMOs: {
//     questions: {
//       q1: 'Do you accept HMOs?',
//       q2: 'Are all HMOs accepted?',
//       q3: 'How do we Signup as an HMO?',
      
      
//     },
//     answers: {
//       a1: 'Yes, all you need is your enrollee ID to allow us validate your claim.',
//       a2: 'No, you can find a list of accepted HMOs when booking the service.',
//       a3: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//     },
//   },
//   Responders: {
//     questions: {
//       q1: 'Do I have to work with Eight Medical to be a responder?',
//       q2: 'How do I become a responder with Eight medical?',
//       q3: 'What is the minimum requirement to become a responder?',
//       q4: 'Who is a responder in Eight Medical?',
      
      
//     },
//     answers: {
//       a1: 'No, you can volunteer or work part-time with us.',
//       a2: 'Apply for the role via the button below or send an email to human@8medical.co or call 08098888763.',
//       a3: 'Background in healthcare, can communicate in English.',
//       a4: 'A responder is anyone who directly or indirectly provide care for individuals or businesses in need (urgent and emergency cases).',
//     },
//   },
//   // Add other categories (Hospitals, Estates, Schools, ProductionCompanies, HMOs) similarly
// };



const AccordionComponent = ({ category }) => {
  const [faq, setFaq] = useState({});
  const { questions, answers } = faq[category] || { questions: {}, answers: {} };
 
  useEffect(()=>{
    async function fetchFAQs() {
      try {
        const response = await axios.get(import.meta.env.VITE_FAQS_API);
        
        // Handle the response data
        setFaq(response.data.faqs)
        console.log(response.data.faqs);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching FAQs:', error);
      }
      
    }
  fetchFAQs()  
  },[])

 
  
  return (
    <Accordion type="single" collapsible>
      {Object.keys(questions).map((key, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger> 
            <div className="flex items-center font-brsemi justify-between text-left gap-3 max-mm:gap-3"> 
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.125 0.75C6.51803 0.75 4.94714 1.22652 3.611 2.11931C2.27485 3.0121 1.23344 4.28105 0.618482 5.7657C0.00352044 7.25035 -0.157382 8.88401 0.156123 10.4601C0.469628 12.0362 1.24346 13.4839 2.37976 14.6202C3.51606 15.7565 4.9638 16.5304 6.5399 16.8439C8.11599 17.1574 9.74966 16.9965 11.2343 16.3815C12.719 15.7666 13.9879 14.7252 14.8807 13.389C15.7735 12.0529 16.25 10.482 16.25 8.875C16.2477 6.72081 15.391 4.65551 13.8677 3.13227C12.3445 1.60903 10.2792 0.752275 8.125 0.75ZM8.125 13.875C7.93958 13.875 7.75833 13.82 7.60416 13.717C7.44999 13.614 7.32982 13.4676 7.25887 13.2963C7.18791 13.125 7.16934 12.9365 7.20552 12.7546C7.24169 12.5727 7.33098 12.4057 7.46209 12.2746C7.5932 12.1435 7.76025 12.0542 7.94211 12.018C8.12396 11.9818 8.31246 12.0004 8.48377 12.0714C8.65507 12.1423 8.80149 12.2625 8.90451 12.4167C9.00752 12.5708 9.0625 12.7521 9.0625 12.9375C9.0625 13.1861 8.96373 13.4246 8.78792 13.6004C8.6121 13.7762 8.37364 13.875 8.125 13.875ZM8.75 10.0688V10.125C8.75 10.2908 8.68416 10.4497 8.56695 10.5669C8.44974 10.6842 8.29076 10.75 8.125 10.75C7.95924 10.75 7.80027 10.6842 7.68306 10.5669C7.56585 10.4497 7.5 10.2908 7.5 10.125V9.5C7.5 9.33424 7.56585 9.17527 7.68306 9.05806C7.80027 8.94085 7.95924 8.875 8.125 8.875C9.1586 8.875 10 8.17188 10 7.3125C10 6.45312 9.1586 5.75 8.125 5.75C7.09141 5.75 6.25 6.45312 6.25 7.3125V7.625C6.25 7.79076 6.18416 7.94973 6.06695 8.06694C5.94974 8.18415 5.79076 8.25 5.625 8.25C5.45924 8.25 5.30027 8.18415 5.18306 8.06694C5.06585 7.94973 5 7.79076 5 7.625V7.3125C5 5.76172 6.40157 4.5 8.125 4.5C9.84844 4.5 11.25 5.76172 11.25 7.3125C11.25 8.67031 10.175 9.80703 8.75 10.0688Z" fill="#6D09F9"/>
            </svg>
            <div>
            {questions[key]}
            </div>
            </div>
            </AccordionTrigger>
          <AccordionContent >
            <div className="font-brreg text-base">
              {answers[`a${key.substring(1)}`]}
            </div>
            </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default function Faqs() {
  const [activeElement, setActiveElement] = useState("Individuals");
  const navigate = useNavigate();

  const toggleElement = (element) => {
    setActiveElement(element);
  };

  const handleSelect = (value) => {
setActiveElement(value)
  };

  return (
    <div className=" flex flex-col gap-12 py-20 px-[180px] w-full max-lg:py-12 max-lg:px-4 md:max-[1413px]:px-0 md:max-[1413px]:w-[90%]">
      <div className="text-center ">
        <p className="font-brsemi text-[40px] text-[#181719]">FAQs</p>
        <p className="font-brreg text-lg text-[#636066]  text-center">We have answered some of the most reoccurring questions we get<br/> from users.</p>
      </div>
      <div className="flex gap-12 px-6 max-lg:flex-col ">
            <div className="lg:hidden">
              <Select onValueChange={handleSelect} >
                <SelectTrigger className="w-[240px] rounded-mm border-[1px] border-[#E4E3E5] font-brmedium text-[#181719] ">
                    <SelectValue placeholder="Individuals" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-mm">
                    <SelectItem value="Individuals">Individuals</SelectItem>
                    <SelectItem value="Event Planners">Event Planners</SelectItem>
                    <SelectItem value="Hospitals">Hospitals</SelectItem>
                    <SelectItem value="Estates">Estates</SelectItem>
                    <SelectItem value="Schools">Schools</SelectItem>
                    <SelectItem value="Production Companies">Production Companies</SelectItem>
                    <SelectItem value="HMO's">HMOs</SelectItem>
                </SelectContent>
                </Select>
                </div>
        <main className="flex flex-col gap-1 py-6 w-1/3 cursor-pointer max-lg:hidden ">
          <p onClick={() => toggleElement("Individuals")} className={activeElement === "Individuals" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Individuals</p>
          <p onClick={() => toggleElement("Event Planners")} className={activeElement === "Event Planners" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Event Planners</p>
          <p onClick={() => toggleElement("Hospitals")} className={activeElement === "Hospitals" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Hospitals</p>
          <p onClick={() => toggleElement("Estates")} className={activeElement === "Estates" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Estates</p>
          <p onClick={() => toggleElement("Schools")} className={activeElement === "Schools" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Schools</p>
          <p onClick={() => toggleElement("Production Companies")} className={activeElement === "Production Companies" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >Production Companies</p>
          <p onClick={() => toggleElement("HMO's")} className={activeElement === "HMO's" ? "bg-ev-700 text-sm font-brreg text-white pt-2 pl-6 pb-2 pr-3 rounded-mm " : "text-sm font-brreg text-[#636066] pt-2 pl-6 pb-2 pr-3 "} >HMOs</p>
        </main>
        <aside className="w-full">
          <AccordionComponent category={activeElement} />
        </aside>
      </div>
      <div className="flex justify-center py-12 px-[120px]  gap-12 rounded-[100px] bg-[url(./assets/images/Banner.png)] max-sm:px-2 bg-[#F8F4FE] max-lg:flex-col max-lg:rounded-xl max-lg:items-center md:max-[1413px]:px-24">
                    <p className="font-brsemi text-[32px] text-[#181719] max-lg:text-center max-lg:text-2xl max-lg:w-[268px] max-sm:w-full ">Do you have any more question for us?</p>
                    <button onClick={()=>{navigate("/OtherBookings")}} className="text-white py-3 px-5 gap-1  rounded-[49px] bg-ev-700 font-brbold text-lg  ">Contact Us</button>
        </div>
    </div>
  );
}
