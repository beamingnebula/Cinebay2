import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 font-['Netflix_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-2">Cineby</h3>
          <p className="text-gray-400 text-sm max-w-2xl">
            This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-[#666666] text-[13px] font-light">
            <Link to="/legal" className="hover:text-gray-400 transition-colors">
              contact@cineby.app
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;