import useBearStore from "@/shared/store/useBearStore";

export default function Home() {
  const counter = useBearStore((store) => store.bears);
  const increasePopulation = useBearStore((store) => store.increasePopulation);
  const decreasePopulation = useBearStore((store) => store.decreasePopulation);

  return (
    <main>
      <p>
        Contador: <span>{counter}</span>
      </p>
      <button onClick={decreasePopulation}>-</button>
      <button onClick={increasePopulation}>+</button>
    </main>
  );
}
