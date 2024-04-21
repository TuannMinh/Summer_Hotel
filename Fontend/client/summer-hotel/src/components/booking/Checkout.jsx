import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { useParams } from "react-router-dom"
import { FaUtensils, FaWifi, FaTv, FaWineGlassAlt, FaParking, FaCar, FaTshirt } from "react-icons/fa"
import { getRoomById } from '../utils/ApiFunctions'
import RoomCarousel from "../common/RoomCarousel"

const Checkout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  })

  const { roomId } = useParams()

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }, 1000)
  }, [roomId])
  return (
    <div>
      <div>
        <section className='container'>
          <div className='row flex-column flex-md-row align-items-center'>
            <div className='col-md-4 mt-5 mb-5'>
              {isLoading ? (
                <p>Đang tải thông tin phòng</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className='room-info'>
                  <img src={`data:image/png;base64, ${roomInfo.photo}`} alt='Room Info'
                    style={{ width: "100%", height: "200px" }} />
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>Loại phòng: </th>
                        <td>{roomInfo.roomType}</td>
                      </tr>
                      <tr>
                        <th>Giá mỗi đêm: </th>
                        <td>${roomInfo.roomPrice}</td>
                      </tr>
                      <tr>
                        <th>Dịch vụ phòng:</th>
                        <td>
                          <ul className='list-unstyled'>
                            <li><FaWifi /> WiFi</li>
                            <li><FaTv /> Nefilx Premium</li>
                            <li><FaUtensils /> Bữa sáng</li>
                            <li><FaWineGlassAlt /> Làm mới nhanh chóng</li>
                            <li><FaCar /> Dịch vụ ô tô</li>
                            <li><FaParking /> Chỗ đỗ xe</li>
                            <li><FaTshirt /> Giặt ủi</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className='col-md-8'>
              <BookingForm />
            </div>
          </div>
        </section>
        <div className='container'>
          <RoomCarousel />
        </div>

      </div>
    </div>
  )
}

export default Checkout