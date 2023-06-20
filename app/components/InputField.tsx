type Props = {
  name: 'email' | 'password' | 'confirmPassword';
  label: string;
  type: string;
  register: any;
  errors: any;
};

const InputField = ({ name, label, type, register, errors }: Props) => {
  return (
    <div className='flex flex-col'>
      <label className='text-lg font-semibold dark:text-primary-light sm:text-base'>
        {label}{' '}
        <span className='text-sm font-normal text-red-400'>
          {errors[name]?.message}
        </span>
      </label>
      <input
        className='h-12 rounded px-2 text-primary-dark sm:h-8'
        type={type}
        {...register(name)}
      />
    </div>
  );
};

export default InputField;
