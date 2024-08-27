import { MdOutlineClose } from "react-icons/md";

export default function ErrorAlert({ errors, setErrors, errorKey }) {
  console.log(errors, setErrors, errorKey);
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative'
      role='alert'>
      <strong className='font-bold'>Error! </strong>
      <span className='block sm:inline'>{errors[errorKey]}</span>
      <button
        className='absolute top-0 bottom-0 right-0 px-2'
        onClick={() => {
          setErrors(() => {
            let newErrors = { ...errors };
            delete newErrors[errorKey];
            return newErrors;
          });
        }}>
        <MdOutlineClose />
      </button>
    </div>
  );
}
