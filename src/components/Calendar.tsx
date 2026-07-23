import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import type { DayCellInfo, EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import jaLocale from '@fullcalendar/react/locales/ja'
import themePlugin from '@fullcalendar/react/themes/classic'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'

type HolidayMap = Record<string, string>

const calendarFontClass = 'calendar-font'
const calendarRootClass = 'calendar-root'
const calendarEventFontClass = 'calendar-event-font'
const calendarDayTopClass = 'calendar-day-top'
const calendarEventClass = 'calendar-event'
const calendarEventInnerClass = 'calendar-event-inner'
const calendarListEventDotHiddenClass = 'calendar-list-event-dot-hidden'
const calendarPopoverBodyClass = 'calendar-popover-body'
const calendarPopoverHeaderClass = 'calendar-popover-header'
const calendarPopoverTitleClass = 'calendar-popover-title'
const holidayTextClass = 'holiday-text'

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const calendarEventClasses = joinClasses(calendarEventFontClass, calendarEventClass)
const calendarEventInnerClasses = joinClasses(calendarEventFontClass, calendarEventInnerClass)

function getWeekendClass(date: Date): string {
  const day = date.getDay()
  if (day === 0) return 'calendar-sunday'
  if (day === 6) return 'calendar-saturday'
  return ''
}

function getDayHeaderInnerClass(info: { date: Date; inPopover: boolean }): string {
  if (info.inPopover) {
    return joinClasses(calendarFontClass, calendarPopoverTitleClass)
  }
  return joinClasses(calendarFontClass, getWeekendClass(info.date))
}

function getDayHeaderClass(info: { inPopover: boolean }): string {
  return info.inPopover
    ? joinClasses(calendarFontClass, calendarPopoverHeaderClass)
    : calendarFontClass
}

function getDayCellClass(info: { inPopover: boolean }): string {
  return info.inPopover ? calendarPopoverBodyClass : ''
}

export default function Calendar(): React.JSX.Element {
  const [events, setEvents] = useState<EventInput[]>([])
  const [holidays, setHolidays] = useState<HolidayMap>({})

  const fetchHolidays = async (): Promise<void> => {
    try {
      const response = await fetch('/api/holiday')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await response.json()) as HolidayMap
      setHolidays(data)
    } catch (error) {
      console.error('Error fetching holidays:', error)
    }
  }

  const fetchEvents = async (): Promise<void> => {
    try {
      const response = await fetch('/api/event')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await response.json()) as EventInput[]
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    // APIからデータ取得
    fetchHolidays()
    fetchEvents()
  }, [])

  // 日付セル上部のレンダリング
  const renderDayCellTopContent = (info: DayCellInfo): React.JSX.Element => {
    const dateStr = info.date.toLocaleDateString('sv-SE')
    const holidayName = holidays[dateStr]
    const isHoliday = Boolean(holidayName)
    const weekendClass = getWeekendClass(info.date)

    return (
      <>
        <span
          className={
            isHoliday ? holidayTextClass : joinClasses(calendarFontClass, weekendClass)
          }
        >
          {info.date.getDate()}
        </span>
        {isHoliday ? <span className={holidayTextClass}>{holidayName}</span> : null}
      </>
    )
  }

  return (
    <div className={calendarRootClass}>
      <FullCalendar
        className={calendarFontClass}
        plugins={[themePlugin, dayGridPlugin]}
        headerToolbar={{
          start: '',
          center: 'title'
        }}
        toolbarTitleClass={calendarFontClass}
        dayHeaderClass={getDayHeaderClass}
        dayHeaderInnerClass={getDayHeaderInnerClass}
        dayCellClass={getDayCellClass}
        dayCellTopClass={calendarFontClass}
        dayCellTopInnerClass={calendarDayTopClass}
        rowEventClass={calendarEventClasses}
        rowEventInnerClass={calendarEventInnerClasses}
        rowEventTimeClass={calendarEventFontClass}
        rowEventTitleClass={calendarEventFontClass}
        rowMoreLinkClass={calendarEventFontClass}
        rowMoreLinkInnerClass={calendarEventFontClass}
        listItemEventClass={calendarEventClasses}
        listItemEventInnerClass={calendarEventInnerClasses}
        listItemEventTimeClass={calendarEventFontClass}
        listItemEventTitleClass={calendarEventFontClass}
        listItemEventBeforeClass={calendarListEventDotHiddenClass}
        initialView="dayGridMonth"
        dayMaxEvents={true} // 日付枠内に表示できるイベント数を制限
        events={events} // APIから取得したイベントを使用
        dayCellTopContent={renderDayCellTopContent}
        businessHours={true} // 土日をグレーアウト
        fixedWeekCount={false} // 週数を固定しない⇒月の週数が変わる
        height={'90vh'} // カレンダーの高さを制限
        // 日本語化
        locale={jaLocale}
        // イベントの表示形式
        eventDisplay={'block'} // イベントをブロック要素として表示
        eventTimeFormat={{
          // 時刻フォーマット'14:30'
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
      />
    </div>
  )
}
