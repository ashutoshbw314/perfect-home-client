import React, {useState, useEffect} from 'react';
import {changeOrderStatus} from '../../API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectWrapper = ({status, id}) => {
  const [statusStyle, setStatusStyle] = useState(status == 'pending' ? 'text-red-500' :
                                                 status == 'ongoing'  ? 'text-yellow-500' : 'text-green-700');
  const handleChange = async (event) => {
    const newStatus = event.target.value;

    try {
      const result = await changeOrderStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch(error) {
      console.log(error.message)
    }

    setStatusStyle(newStatus == 'pending' ? 'text-red-500' :
      newStatus == 'ongoing'  ? 'text-yellow-500' : 'text-green-700')
  }

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <select defaultValue={status} onChange={handleChange} name='status' className={`font-bold ${statusStyle}`}>
        <option value="pending" className='text-red-500'>Pending</option>
        <option value="ongoing" className='text-yellow-500'>Ongoing</option>
        <option value="done" className='text-green-700'>Done</option>
      </select>
    </div>
  )
}

export default SelectWrapper;
