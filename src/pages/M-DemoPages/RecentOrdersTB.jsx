import Card from "../../components/Cards/Cards";

const RecentOrdersTB = () => {
  const demoOrders = [
    {
      name: "John Doe",
      price: 120,
      foodType: "Pizza",
      quantity: 2,
      status: "Pending",
    },
    {
      name: "Sarah Lee",
      price: 80,
      foodType: "Burger",
      quantity: 1,
      status: "Delivered",
    },
    {
      name: "Mike Brown",
      price: 150,
      foodType: "Pasta",
      quantity: 3,
      status: "Processing",
    },
    {
      name: "Anna Smith",
      price: 60,
      foodType: "Salad",
      quantity: 1,
      status: "Delivered",
    },
    {
      name: "David Kim",
      price: 200,
      foodType: "Sushi",
      quantity: 4,
      status: "Delivered",
    },
  ];
  return (
    <>
      <Card>
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <p className="text-sm text-placeholderText">
          you have <span className="text-primary font-semibold">2</span> new
          orders
        </p>
        {demoOrders.map((order, index) => (
          <Card
            key={index}
            className="px-5 py-2 border-b border-gray flex items-center justify-between gap-5"
          >
            <div className="motion-preset-bounce motion-duration-300 text-left flex gap-2 px-1">
              <div>
                <div className="p-6 max-w-[50px] border-gray border  rounded-full bg-cardBackground motion-preset-bounce motion-duration-300 "></div>
              </div>
              <div>
                <p>{order.name}</p>
                <p className="text-sm text-placeholderText">
                  {" "}
                  x{order.quantity}&nbsp;{order.foodType}{" "}
                </p>
              </div>
            </div>
            <div className="">
              <span
                className={` font-semibold text-xs flex place-self-end text-[#333] p-1 px-2  rounded-full ml-8 motion-preset-bounce  ${
                  order.status === "Pending"
                    ? "bg-[rgba(255,193,7,0.4)]"
                    : order.status === "Delivered"
                    ? "bg-[rgba(52,199,89,0.4)]"
                    : "bg-[rgba(79,128,188,0.4)]"
                }`}
              >
                {order.status}
              </span>
              <p className="font-noto font-semibold pr-3 text-end">
                ${order.price}
              </p>
            </div>
          </Card>
        ))}
      </Card>
    </>
  );
};

export default RecentOrdersTB;
