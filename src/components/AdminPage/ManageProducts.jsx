import React, {useState, useEffect} from 'react';
import {getAllProducts, deleteProduct} from '../../API/API';

function ManageProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch(error) {
        console.log(error.message)
      }  
    }  
    fetchProducts();
  }, []);

  const removeArrayElt = (a, n) => {
    const newArray = a.slice(0);
    newArray.splice(n, 1);
    return newArray;
  }
  const handleProductDelete = (id, idx) => {
    deleteProduct(id).then(r => {
      setProducts(removeArrayElt(products, idx));
    }).catch(e => {
      console.log('e ss: ', e)
    });
  }

  return (
    <div className=''>
      <h1 className='my-3 text-4xl font-bold text-indigo-800'>Manage Artworks</h1>
      <div className='overflow-auto w-screen-le-72 lg:w-full h-screen-le-108'>
        <table className='w-full bg-white shadow-lg '>
          <thead className='p-1 bg-gray-200'>
            <tr className='text-gray-600'>
              <th className='px-8 py-4 text-left'>Artwork's Name</th>
              <th className='px-8 py-4 text-center'>Artist's Name</th>
              <th className='px-8 py-4 text-center'>Price</th>
              <th className='px-8 py-4 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {
              products && products.map((product, idx) => {
                return (
                  <tr key={product._id}>
                    <td className='px-8 py-4 '>{product.name}</td>
                    <td className='px-8 py-4 text-center'>{product.artistName}</td>
                    <td className='px-8 py-4 text-center'>${product.price}</td>
                    <td className='flex items-center justify-center px-8 py-4'>
                      <div className='p-1 mr-1 text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800'>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div onClick={() => handleProductDelete(product._id, idx)} className='p-1 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-600'>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageProducts;
