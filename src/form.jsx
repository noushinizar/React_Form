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
    <form onSubmit={handleSubmit(handleRegistration)} className="bg-white p-12 rounded-lg shadow-lg w-full max-w-sm flex items-center justify-center flex-col gap-[20px] ">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      
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

      <input type="submit" className='h-[30px] w-[80px] bg-blue-600 rounded-lg text-white' />
    </form>
  );
}

export default Form;

