import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchBtnDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, MatIconModule, FormsModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchBtnDe = fixture.debugElement.query(By.css('.search-btn'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when onSearch is called', () => {
    const emitSpy = jest.spyOn(component.search, 'emit');

    component.searchTerm = 'test';
    component.onSearch();

    expect(emitSpy).toHaveBeenCalledWith('test');
  });

  it('should clear searchTerm and emit when clearSearch is called', () => {
    const onSearchSpy = jest.spyOn(component, 'onSearch');

    component.searchTerm = 'something';
    component.clearSearch();

    expect(component.searchTerm).toBe('');
    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('should set disableBtn when isDisabled input is set', () => {
    component.isDisabled = true;
    expect(component.disableBtn).toBe(true);

    component.isDisabled = false;
    expect(component.disableBtn).toBe(false);
  });

  it('should add class clicked and blur on onSearch if searchBtn exists', () => {
    const nativeElementMock = {
      classList: { add: jest.fn() },
      blur: jest.fn(),
    };

    component.searchBtn = { nativeElement: nativeElementMock } as any;

    component.onSearch();

    expect(nativeElementMock.classList.add).toHaveBeenCalledWith('clicked');
    expect(nativeElementMock.blur).toHaveBeenCalled();
  });

  it('should change isPressed on button mouse events', () => {
    const button = fixture.debugElement.query(By.css('.search-btn'));

    button.triggerEventHandler('mousedown', {});
    expect(component.isPressed).toBe(true);

    button.triggerEventHandler('mouseup', {});
    expect(component.isPressed).toBe(false);
  });

  it('should show clear button when searchTerm is not empty', () => {
    component.searchTerm = 'abc';
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('.search-btn mat-icon')
    );
    expect(clearButton.nativeElement.textContent.trim()).toBe('backspace');
  });

  it('should show search button when searchTerm is empty', () => {
    component.searchTerm = '';
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(
      By.css('.search-btn mat-icon')
    );
    expect(searchButton.nativeElement.textContent.trim()).toBe('search');
  });
});
