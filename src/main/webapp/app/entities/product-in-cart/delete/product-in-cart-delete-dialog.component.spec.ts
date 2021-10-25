jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductInCartService } from '../service/product-in-cart.service';

import { ProductInCartDeleteDialogComponent } from './product-in-cart-delete-dialog.component';

describe('Component Tests', () => {
  describe('ProductInCart Management Delete Component', () => {
    let comp: ProductInCartDeleteDialogComponent;
    let fixture: ComponentFixture<ProductInCartDeleteDialogComponent>;
    let service: ProductInCartService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProductInCartDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(ProductInCartDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductInCartDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProductInCartService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
