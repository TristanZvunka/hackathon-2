// eslint-disable-next-line
export default function UserCard({ email }) {
  return (
    <div className="flex justify-center items-center flex-col h-14 w-[70%] border-2 border-[#000] rounded-2xl">
      <p>Email: {email}</p>
    </div>
  );
}
