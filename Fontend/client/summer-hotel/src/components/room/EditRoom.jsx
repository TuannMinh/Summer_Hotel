import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link, useParams } from 'react-router-dom'

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { roomId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRoom({ ...room, [name]: value })
    }


    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await updateRoom(roomId, room)
            if (response.status === 200) {
                setSuccessMessage("Cập nhật phòng thành công!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Lỗi cập nhật phòng")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className='container mt-5 mb-5'>
            <h3 className='text-center mb-5 mt-5'>Chỉnh sửa phòng</h3>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    {successMessage && (
                        <div className='alert alert-success' role='alert'>
                            {successMessage}

                        </div>
                    )}
                    {errorMessage && (
                        <div className='alert alert-danger' role='alert'>
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="roomType"
                                className='form-label hotel-color'>
                                Loại phòng
                            </label>
                            <input type="text" name="roomType" id="roomType" className='form-control' value={room.roomType}
                                onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="roomPrice" className='form-label hotel-color'>
                                Giá phòng
                            </label>
                            <input type="number" name="roomPrice" id="roomPrice"
                                className='form-control' value={room.roomPrice}
                                onChange={handleInputChange} />

                        </div>
                        <div className='mb-3'>
                            <label htmlFor="photo" className='form-label hotel-color'>
                                Hình chụp
                            </label>
                            <input type="file" name="photo" id="photo" required
                                className='form-control' onChange={handleImageChange} />
                            {imagePreview && (
                                <img src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Room preview" className='mt-3'
                                    style={{ maxWidth: "400px", maxHeight: "400px" }} />
                            )}
                        </div>
                        <div className='d-grid gap-2 d-md-flex mt-2'>
                            <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>
                                Trở lại
                            </Link>
                            <button type="submit" className='btn btn-outline-warning'>
                                Chỉnh sửa phòng
                            </button>


                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default EditRoom