import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({ checkInDate: "", checkOutDate: "", roomType: "" })
    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvaiableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Vui lòng nhập ngày hợp lệ")
            return
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Ngày trả phòng phải sau ngày nhận phòng")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvaiableRooms(response.data)
                setTimeout(() => setIsLoading(false), 2000)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }

    const handleClearSearch = () => {
        setSearchQuery({ checkInDate: "", checkOutDate: "", roomType: "" })
        setAvaiableRooms([])
    }
    return (
        <>
            <Container className='shadow mt-5 mb-5 py-5'>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>Ngày nhận phòng</Form.Label>
                                <Form.Control type='date' name='checkInDate'
                                    value={searchQuery.checkInDate} onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>Ngày trả phòng</Form.Label>
                                <Form.Control type='date' name='checkOutDate'
                                    value={searchQuery.checkOutDate} onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group controlId='roomType'>
                                <Form.Label>Loại phòng</Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery} />
                                    <Button className='ml-2' variant='secondary' type='submit'>Tìm kiếm</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                    <p className='mt-4'>Tìm phòng trống....</p>
                ) : availableRooms ? (
                    <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
                ) : (
                    <p className='mt-4'>Không có phòng trống cho ngày và loại phòng đã chọn.</p>
                )}
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            </Container>
        </>
    )
}

export default RoomSearch