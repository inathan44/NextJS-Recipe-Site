type Props = {
  tag: string;
};

export default function DesktopRecipeTag({ tag }: Props) {
  return (
    <p className='rounded-full border border-darker-light  px-4 py-2 text-sm brightness-[85%]'>
      {tag}
    </p>
  );
}
