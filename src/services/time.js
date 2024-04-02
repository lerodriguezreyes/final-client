import { DateTime } from "luxon"

export const returnReadableTime = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_FULL)
}

export const returnReadableTimeShort = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_SHORT)
}

export const returnReadableTimeOnlyDate = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATE_MED)
}