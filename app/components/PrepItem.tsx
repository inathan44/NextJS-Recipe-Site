type Props = {
  text: string;
  number: number | 'N/A';
  children?: React.ReactNode;
};

export default function PrepItem({ text, number, children }: Props) {
  return (
    <p className='dark:text-primary-light'>
      {text}{' '}
      <span className='font-bold'>
        {number}
        {children}
      </span>
    </p>
  );
}
