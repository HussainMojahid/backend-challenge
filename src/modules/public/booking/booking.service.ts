import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>
  ) {}

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(booking);
  }

  async getBookingById(bookingId: number): Promise<Booking | undefined> {
    return this.bookingRepository.findOneBy({ booking_id: bookingId });
  }

  async updateBooking(
    bookingId: number,
    bookingData: Partial<Booking>
  ): Promise<Booking | undefined> {
    await this.bookingRepository.update(bookingId, bookingData);
    return this.getBookingById(bookingId);
  }

  async deleteBooking(bookingId: number): Promise<void> {
    await this.bookingRepository.delete(bookingId);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
}
