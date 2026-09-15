import { Clock, Calendar, MapPin, Coffee } from 'lucide-react'
import type { EventData } from '../data/mockEvents'

/**
 * EventCard — A single event card in the home feed.
 *
 * Exact Figma measurements (1920x1080 canvas):
 *  - Card padding: 40px all sides
 *  - Image height: 400px, covers card left-to-right respecting padding
 *  - Gap image → title: 45px
 *  - Gap title → "PRIVATE PARTY" subheading: 18px
 *  - Gap subheading → description text: 52px
 *  - Gap description → @username: 43px
 *  - Gap @username → table: 47px
 *  - Table: 165px total height, two rows of ~83px each
 *  - Gap table → button: 26px
 *  - Button height: 73px, full width respecting card margins
 *
 * Alignment:
 *  - Title + subheading LEFT, gem icon RIGHT (justify-between)
 *  - @username LEFT, category pill RIGHT (justify-between)
 *  - Table cell contents at OPPOSITE ends (justify-between)
 */

interface EventCardProps {
  event: EventData
  onJoinClick: () => void
}

export default function EventCard({ event, onJoinClick }: EventCardProps) {
  return (
    <div
      className="bg-[#000000] rounded-2xl overflow-hidden"
      style={{
        padding: 'clamp(16px, 3.7vh, 40px)',
        marginLeft: 'clamp(8px, 1.3vw, 25px)',
        marginRight: 'clamp(8px, 1.3vw, 25px)',
      }}
    >
      {/* Cover Image — 400px height, respects card padding */}
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full object-cover rounded-lg"
        style={{ height: 'clamp(200px, 37vh, 400px)' }}
        loading="lazy"
      />

      {/* ── Title row + gem icon ── gap from image: 45px */}
      <div
        className="flex items-start justify-between"
        style={{ marginTop: 'clamp(22px, 4.17vh, 45px)' }}
      >
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-white truncate leading-tight"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(20px, 3.33vh, 36px)',
            }}
          >
            {event.title}
          </h3>
          {/* ── Subheading ── immediately below title without significant gap */}
          <p
            className="uppercase text-[#888] font-light leading-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(14px, 2.22vh, 24px)',
              marginTop: 'clamp(2px, 0.37vh, 4px)',
            }}
          >
            {event.type}
          </p>
        </div>
        {/* Silver Badge Icon — right end */}
        <img
          src="/img/silver-badge.png"
          alt="Silver Badge"
          className="select-none object-contain pointer-events-none ml-4 flex-shrink-0"
          style={{
            height: 'clamp(24px, 3.7vh, 40px)',
            width: 'auto',
          }}
        />
      </div>

      {/* ── Description ── gap from subheading: 52px */}
      <p
        className="text-[#888] font-light leading-relaxed"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(14px, 2.22vh, 24px)',
          marginTop: 'clamp(24px, 4.81vh, 52px)',
          lineHeight: 1.25,
        }}
      >
        {event.description}
      </p>

      {/* ── Username LEFT + Category pill RIGHT ── gap from description: 43px */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: 'clamp(20px, 3.98vh, 43px)' }}
      >
        <span
          className="font-bold text-white leading-none"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(14px, 2.22vh, 24px)',
            letterSpacing: '0.01em',
          }}
        >
          {event.username}
        </span>
        <span
          className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold flex-shrink-0 select-none"
          style={{
            backgroundColor: event.category.color,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 1.4vw, 16px)',
            paddingTop: '6px',
            paddingBottom: '6px',
            paddingLeft: 'clamp(14px, 1.6vw, 24px)',
            paddingRight: 'clamp(14px, 1.6vw, 24px)',
          }}
        >
          {event.category.label.toLowerCase().includes('coffee') ? (
            <Coffee className="w-[clamp(14px,1.6vw,18px)] h-[clamp(14px,1.6vw,18px)] text-white flex-shrink-0" />
          ) : (
            <span>{event.category.emoji}</span>
          )}
          <span>{event.category.label}</span>
        </span>
      </div>

      {/* ── Time/Date + Location table ── gap from username: 47px, total height: 165px */}
      <div
        style={{ marginTop: 'clamp(22px, 4.35vh, 47px)' }}
      >
        {/* Row 1: Time | Date — ~83px height */}
        <div
          className="flex border border-[#333] rounded-t-lg overflow-hidden"
          style={{ height: 'clamp(48px, 7.69vh, 83px)' }}
        >
          <div
            className="flex-1 flex items-center justify-between border-r border-[#333]"
            style={{
              padding: 'clamp(14px, 2.5vh, 27px) clamp(18px, 2.0vw, 39px)',
            }}
          >
            <span
              className="text-white font-normal truncate"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 2.22vh, 24px)',
                lineHeight: 1.2,
              }}
            >
              {event.time}
            </span>
            <Clock className="w-[clamp(16px,2.22vh,24px)] h-[clamp(16px,2.22vh,24px)] text-[#888] flex-shrink-0 ml-3" />
          </div>
          <div
            className="flex-1 flex items-center justify-between"
            style={{
              padding: 'clamp(14px, 2.5vh, 27px) clamp(18px, 2.0vw, 39px)',
            }}
          >
            <span
              className="text-white font-normal truncate"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 2.22vh, 24px)',
                lineHeight: 1.2,
              }}
            >
              {event.date}
            </span>
            <Calendar className="w-[clamp(16px,2.22vh,24px)] h-[clamp(16px,2.22vh,24px)] text-[#888] flex-shrink-0 ml-3" />
          </div>
        </div>

        {/* Row 2: Location — ~83px height */}
        <div
          className="flex items-center justify-between border border-t-0 border-[#333] rounded-b-lg"
          style={{
            height: 'clamp(48px, 7.69vh, 83px)',
            padding: 'clamp(14px, 2.5vh, 27px) clamp(18px, 2.0vw, 39px)',
          }}
        >
          <p
            className="text-white font-normal truncate mr-3 leading-snug"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 2.22vh, 24px)',
            }}
          >
            {event.location}
          </p>
          <MapPin className="w-[clamp(16px,2.22vh,24px)] h-[clamp(16px,2.22vh,24px)] text-[#888] flex-shrink-0" />
        </div>
      </div>

      {/* ── JOIN button ── gap from table: 26px, height: 73px */}
      <button
        onClick={onJoinClick}
        className="w-full bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-100 active:scale-[0.99] transition-all cursor-pointer"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(13px, 1.4vw, 16px)',
          marginTop: 'clamp(12px, 2.41vh, 26px)',
          height: 'clamp(48px, 6.76vh, 73px)',
        }}
      >
        Join
      </button>
    </div>
  )
}
