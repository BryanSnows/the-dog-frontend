import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange when setPage is called with valid page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 5;

    component.setPage(2);

    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange when setPage is called with invalid page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 5;

    component.setPage(-1);
    component.setPage(5);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should return correct totalPagesArray', () => {
    component.totalPages = 3;
    expect(component.totalPagesArray).toEqual([0, 1, 2]);
  });

  it('should include first and last page in visiblePages', () => {
    component.totalPages = 10;
    component.currentPage = 5;

    const visiblePages = component.visiblePages;

    expect(visiblePages[0]).toBe(0);
    expect(visiblePages[visiblePages.length - 1]).toBe(9);
  });

  it('should show dots ("...") when necessary in visiblePages', () => {
    component.totalPages = 10;
    component.currentPage = 5;

    const visiblePages = component.visiblePages;

    expect(visiblePages).toContain(-1);
  });

  it('should not show dots when all pages are visible', () => {
    component.totalPages = 5;
    component.currentPage = 2;

    const visiblePages = component.visiblePages;

    expect(visiblePages).not.toContain(-1);
  });

  it('should disable previous buttons when on first page', () => {
    component.currentPage = 0;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.arrow-button'));
    const firstButton = buttons[0].nativeElement as HTMLButtonElement;
    const prevButton = buttons[1].nativeElement as HTMLButtonElement;

    expect(firstButton.disabled).toBe(true);
    expect(prevButton.disabled).toBe(true);
  });

  it('should disable next buttons when on last page', () => {
    component.totalPages = 5;
    component.currentPage = 4;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.arrow-button'));
    const nextButton = buttons[2].nativeElement as HTMLButtonElement;
    const lastButton = buttons[3].nativeElement as HTMLButtonElement;

    expect(nextButton.disabled).toBe(true);
    expect(lastButton.disabled).toBe(true);
  });

  it('should add active class to current page button', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();

    const activeButton = fixture.debugElement.query(
      By.css('.page-button.active')
    );

    expect(activeButton).toBeTruthy();
    expect(activeButton.nativeElement.textContent.trim()).toBe('3');
  });

  it('should render "..." for -1 in visiblePages', () => {
    component.totalPages = 10;
    component.currentPage = 5;
    fixture.detectChanges();

    const dotButtons = fixture.debugElement.queryAll(By.css('.dots-btn'));
    expect(dotButtons.length).toBeGreaterThan(0);
    expect(dotButtons[0].nativeElement.textContent.trim()).toBe('...');
  });
});
