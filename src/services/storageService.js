// ==========================================================
// WOODTOK
// File : storageService.js
// Description : Local Storage Service
// ==========================================================

import { APP_CONFIG } from "../config/appConfig";

// ----------------------------------------------------------
// Key
// ----------------------------------------------------------

const orderKey = (date) => `factoryOrder_${date}`;
const stockKey = (date) => `factoryStock_${date}`;

// ----------------------------------------------------------
// Meta
// ----------------------------------------------------------

function createMeta() {

    const now = new Date().toISOString();

    return {
        version: 1,
        createdAt: now,
        updatedAt: now,
        inherited: false,
        sourceDate: null
    };

}

function ensureMeta(data) {

    if (!data || typeof data !== "object") {
        data = {};
    }

    if (!data._meta) {
        data._meta = createMeta();
    }

    const defaults = createMeta();

    data._meta = {
        ...defaults,
        ...data._meta
    };

    return data;

}

// ----------------------------------------------------------
// Date
// ----------------------------------------------------------

function getPreviousDate(dateString) {

    const date = new Date(dateString);

    date.setDate(date.getDate() - 1);

    return date.toISOString().split("T")[0];

}



// ----------------------------------------------------------
// Order
// ----------------------------------------------------------

export function loadOrderData(date) {

    const saved = localStorage.getItem(orderKey(date));

    const data = saved
        ? JSON.parse(saved)
        : {};

    return ensureMeta(data);

}

export function saveOrderData(date, data) {

    const saveData = ensureMeta(structuredClone(data));

    saveData._meta.updatedAt = new Date().toISOString();

    localStorage.setItem(
        orderKey(date),
        JSON.stringify(saveData)
    );
    
    //cleanupOldData();

}

// ----------------------------------------------------------
// Stock
// ----------------------------------------------------------

export function loadStockData(date) {

    const saved = localStorage.getItem(stockKey(date));

    const data = saved
        ? JSON.parse(saved)
        : {};

    return ensureMeta(data);

}

export function saveStockData(date, data) {

    const saveData = ensureMeta(structuredClone(data));

    saveData._meta.updatedAt = new Date().toISOString();

    localStorage.setItem(
        stockKey(date),
        JSON.stringify(saveData)
    );

    //cleanupOldData();
}

// ----------------------------------------------------------
// Future
// ----------------------------------------------------------

export function getInitialStockData(date) {

    // 오늘 저장된 데이터 읽기
    const todayData = loadStockData(date);

    const productKeys = Object.keys(todayData)
        .filter(key => !key.startsWith("_"));

    // 오늘 데이터가 있으면 그대로 반환
    if (productKeys.length > 0) {
        return todayData;
    }

    // 이전 저장 날짜 검색
    const stockDates = Object.keys(localStorage)
        .filter(key => key.startsWith("factoryStock_"))
        .map(key => key.replace("factoryStock_", ""))
        .filter(savedDate => savedDate < date)
        .sort()
        .reverse();

    // 가장 최근 데이터 반환
    for (const searchDate of stockDates) {

        const previousData = loadStockData(searchDate);

        const previousKeys = Object.keys(previousData)
            .filter(key => !key.startsWith("_"));

        if (previousKeys.length > 0) {

            const copiedData = structuredClone(previousData);

            copiedData._meta = {
                ...copiedData._meta,
                inherited: true,
                sourceDate: searchDate,
                updatedAt: new Date().toISOString()
            };

            return copiedData;

        }

    }

    // 이전 데이터도 없으면 빈 데이터 반환
    return ensureMeta({});

}

// ==========================================================
// Cleanup Old Data
// 최근 작업 MAX_HISTORY_COUNT개만 보관
// ==========================================================

export function cleanupOldData() {

    const dateSet = new Set();

    Object.keys(localStorage).forEach((key) => {

        if (
            key.startsWith("factoryOrder_") ||
            key.startsWith("factoryStock_")
        ) {

            const date = key.split("_")[1];

            dateSet.add(date);

        }

    });

    const dates = [...dateSet].sort().reverse();

    const removeDates = dates.slice(APP_CONFIG.MAX_HISTORY_COUNT);

    removeDates.forEach((date) => {

        localStorage.removeItem(`factoryOrder_${date}`);
        localStorage.removeItem(`factoryStock_${date}`);
        localStorage.removeItem(`factoryMeta_${date}`);

    });

}

export function saveCurrentData(
    mode,
    selectedDate,
    nextCounts
) {

    if (mode === "order") {

        saveOrderData(
            selectedDate,
            nextCounts
        );

    } else {

        saveStockData(
            selectedDate,
            nextCounts
        );

        cleanupOldData();

    }

}

export function isSelectableDate() {
    // STEP-005
    return true;
}

// ----------------------------------------------------------
// Config
// ----------------------------------------------------------

//export { APP_CONFIG };