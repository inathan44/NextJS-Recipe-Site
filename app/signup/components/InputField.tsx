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
      <label className='font-semibold dark:text-primary-light'>
        {label}{' '}
        <span className='text-sm font-normal text-red-400'>
          {errors[name]?.message}
        </span>
      </label>
      <input className='h-8 rounded px-2' type={type} {...register(name)} />
    </div>
  );
};

export default InputField;
