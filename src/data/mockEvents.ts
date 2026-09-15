/**
 * Mock event data for the Home Page feed.
 * Features high-resolution custom event photography matching the Extroverts party/hangout theme.
 */

export interface EventData {
  id: string
  title: string
  type: 'PRIVATE PARTY' | 'PUBLIC EVENT'
  description: string
  username: string
  category: {
    emoji: string
    label: string
    color: string // bg color of the pill
  }
  time: string
  date: string
  location: string
  imageUrl: string
}

export const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Hi',
    type: 'PRIVATE PARTY',
    description: 'Hi',
    username: '@rahulxkumar',
    category: { emoji: '☕', label: 'Coffee Break', color: '#C8972C' },
    time: '2:41 PM',
    date: '03/10/26',
    location:
      'K2 Resto Lounge (Dine Out Cafe And Restaurant Bhopal), Kahjuri Sadak, Kolu Khedi, Bhopal, Madhya Pradesh, 462030, India',
    imageUrl: '/img/event-coffee.jpg',
  },
  {
    id: '2',
    title: "Let's hang out at",
    type: 'PRIVATE PARTY',
    description: 'New',
    username: '@punisher_12',
    category: { emoji: '☕', label: 'Coffee Break', color: '#C8972C' },
    time: '12:15 PM',
    date: '25/09/26',
    location:
      'Kahaniverse: Cafe In Bhopal | Best Cafe In Bhopal | Aesthetic Cafe In Bhopal, Shop No. 169, 170, Raj Business Park 01, Minal Residency, JK Rd, Near Apollo Pharmacy, Narela Shankri, Ayodhya Nagar, Bhopal, Madhya Pradesh, 462022, India',
    imageUrl: '/img/event-party.jpg',
  },
  {
    id: '3',
    title: 'Legwork',
    type: 'PRIVATE PARTY',
    description: 'Its gonna be good but with you its gonna be great',
    username: '@dbaxjr',
    category: { emoji: '🍽', label: 'Dinner Event', color: '#D2834A' },
    time: '8:32 PM',
    date: '22/09/26',
    location:
      'Mom&tum Kerala Cafe, Shop No. 9-10, First Floor, Shopping Complex, Good Shepherd Colony, Danish Kunj, Kolar Rd, Bhopal, Madhya Pradesh, 462042, India',
    imageUrl: '/img/event-dinner.jpg',
  },
  {
    id: '4',
    title: 'Weekend Vibes',
    type: 'PRIVATE PARTY',
    description: 'Come through and let the good times roll 🎶',
    username: '@vibecheck99',
    category: { emoji: '🎉', label: 'House Party', color: '#7C3AED' },
    time: '9:00 PM',
    date: '28/09/26',
    location:
      'DB City Mall, Arera Hills, Zone-I, Maharana Pratap Nagar, Bhopal, Madhya Pradesh, 462011, India',
    imageUrl: '/img/event-party.jpg',
  },
  {
    id: '5',
    title: 'Chill & Grill',
    type: 'PUBLIC EVENT',
    description: 'BBQ night with the crew. BYOB!',
    username: '@grillmaster',
    category: { emoji: '🔥', label: 'BBQ Night', color: '#DC2626' },
    time: '7:00 PM',
    date: '30/09/26',
    location:
      "People's Mall, Hoshangabad Rd, Arera Colony, Bhopal, Madhya Pradesh, 462016, India",
    imageUrl: '/img/event-dinner.jpg',
  },
]
