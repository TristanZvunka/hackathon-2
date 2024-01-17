// eslint-disable-next-line
export default function UserCard({ mot, count }) {
  return (
    <div className="flex justify-center items-center flex-col h-40 w-40 border-2 border-[#000] rounded-2xl">
      <p>Mot: {mot}</p>
      <p>Nombre: {count}</p>
    </div>
  );
}
