import { Test, TestingModule } from "@nestjs/testing";
import { UserReviewService } from "./review.service";

describe("UserReviewService", () => {
  let service: UserReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReviewService],
    }).compile();

    service = module.get<UserReviewService>(UserReviewService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
