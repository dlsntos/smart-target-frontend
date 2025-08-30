import Ads from "./Ads";

function AdSection() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Ads key={i} index={i} total={6} />
        ))}
      </div>
    </div>
  );
}

export default AdSection;
