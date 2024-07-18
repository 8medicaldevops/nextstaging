import logo from '../assets/images/logo.png';

export default function NavBar()  {
    return(
        <div className='flex justify-between px-16 py-6 items-center'>
            <div>
               <img src={logo} alt='' />
            </div>
            <div>
                <ul className='flex gap-6 font-light font-brreg text-sm text-[#636066]'>
                    <li className='border-b-2 border-ev-700 px-1 text-ev-700 font-semibold cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About Us</li>
                    <li className=' flex gap-1 items-center cursor-pointer'>Services <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.7653 3.26529L4.2653 5.76529C4.23046 5.80025 4.18906 5.82799 4.14348 5.84692C4.0979 5.86584 4.04903 5.87559 3.99967 5.87559C3.95032 5.87559 3.90145 5.86584 3.85587 5.84692C3.81029 5.82799 3.76889 5.80025 3.73405 5.76529L1.23405 3.26529C1.1636 3.19484 1.12402 3.09929 1.12402 2.99967C1.12402 2.90004 1.1636 2.80449 1.23405 2.73404C1.3045 2.66359 1.40005 2.62402 1.49967 2.62402C1.5993 2.62402 1.69485 2.66359 1.7653 2.73404L3.99999 4.96873L6.23467 2.73373C6.30512 2.66328 6.40067 2.6237 6.5003 2.6237C6.59993 2.6237 6.69548 2.66328 6.76592 2.73373C6.83637 2.80418 6.87595 2.89972 6.87595 2.99935C6.87595 3.09898 6.83637 3.19453 6.76592 3.26498L6.7653 3.26529Z" fill="#636066"/>
</svg>
</li>
                    <li className='cursor-pointer'>Impact</li>
                    <li className='cursor-pointer'>Blog</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>
            </div>
        </div>
    );
}