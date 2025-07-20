import { describe, it, expect, vi } from 'vitest';
import { debounce } from '../../utils/debounce';

describe('debounce', () => {
  it('should call function after specified delay', () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should cancel previous calls when called multiple times', () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('first');
    vi.advanceTimersByTime(50);
    debouncedFn('second');
    vi.advanceTimersByTime(50);
    
    expect(mockFn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledWith('second');
    expect(mockFn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should work with multiple arguments', () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2', 'arg3');
    vi.advanceTimersByTime(100);
    
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');

    vi.useRealTimers();
  });
}); 