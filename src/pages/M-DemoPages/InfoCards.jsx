import {
  LayoutDashboard,
  ShoppingCart,
  Utensils,
  Users,
  BarChart2,
  Settings,
  UtensilsCrossed,
} from "lucide-react";
import Card from "../../components/Cards/Cards";

const InfoCards = () => {
  const CardInfo = [
    {
      label: "Total Revenue",
      num: "$45,231.89",
      icon: <LayoutDashboard size={18} />,
      progress: "12.8% from last month",
    },
    {
      label: "Orders",
      num: "1,234",
      icon: <ShoppingCart size={18} />,
      progress: "+43 from last month",
    },
    {
      label: "Customers",
      num: "1278",
      icon: <Utensils size={18} />,
      progress: "12% from last month",
    },
    {
      label: "Growth",
      num: "+234",
      icon: <Users size={18} />,
      progress: "35% from last month",
    },
    {
      label: "Growth",
      num: "+234",
      icon: <BarChart2 size={18} />,
      progress: "35% from last month",
    },

  ];
  return (
    <>
      <div className="flex flex-wrap gap-4 md:justify-between font-noto">
        {CardInfo.map((item, index) => (
          <Card key={index}>
            <div className="flex flex-col items-start  md:w-[150px]">
            <div>{item.icon}</div>
            <h1 className="font-semibold">{item.label}</h1>
            <p>{item.num}</p>
            <p className="text-xs text-placeholderText">{item.progress}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default InfoCards;
