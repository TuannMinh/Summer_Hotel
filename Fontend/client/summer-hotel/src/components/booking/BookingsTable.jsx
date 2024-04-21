import React, { useEffect, useState } from 'react'
import { parseISO } from "date-fns"
import DateSlider from "../common/DateSlider"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStarDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return (
                    bookingStarDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
                )
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>ID đặt phòng</th>
                        <th>Mã phòng</th>
                        <th>Loại phòng</th>
                        <th>Ngày đăng ký</th>
                        <th>Ngày trả phòng</th>
                        <th>Tên khách</th>
                        <th>Email của khách</th>
                        <th>Người lớn</th>
                        <th>Trẻ em</th>
                        <th>Tổng số khách</th>
                        <th>Mã xác nhận</th>
                        <th colSpan={2}>Hành động</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.id}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button className='btn btn-danger btn-sm' onClick={() => handleBookingCancellation(booking.id)}>
                                    Hủy bỏ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p>Không tìm thấy đặt chỗ nào cho những ngày đã chọn</p>}
        </section>
    )
}

export default BookingsTable