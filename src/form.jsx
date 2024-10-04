import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleRegistration = (val) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    
   
    const isDuplicate = existingData.some(
      (data) => data.username === val.username || data.email === val.email
    );

    if (isDuplicate) {
      alert('Username or email already exists!');
      return; 
    }

    const updatedData = [...existingData, val];
    localStorage.setItem('formData', JSON.stringify(updatedData));
    console.log(updatedData);
    navigate('/table'); 
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)} className="bg-white p-12 rounded-lg shadow-lg w-[500px]  flex items-center justify-center flex-col gap-[20px] ">
      <h2 className="text-2xl font-bold text-center mb-4">signin</h2>
      
      <input
        type="text"
        placeholder='username'
        className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        {...register('username', { required: true, minLength: 6, maxLength: 12 })}
      />
      {errors.username && <p className="text-red-500">Username is required and must be 6-12 characters long.</p>}
      
      <input
        type="text"
        placeholder='email'
        className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        {...register('email', { 
          required: true, 
          maxLength: 20, 
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })}
      />
       {errors.email && <p className="text-red-500">Please enter a valid email address.</p>}
       <input type="password" 
      placeholder='password'
      className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      {
        ...register('password',{
          required:true,
          minLength:8,
          maxLength:12,
          pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/
        })
      }
      />
      {errors.mobile && <p className="text-red-500">Username is required and must be 6-12 characters long.</p>}
      <input type="mobile" 
      placeholder='mobile'
      className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      {
        ...register('mobile',{
          required:true,
          maxLength:10,
          pattern:/^[0-9\b\+\-\(\)]+$/
        })
      }
      />
       {errors.mobile && <p className="text-red-500">Please enter a valid mobile number.</p>}
      <div className="mt-1 w-full">
      <div className="flex gap-5">
        <label className="block mb-1">Gender :</label>
       
          <label>
            <input
              type="radio"
              value="Male"
              {...register('gender', { required: true })}
            />
             &nbsp;  Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              {...register('gender', { required: true })}
            />
            &nbsp; Female
          </label>
          <label>
            <input
              type="radio"
              value="Other"
              {...register('gender', { required: true })}
            />
             &nbsp;  Other
          </label>
        </div>
      </div>
      {errors.gender && <p className="text-red-500">Gender selection is required.</p>}
  
      <div className="mt-1 w-full">
      <div className="flex gap-5 items-center">
        <label className="block mb-1">Country:</label>
        <select
          className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register('country', { required: true })}
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          
        </select>
      </div>
      </div>
      {errors.country && <p className="text-red-500">Country selection is required.</p>}
      <input type="submit" className='h-[30px] w-[80px] bg-blue-600 rounded-lg text-white' />
    </form>
  );
}

export default Form;

