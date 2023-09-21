// Model data as comments under a post and number of comments for a post
const TEST_COMMENTS = [
  'hi this recipe is really good',
  'Hello I would like to make this recipe sometime',
  'This is actually really torch, what I would do to make it better is to make sure that you put the salt on before searing it so that it gets that good good crust',
];

const CommentSection = () => {
  return <p>Coming soon!</p>;

  return (
    <div className='flex flex-col'>
      {TEST_COMMENTS.map((comment, idx) => (
        <div className='border-b border-gray-600 py-3' key={idx}>
          <p className='font-semibold'>Ian Nathan</p>
          <small>3 hours ago.</small>
          <p>{comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
