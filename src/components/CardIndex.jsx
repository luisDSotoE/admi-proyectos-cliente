export function Card(props) {
  return (
    <div className="p-4 bg-violet-500 rounded text-white font-bold">
      {props.children}
    </div>
  );
}
