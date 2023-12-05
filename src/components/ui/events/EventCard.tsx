import Link from "next/link";

type EventProps = {
  name: string;
  location: string;
  id: string;
  image: string;
  isAuth: boolean;
};

function EventCard({ isAuth, name, id, location, image }: EventProps) {
  return (
    <Link href={isAuth ? `/events/${id}` : `/events/viewing/${id}`}>
      <section className="col-span-1 shadow-sm dark:border border-[#303030] rounded-xl">
        <img src={image} alt={name} className="h-[150px] w-full object-cover rounded-t-xl" />
        <section className="p-3">
          <h1 className="font-semibold text-xl capitalize">{name}</h1>
          <p className="text-[#777777]">{location}</p>
        </section>
      </section>
    </Link>
  );
}

export default EventCard;
