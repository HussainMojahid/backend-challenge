import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Booking } from "./booking.entity";
import { BookingService } from "./booking.service";

@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() bookingData: Partial<Booking>): Promise<Booking> {
    return this.bookingService.createBooking(bookingData);
  }

  @Get(":id")
  async getBookingById(
    @Param("id") bookingId: number
  ): Promise<Booking | undefined> {
    return this.bookingService.getBookingById(bookingId);
  }

  @Put(":id")
  async updateBooking(
    @Param("id") bookingId: number,
    @Body() bookingData: Partial<Booking>
  ): Promise<Booking | undefined> {
    return this.bookingService.updateBooking(bookingId, bookingData);
  }

  @Delete(":id")
  async deleteBooking(@Param("id") bookingId: number): Promise<void> {
    return this.bookingService.deleteBooking(bookingId);
  }

  @Get()
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }
}
