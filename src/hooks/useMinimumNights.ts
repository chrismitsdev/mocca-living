import * as React from 'react'

export const useMinimumNights = (checkInDate: Date | undefined) => {
  return React.useMemo(() => {
    if (!checkInDate) return 3

    const month = checkInDate.getMonth() + 1

    return month === 8 ? 5 : 3
  }, [checkInDate])
}
