import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { ICourse } from '../../features/dashboard/courses/course.model';

describe('CoursesService', () => {
  let service: CoursesService;
  let router: Router;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(Router)],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoursesService);
    router = TestBed.inject(Router);
  });

  it('Al llamar get courses se debe ejecutar una peticion HTTP a /courses', () => {
    const mockedResponse: ICourse[] = [
      {
        id: "43j9",
        name: "Javascript Avanzado",
        startDate: new Date("2024-08-07T10:30:00"),
        endDate: new Date("2024-10-07T10:30:00")
      },
    ];

    service.getAll().subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(mockedResponse);
  });
});