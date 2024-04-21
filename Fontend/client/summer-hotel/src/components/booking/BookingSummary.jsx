import { Button } from 'react-bootstrap'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000);
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className='card card-body mt-5'>
            <h4>Tóm tắt đặt chỗ</h4>
            <p>
                Họ và tên : <strong>{booking.guestFullName}</strong>
            </p>
            <p>
                Email : <strong>{booking.guestEmail}</strong>
            </p>
            <p>
                Ngày nhận phòng : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Ngày trả phòng : <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Số ngày : <strong>{numberOfDays}</strong>
            </p>
            <div>
                <h5 className="hotel-color">Số lượng khách hàng</h5>
                <strong>
                    Người lớn{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
                </strong>
                <br />
                <strong>
                    Trẻ em : {booking.numOfChildren}
                </strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>
                        Tổng tiền thanh toán : <strong>${payment}</strong>
                    </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button variant='success' onClick={handleConfirmBooking}>
                            {isProcessingPayment ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2' role='status'
                                        aria-hidden='true'></span>
                                    Xác nhận đặt phòng, chuyển hướng đến thanh toán ....
                                </>
                            ) : (
                                "Xác nhận đặt chỗ và tiến hành thanh toán"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p>Ngày trả phòng phải sau ngày nhận phòng.</p>
            )}
        </div>
    )
}

export default BookingSummary