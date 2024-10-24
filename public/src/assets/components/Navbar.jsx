const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-gray-100 text-gray-800 shadow-md font-poppins">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-black mb-10 text-center border-b-2 border-gray-300 pb-2">
          Toko MUJI
        </h1>
        <ul className="menu p-2">
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Beranda
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Pria
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Wanita
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Anak-anak
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Aksesori
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 active:text-gray-700 font-semibold transition duration-200"
            >
              Kontak
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
