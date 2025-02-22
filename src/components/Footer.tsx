import { Link } from "react-router-dom";
import logo from "../assets/images/logoname.png";


const Footer: React.FC = () => {
  
    return (
<footer className="bg-white shadow dark:bg-gray-900">
     <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/home" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} className="w-40 h-18" alt="Logo" />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/" className="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link to="/" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                </li>

                <li>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">MyWorks</Link>. All Rights Reserved.</span>
    </div>
 </footer>
    );
  };
  


  
  export default Footer;
  