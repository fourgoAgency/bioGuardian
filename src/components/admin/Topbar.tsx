import Image from "next/image";
import logo from '@/../public/Logo png.png'
export default function Topbar() {

  return (
    <header className="flex items-center px-6 py-4 ml-96 mr-5 bg-white border-b">
      <input
        type="text"
        placeholder="Search dashboard..."
        className="px-4 py-2 border rounded-md w-full max-w-md"
      />
      <div className="w-12 h-12 bg-gray-300 rounded-full ml-4 flex items-center justify-center">
        <Image src={logo} width={35} height={40} alt="User" className="mb-2" />
      </div>
    </header>
  );
}