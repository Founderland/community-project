import { CalendarIcon } from "@heroicons/react/outline"

const AddToCalendar = ({ event }) => {
  const formatDate = (dateString) => {
    let dateTime = new Date(dateString)
    return [
      dateTime.getUTCFullYear(),
      pad(dateTime.getUTCMonth() + 1),
      pad(dateTime.getUTCDate()),
      "T",
      pad(dateTime.getUTCHours()),
      pad(dateTime.getUTCMinutes()) + "00Z",
    ].join("")
  }

  const pad = (num) => {
    // Ensure date values are double digits
    return num < 10 ? "0" + num : num
  }
  const saveCalInvite = (event) => {
    let url = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:" + formatDate(event.dateStart),
      "DTEND:" + formatDate(event.dateEnd),
      "ORGANIZER:" + event.member.firstName + " " + event.member.lastName,
      "SUMMARY:" + event.title,
      "DESCRIPTION:" + event.description,
      event.link
        ? "LOCATION:" + event.link
        : "LOCATION:" +
          event.location +
          ", " +
          event.address +
          ", " +
          event.city,
      event.geoLocation
        ? "GEO:" + event.geoLocation.lat + ";" + event.geoLocation.lng
        : "",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "REPEAT:1",
      "DURATION:PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")

    let blob = new Blob([url], { type: "text/calendar;charset=utf-8" })

    if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
      // Open/Save link in IE and Edge
      window.navigator.msSaveBlob(blob, "download.ics")
    } else {
      // Open/Save link in Modern Browsers
      window.open(encodeURI("data:text/calendar;charset=utf8," + url))
    }
  }

  return (
    <section className="absolute bottom-0 p-4 z-20">
      <button
        className="flex items-center space-x-2 px-2 py-1 bg-flime text-black text-sm  text-mono  transition ease-in duration-200 hover:bg-fblue hover:text-white"
        onClick={() => saveCalInvite(event)}
      >
        <CalendarIcon className="w-5 h-5" />
        <p className="text-xs">Add to my Calendar</p>
      </button>
    </section>
  )
}

export default AddToCalendar
