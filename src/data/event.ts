import type { EventInput } from '@fullcalendar/core'

let eventGuid = 0
const today = new Date()
const day2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
const day3 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
const day5 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)
const day6 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
//const todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today ⇒ 日本の日付とずれる

function formatTokyoDate(date: Date): string {
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
}

const todayStr = formatTokyoDate(today)
const day2Str = formatTokyoDate(day2)
const day3Str = formatTokyoDate(day3)
const day5Str = formatTokyoDate(day5)
const day6Str = formatTokyoDate(day6)

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: '講習会',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'ミーティング1',
    start: day2Str + 'T09:00:00'
  },
  {
    id: createEventId(),
    title: 'ミーティング2',
    start: day2Str + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: 'ミーティング3',
    start: day2Str + 'T14:00:00'
  },
  {
    id: createEventId(),
    title: 'ミーティング4',
    start: day2Str + 'T15:00:00'
  },
  {
    id: createEventId(),
    title: 'ミーティング5',
    start: day2Str + 'T16:00:00'
  },
  {
    id: createEventId(),
    title: 'ミーティング6',
    start: day2Str + 'T17:00:00'
  },
  {
    id: createEventId(),
    title: '旅行',
    start: day3Str,
    end: day5Str,
    color: 'red'
  },
  {
    title: '防災訓練',
    start: day6Str + 'T10:00:00',
    end: day6Str + '12:30:00',
    color: 'blue'
  }
]

export function createEventId(): string {
  return String(eventGuid++)
}
