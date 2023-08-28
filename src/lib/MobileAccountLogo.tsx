const getShape = (shape: string): string | number => {
  switch (shape) {
    case "circle":
      return "50%";
    case "rounded":
      return "10%";
    default:
      return 0;
  }
};

export default function MobileAccountLogo({
  type,
  width = 50,
  height = 50,
  shape,
}: {
  type: string;
  width?: number | string;
  height?: number | string;
  shape?: "string";
}) {
  const icons = (type: string) => {
    type = type.toLowerCase();

    const types = {
      bkash: "/bkash-bn.svg",
      nagad: "/nagad-bn.svg",
      বিকাশ: "/bkash-bn.svg",
      নগদ: "/nagad-bn.svg",
    };

    return types[type];
  };

  if (!icons(type)) {
    return <div>{type}</div>;
  }

  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: getShape(shape),
      }}
    >
      <img src={icons(type)} alt={type} width="100%" height="100%" />
    </div>
  );
}
