import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import NavBar from "../shared-components/NavBar/NavBar";
import SquareSpinner from "../shared-components/Spinners/SquareSpinner";
import {getProduct, placeOrder} from "../../API/API";
import {useAuth} from "../../hooks/useAuth";

function CheckoutPage() {
  const {id} = useParams();
  const auth = useAuth();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const artwork = await getProduct(id);
        setProduct(artwork);
      } catch(error) {
        console.log(error.message);
      } 
    } 
    fetchProduct();
  }, []);

  const handleOrderPlacing = () => {
    const order = {
      name: product.name,
      price: product.price,
      artistName: product.artistName,
      imageURL: product.imageURL,
      uid: auth.user.uid,
      date: new Date().getTime(),
      email: auth.user.email
    }
    placeOrder(order).then(result => {
      history.push('/orders')
    }).catch(err => {
      console.log(err)
    });
  }

  return (
    <div>
      <NavBar />
      <div className='max-w-md px-8 py-8 mx-auto sm:max-w-xl lg:max-w-6xl lg:px-12'>
        <h1 className='mb-10 text-5xl font-bold text-center text-gray-800 text-shadow-lg'>Checkout</h1>
        { product == null ? <SquareSpinner /> : 
          <>
            <div className='overflow-x-auto'>
              <table className='w-full bg-white shadow-lg'>
                <thead className='border-b-2 border-indigo-400'>
                  <tr className='text-gray-600'>
                    <th className='px-8 py-4 text-left'>Description</th>
                    <th className='px-8 py-4 text-center'>Quantity</th>
                    <th className='px-8 py-4 text-center'>Price</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700'>
                  <tr>
                    <td className='px-8 py-4 '>{product?.name} by <i>{product.artistName}</i></td>
                    <td className='px-8 py-4 text-center'>1</td>
                    <td className='px-8 py-4 text-right'>${product.price}</td>
                  </tr>
                </tbody>
                <tfoot className='font-bold text-gray-800 border-t-2 border-indigo-400'>
                  <tr>
                    <td className='px-8 py-4' colSpan='2'>Total</td>
                    <td className='px-8 py-4 text-right'>${product.price}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='flex flex-row-reverse'>
              <button onClick={handleOrderPlacing} className=' m-4 block px-3 py-2 rounded-lg transform transition bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm text-white shadow  cursor-pointer '>Checkout</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default CheckoutPage;

