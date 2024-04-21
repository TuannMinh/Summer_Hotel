import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data;boundary=--------------------------362947062764690924037801'
	}
}

// Hàm này thêm một phòng mới vào cơ sở dữ liệu
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const response = await api.post("/rooms/add/new-room", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}
// Hàm này lấy tất cả các loại phòng từ cơ sở dữ liệu
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room type")
    }
}
// Hàm này lấy tất cả các phòng từ cơ sở dữ liệu
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}
// Hàm này xóa phòng theo Id
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}
// Hàm này cập nhật phòng
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`, formData,{
		headers: getHeader()
	})
	return response
}
// Hàm này lấy phòng theo Id
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}
// Hàm này lưu một đặt chỗ mới vào cơ sở dữ liệu
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}
// Hàm này lấy tất cả các đặt chỗ từ cơ sở dữ liệu
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}
//Hàm này nhận đặt chỗ bằng mã xác nhận
export async function getBookingConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}
// Hàm này hủy đặt chỗ
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
}
//Hàm này lấy tất cả các phòng còn trống từ cơ sở dữ liệu với ngày và loại phòng nhất định
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result
}
/*Hàm này đăng ký người dùng mới */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Lỗi đăng ký người dùng: ${error.message}`)
        }
    }
}
/* Chức năng này đăng nhập người dùng đã đăng ký */
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
/*Đây là chức năng lấy thông tin người dùng */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/profile/${userId}`, { headers: getHeader() })
        return response.data
    } catch (error) {
        throw error
    }
}
/*Đây là chức năng xóa người dùng */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/userd/delete/${userId}`, { headers: getHeader() })
        return response.data
    } catch (error) {
        return error.message
    }
}
/* Đây là hàm lấy một người dùng */
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, { headers: getHeader() })
        return response.data
    } catch (error) {
        throw error
    }
}
/* Đây là chức năng nhận lượt đặt chỗ của người dùng theo id người dùng */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
    } catch (error) {
        console.error("Lỗi khi tìm nạp lượt đặt chỗ:", error.message)
        throw new Error("Không tìm nạp được lượt đặt chỗ")
    }
}