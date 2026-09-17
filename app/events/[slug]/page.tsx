import { notFound } from "next/navigation"
import Image from "next/image";
import BookEvent from "@/components/BookEvent";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({
  icon,
  label,
  alt,
}: {
  icon: string;
  label: string;
  alt: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1.5 flex-row">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

export default async function EventPageDetails({params} : {params: Promise<{slug: string}>}) {
    const { slug } = await params
    const req = await fetch(`${BASE_URL}/api/events/${slug}`)
    const {event} = await req.json()
    if (!event) return notFound()
    const booking = 10;
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* Left Side ➡️ Event Content */}
        <div className="content">
          <Image
            src={event.image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              label={event.date}
              alt="calendar"
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              label={event.time}
              alt="clock"
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              label={event.mode}
              alt="mode"
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              label={event.location}
              alt="location"
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              label={event.audience}
              alt="audience"
            />
          </section>
          <EventAgenda agendaItems={event.agenda} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
          <EventTags tags={event.tags} />
        </div>
        {/* Right Side ➡️ Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {booking > 0 ? (
              <p className="text-sm">
                Join {booking} peoples who have already booked.
              </p>
            ) : (
              <p className="text-sm">Be the First one to book!!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
    </section>
  );
}

