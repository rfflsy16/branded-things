import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import productsData from "./product.json";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderProducts = () => {
    return currentProducts.map((product) => (
      <div
        key={product.id}
        className="card bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-300 rounded-lg overflow-hidden"
      >
        <figure>
          <img
            src={product.imgUrl}
            alt={product.name}
            className="h-64 w-full object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-black font-semibold">
            {product.name}
          </h2>
          <p className="text-gray-700">{product.description}</p>
          <div className="card-actions justify-between mt-4">
            <span className="text-lg font-bold text-black">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <button className="btn bg-gray-300 text-black hover:bg-gray-600 active:bg-gray-800 transition duration-200 rounded-lg">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 p-8 w-full bg-gradient-to-b from-gray-200 to-gray-400 font-poppins">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-black">
            Belanja Koleksi Terbaru Kami
          </h2>
          <p className="text-gray-600">Temukan gaya minimalis di MUJI</p>
        </div>

        {/* Search and Sort Section */}
        <div className="flex justify-center mb-8 space-x-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <select
            onChange={handleSort}
            value={sortOrder}
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-gray-400"
          >
            <option value="asc">Urutkan: Rendah ke Tinggi</option>
            <option value="desc">Urutkan: Tinggi ke Rendah</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderProducts()}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn bg-gray-300 text-black mx-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
          >
            Prev
          </button>
          <span className="text-lg">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn bg-gray-300 text-black mx-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
