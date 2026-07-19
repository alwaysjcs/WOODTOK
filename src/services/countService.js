// ==========================================================
// File : countService.js
// Description : Count Business Logic
// ==========================================================

import { saveCurrentData } from "./storageService";

/**
 * 현재 선택된 항목의 수량을 변경한다.
 */
export function updateCurrentCount({
    counts,
    setCounts,
    currentKey,
    selectedSize,
    delta,
    mode,
    selectedDate,
    onSaved
})  {

    const nextCounts = structuredClone(counts);

    if (!nextCounts[currentKey]) {
        nextCounts[currentKey] = {};
    }

    const currentValue =
        nextCounts[currentKey][selectedSize] ?? 0;

    const nextValue = Math.max(0, currentValue + delta);

    nextCounts[currentKey][selectedSize] = nextValue;

    setCounts(nextCounts);

    saveCurrentData(
        mode,
        selectedDate,
        nextCounts
    );

if (onSaved) {
    onSaved();
}
}