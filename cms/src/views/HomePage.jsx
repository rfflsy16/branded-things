import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import Toastify from "toastify-js";
import Navbar from "../components/Navbar";

export default function HomePage({ base_url }) {
  //   const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      console.log(base_url);
      setProduct(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function priceBeingRupiah(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  function handleEdit(e, id) {
    e.preventDefault();

    Navigate(`/edit/${id}`);
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${base_url}/apis/branded-things/products/${id}`,
        { Authorization: `Bearer ${localStorage.access_token}` }
      );
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "bg-red-800",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("inii fetch product");
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex flex-col items-center mt-32">
          <img src={loading} className="size-16" alt="Loading..." />
          <p className="text-lg font-semibold text-gray-700">
            fetching data...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto p-10 bg-white">
          <table className="table text-black">
            {/* head */}
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-r from-blue-50 to-indigo-50">
              {/* rows */}
              {product
                .slice()
                .reverse()
                .map((el) => {
                  return (
                    <tr
                      key={el.id}
                      className="hover:bg-gradient-to-r from-blue-100 to-indigo-100"
                    >
                      <td>
                        <div className="avatar flex flex-col items-center">
                          <div className="mask mask-squircle h-16 w-16">
                            <img src={el.imgUrl} alt={el.name} />
                          </div>
                          <Link to={`/edit-image/${el.id}`}>
                            <button className="cursor-pointer text-xs text-blue-600 mt-1">
                              Edit image
                            </button>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-800">
                              {el.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="max-w-96 text-gray-700">
                          {el.description}
                        </p>
                      </td>
                      <td>
                        <p className="text-gray-700">
                          {priceBeingRupiah(el.price)}
                        </p>
                      </td>
                      <td>
                        <p className="text-gray-700">{el.stock}</p>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-primary btn-sm hover:btn-secondary"
                            onClick={(event) => handleEdit(event, el.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error btn-sm hover:bg-red-600"
                            onClick={(event) => handleDelete(event, el.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
